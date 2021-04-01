import React, { useState } from "react";
import cx from "classnames";
import DatePicker from "react-datepicker";
import moment from 'moment';
import withViewport from 'react-in-viewport';
import ls from 'local-storage';
import { unionBy, cloneDeep, range, debounce, throttle, get, omit } from "lodash";
import { withRouter, withHistory } from "react-router";
import 'whatwg-fetch';
import "react-datepicker/dist/react-datepicker.css";
import SplitButton from './components/split-button';
import {
  CEREMONY_PACKAGES,
  RECEPTION_PACKAGES,
  COMBINED_PACKAGES,
  PRIVATE_ROOM,
  ALL,
  ITEMS,
} from "./packages-items";

import "./packages.scss";
import { Link } from "react-router-dom";

const PACKAGES = {
  "ceremony-on-the-beach": CEREMONY_PACKAGES,
  "reception-only": RECEPTION_PACKAGES,
  "ceremony-and-reception": COMBINED_PACKAGES,
  "private-room": PRIVATE_ROOM,
  // "all": ALL,
};

const nil = () => {};

function findItemInPackage(id, items) {
  let result;
  items.forEach(item => {
    if (item.items) {
      result = result || findItemInPackage(id, item.items);
    } else {
      if (item.id === id) {
        result = item;
      }
    }
  })
  return result;
}

function isItemInPackage(id, items, key) {
  const foundItem = findItemInPackage(id, items);
  if (foundItem) {
    if (foundItem.pricePerItem !== undefined) {
      return !!foundItem.includedCount;
    } else {
      return true;
    }
  } else {
    return false;
  }
}

function getItemTotal(item, isAddon) {
  let totalPrice;
  if (isAddon) {
    totalPrice = item.basePrice || item.price || 0;
  } else {
    totalPrice = item.basePrice || 0;
  }
  if (item.pricePerItem !== undefined) {
    if (item.includedCount !== undefined) {
      if (item.includedCount < item.count) {
        totalPrice += (item.count - item.includedCount) * item.pricePerItem;
      }
    } else {
      totalPrice += item.count * item.pricePerItem;
    }
  }
  return totalPrice;
}

const SwipeableContainer = withViewport(({
  inViewport,
  enterCount,
  leaveCount,
  forwardedRef,
  onVisible = nil,
  onSwipedRight = nil,
  onSwiping = nil,
  onSwiped = nil,
  itemId,
  children,
  ...rest
}) => {
  const [isDown, setIsDown] = useState(false)
  const [moved, setMoved] = useState(false)
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [dx, setDX] = useState(0);

  if (inViewport === true && onVisible) {
    onVisible(itemId);
  }

  const onStart = (event) => {
    event.stopPropagation();
    setIsDown(true);
    setMoved(false);
    const touch = get(event.nativeEvent, 'touches.0') || get(event.nativeEvent, 'changedTouches.0');
    const x = get(touch, 'pageX', 0);
    setStartX(x);
  }

  const onMove = (event) => {
    event.stopPropagation();
    if (isDown) {
      if (!moved) {
        setMoved(true);
      }
      const touch = get(event.nativeEvent, 'touches.0') || get(event.nativeEvent, 'changedTouches.0');
      const x = get(touch, 'pageX', 0);
      const newDX = x - currentX;
      if (newDX !== dx) {
        setDX(x - currentX);
        if (currentX !== x) {
          setCurrentX(x);
          onSwiping({ deltaX: x - startX });
        }
      }
    }
  };

  const onEnd = (event) => {
    event.stopPropagation();
    setIsDown(false);
    if (moved && dx > 0) {
      onSwipedRight();
    } else {
      onSwiped();
    }
  }

  return (
    <div
      /*{...handlers}*/
      {...rest}
      onTouchStart={onStart}
      onTouchMove={onMove}
      onTouchEnd={onEnd}
    >
      <span ref={forwardedRef} />
      {children}
    </div>
  );
});

class Packages extends React.Component {
  constructor(...args) {
    super(...args);
    const { match: { url } } = this.props;
    const packageUrl = url.split("/");
    let packages;
    let selectedPackage;
    if (packageUrl[2]) {
      packages = cloneDeep(PACKAGES[packageUrl[2]]);
      const storedPackages = ls.get(packageUrl[2]);
      if (storedPackages) {
        Object.keys(packages).forEach(key => {
          packages[key].addons = packages[key].addons.map(addon => {
            if (storedPackages[key]) {
              const storedItem = (storedPackages[key].addons || []).find(a => a.id === addon.id);
              if (storedItem) {
                return {
                  ...storedItem,
                  ...omit(addon, 'count'),
                };
              } else {
                return addon;
              }
            } else {
              return addon;
            }
          });
        });
      } else {
        ls.set(packageUrl[2], packages);
      }
      selectedPackage = Object.keys(packages)[0];
    }
    this.state = {
      packages,
      selectedPackage,
      totalExpanded: false,
      showInvoice: false,
      currentSectionTitle: '',
      contact: '',
      notes: '',
      date: new Date(),
      showImage: false,
      swipingItem: false,
    };
  }

  resetAddons = () => {
    const { match: { url } } = this.props;
    const packageUrl = url.split("/");
    if (packageUrl[2]) {
      this.setState({
        packages: cloneDeep(PACKAGES[packageUrl[2]]),
      }, () => {
        ls.set(packageUrl[2], this.state.packages);
      });
    }
  };

  selectPackage = (key) => () => {
    this.setState({ selectedPackage: key });
  };

  toggleInvoice = () => {
    this.setState(({ showInvoice }) => ({
      showInvoice: !showInvoice,
    }));
    document.getElementById('app').scrollTo(0, 0);
  }

  calculateTotal() {
    const { packages, selectedPackage } = this.state;
    let totalPrice = packages[selectedPackage].price;

    packages[selectedPackage].items.forEach(item => {
      if (item.category) {
        for (let i of item.items) {
          totalPrice += getItemTotal(i);
        }
      } else {
        totalPrice += getItemTotal(item);
      }
    });

    for (let addon of packages[selectedPackage].addons) {
      if (addon.checked) {
        totalPrice += addon.pricePerItem !== undefined ? getItemTotal(addon, true) : addon.price;
      }
    }

    return totalPrice;
  }

  toggleAddon = (id) => () => {
    const { packages, selectedPackage } = this.state;
    this.setState({
      packages: {
        ...packages,
        [selectedPackage]: {
          ...packages[selectedPackage],
          addons: packages[selectedPackage].addons.map((addon) => ({
            ...addon,
            checked: addon.id === id ? !addon.checked : addon.checked
          }))
        }
      }
    }, () => {
      const { match: { url } } = this.props;
      const packageUrl = url.split("/");
      if (packageUrl[2]) {
        ls.set(packageUrl[2], this.state.packages);
      }
    });
  };

  changeSlider = (id, isAddon) => (event) => {
    const { packages, selectedPackage } = this.state;
    const field = isAddon ? "addons" : "items";
    let newCount = parseInt(event.target.value, 10);
    
    if (isAddon || !packages[selectedPackage].items[0].category) {
      const element = packages[selectedPackage][field].find((e) => e.id === id);

      if (element.minCount > newCount) {
        newCount = element.minCount;
      }
      
      this.setState({
        packages: {
          ...packages,
          [selectedPackage]: {
            ...packages[selectedPackage],
            [field]: packages[selectedPackage][field].map((e) => ({
              ...e,
              count: e.id === id ? newCount : e.count
            }))
          }
        }
      }, () => {
        const { match: { url } } = this.props;
        const packageUrl = url.split("/");
        if (packageUrl[2]) {
          ls.set(packageUrl[2], this.state.packages);
        }
      });
    } else {
      const element =
        packages[selectedPackage].items
          .find((e) => e.items.find(i => i.id === id))
          .items.find(i => i.id === id);

      if (element.minCount > newCount) {
        newCount = element.minCount;
      }

      this.setState({
        packages: {
          ...packages,
          [selectedPackage]: {
            ...packages[selectedPackage],
            items: packages[selectedPackage].items.map((e) => ({
              ...e,
              items: e.items.map(i => ({
                ...i,
                count: i.id === id ? newCount : i.count
              }))
            }))
          }
        }
      }, () => {
        const { match: { url } } = this.props;
        const packageUrl = url.split("/");
        if (packageUrl[2]) {
          ls.set(packageUrl[2], this.state.packages);
        }
      });
    }
  };

  sendRequest = () => {
    const { contact, date, notes, packages, selectedPackage } = this.state;

    const renderItem = (item, isAddon) => {
      const price = getItemTotal(item, isAddon);
      return `${item.title}${item.count !== undefined ? ` (count: ${item.count})` : ''}${price ? ` — $${price}` : ''}`;
    };

    let packageTotal = packages[selectedPackage].price;
    const addons = packages[selectedPackage].addons.filter(addon => addon.checked);
    const categories = [];

    packages[selectedPackage].items.forEach(item => {
      let categoryTotal = 0;
      if (item.category) {
        for (let i of item.items) {
          categoryTotal += getItemTotal(i);
        }
        packageTotal += categoryTotal;
        categories.push({
          title: item.category,
          items: item.items.map(renderItem),
        });
      } else {
        if (categories.length === 0) {
          categories.push({
            title: 'Items',
            items: [],
          });
        }
        packageTotal += getItemTotal(item);
        categories[0].items.push(renderItem(item));
      }
    })
    
    if (addons.length > 0) {
      categories.push({
        title: 'Add-ons',
        items: [],
      });
    }

    let addonsTotal = 0;

    addons.forEach(addon => {
      addonsTotal += getItemTotal(addon, true);
      packageTotal += getItemTotal(addon, true);
      categories[categories.length - 1].items.push(renderItem(addon, true));
    });

    if (addons.length > 0) {
      categories[categories.length - 1].items.push('');
      categories[categories.length - 1].items.push(`Add-ons subtotal: $${addonsTotal}`);
    }

    const packageItems = {};
    categories.map(c => ({[c.title]: c.items})).forEach(i => {
      const [key, items] = Object.entries(i)[0];
      packageItems[key] = items.join(`\n`);
    })

    const body = {
      Date: moment(date).format('MM-DD-YYYY'),
      'Contact Information': contact,
      Notes: notes,
      Package: `${packages[selectedPackage].title} ($${packages[selectedPackage].price})`,
      ...packageItems,
      Total: `$${packageTotal}`,
    }

    const data = new FormData();
    const fields = ['Date', 'Contact Information', 'Notes', 'Package'];

    if (packageItems.Items) {
      fields.push('Items')
    } else {
      fields.push('Ceremony', 'Reception');
    }    
    if (packageItems['Add-ons']) {
      fields.push('Add-ons');
    }
    fields.push('Total');

    data.append('formDataNameOrder', JSON.stringify(fields));
    Object.keys(body).forEach(key => data.append(key, body[key]));

    this.setState({
      isSending: true,
    }, () => {
      // fetch('https://formspree.io/f/xrgodybn', {
      fetch('https://script.google.com/macros/s/AKfycbyhDkg2yoyTdQUEf_1P5g9FOWONC8i7W9zXY_h-Dss9MvffaP8/exec', {
        method: 'POST',
        // body: JSON.stringify(body),
        body: data,
      })
      .finally(() => {
        this.setState({ isSent: true }, () => {
          setTimeout(() => {
            this.setState({ isSending: false, isSent: false });
          }, 2000);
        });
      })
    });
  }

  onScroll = () => {
    const allHeadings = document.getElementsByTagName('h3');
    let currentSectionTitle = '';
    for (let h of allHeadings) {
      const top = h.getBoundingClientRect().top;
      const text = (h && h.innerText) || '';
      if (top < 140) {
        currentSectionTitle = text;
      }
    }
    this.setState({ currentSectionTitle });
  };

  changeSwipeElements = (id, dx) => {
    const elContainer = document.getElementById(`swipe-container-${id}`);
    const elHandle = document.getElementById(`swipe-handle-${id}`);
    const elImage = document.getElementById(`swipe-image-${id}`);
    if (elContainer) {
      elContainer.style.left = dx;
    }
    if (elHandle) {
      elHandle.style.width = dx || 5;
      elHandle.style.left = -dx;
    }
    if (elImage) {
      // elImage.style.height = dx ? `calc(100% + ${dx / 1.5}px)` : 0;
      // elImage.style.top = -dx / 3;
      // elImage.style.bottom = -dx / 3;
    }
  };

  handleSwipedRight = (item) => () => {
    if (item.image) {
      this.setState({ showImage: item.id, swipingItem: false });
    }
  };

  handleImagePreviewClose = (id) => (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ showImage: false, swipingItem: false });
    this.changeSwipeElements(id, 0);
  };

  handleSwiping = (item) => (event) => {
    const { swipingItem } = this.state;
    if (item.image) {
      if (event.deltaX > 5) {
        if (swipingItem !== item.id) {
          this.setState({ swipingItem: item.id });
        }
        this.changeSwipeElements(item.id, event.deltaX);
      } else {
        this.setState({ swipingItem: false });
      }
    } else {
      this.setState({ swipingItem: false });
    }
  };

  handleSwiped = (item) => () => {
    this.setState({ showImage: false, swipingItem: false });
    this.changeSwipeElements(item.id, 0);
  };

  showSwipeHint = (id) => () => {
    if (!this.swipeHintShown) {
      this.swipeHintShown = true;
      setTimeout(() => {
        this.setState({ showSwipeHint: id }, () => {
          setTimeout(() => {
            this.setState({ showSwipeHint: false });
          }, 2000);
        });
      }, 500);
    }
  };

  debouncedOnScroll = debounce(this.onScroll, 1);

  componentDidMount() {
    document.getElementById('app').addEventListener('scroll', this.debouncedOnScroll);
  }

  componentWillUnmount() {
    document.getElementById('app').removeEventListener('scroll', this.debouncedOnScroll);
  }

  renderPackage = (key) => {
    const { packages, selectedPackage } = this.state;

    return (
      <div
        className={cx("plan", { selected: key === selectedPackage })}
        key={key}
        onClick={this.selectPackage(key)}
      >
        <div>{packages[key].title}</div>
        <div>${packages[key].price}</div>
        <button disabled={selectedPackage === key}>
          {key === selectedPackage ? "selected" : "select"}
        </button>
      </div>
    );
  };

  renderItem = (item, isAddon) => {
    const { packages, selectedPackage, swipingItem, showSwipeHint } = this.state;
    const isEditable = isAddon || item.pricePerItem !== undefined;
    let totalPrice = item.basePrice || 0;

    if (item.pricePerItem !== undefined) {
      if (item.includedCount !== undefined) {
        if (item.includedCount < item.count) {
          totalPrice += (item.count - item.includedCount) * item.pricePerItem;
        }
      } else {
        totalPrice += item.count * item.pricePerItem;
      }
    }

    const containerProps = {};
    if (!item.category && item.image) {
      containerProps.onSwipedRight = throttle(this.handleSwipedRight(item), 50);
      containerProps.onSwiping = throttle(this.handleSwiping(item), 50);
      containerProps.onSwiped = throttle(this.handleSwiped(item), 50);
      containerProps.itemId = item.id;
      containerProps.onVisible = this.showSwipeHint(item.id);
    }

    return (
      <SwipeableContainer
        className={cx({ "item": !item.category, "is-addon": isAddon, 'is-header': item.category, 'show-swipe-hint': showSwipeHint === item.id })}
        key={item.id || item.category}
        id={`swipe-container-${item.id || item.category}`}
        {...containerProps}
      >
        {
          item.image && (
            <div
              className="image-handle"
              id={`swipe-handle-${item.id}`}
            >
              {
                (item.id === swipingItem || item.id === showSwipeHint) &&
                <img
                  src={item.thumb}
                  alt={item.title}
                  key={item.id}
                  id={`swipe-image-${item.id}`}
                />
              }
            </div>
          )
        }
        {item.category ? (
          <div className="sub-category">
            <h3>{item.category}</h3>
            {
              item.description &&
              <div className="description">{item.description}</div>
            }
            {item.items.sort((a, b) => a.order - b.order).map((i) => this.renderItem(i, isAddon))}
          </div>
        ) : (
          <React.Fragment>
            <div
              style={{
                width: `calc(100% - ${Object.keys(packages).length * 95 - 15}px)`,
              }}
              className={cx("details", {
                "full-width": Object.keys(packages).length === 1
              })}
            >
              <div className="top">
                <input
                  checked={!!item.checked}
                  type="checkbox"
                  onChange={this.toggleAddon(item.id)}
                />
                <div>
                  <div className="title">{item.title}</div>
                  <div className="description">{item.description}</div>
                </div>
              </div>
              <div className={cx("bottom", { "is-editable": isEditable })}>
                <div className="price">
                  {item.price !== undefined &&
                    item.price !== 0 &&
                    `$${item.price}`}
                  {item.price === 0 && "Free"}
                </div>
                {item.pricePerItem !== undefined && item.maxCount !== 0 && (
                  <div className="slider">
                    {
                      (item.includedCount !== undefined || item.basePrice || item.count)
                        ? <div className="price">
                            Price:&nbsp;
                            {item.includedCount !== undefined
                              ? `${totalPrice ? `$${totalPrice}` : 'Included'}`
                              : (
                                item.basePrice
                                  ? `$${item.basePrice} + ${item.count} x $${item.pricePerItem} = $${totalPrice}`
                                  : `${item.count} x $${item.pricePerItem} = $${totalPrice}`
                              )}
                          </div>
                        : null
                    }
                    {
                      item.maxCount !== 0 &&
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <select
                            value={item.count}
                            onChange={this.changeSlider(item.id, isAddon)}
                          >
                            { range(item.minCount, item.maxCount + 1, item.step || 1).map(i => (
                              <option key={i} value={i}>{i}</option>
                            )) }
                          </select>
                          {
                            item.units && (
                              <div className="units">
                                {item.count === 1 ? item.units[0] : item.units[1]}
                              </div>
                            )
                          }
                        </div>
                    }                        
                  </div>
                )}
              </div>
            </div>
            {!isAddon && Object.keys(packages).length > 1 && (
              <div className="in-plans">
                {Object.keys(packages).map((key) => {
                  const inPlanText = item.inPlanText !== undefined && get(findItemInPackage(item.id, packages[key].items), 'inPlanText');
                  return item.inPlanText !== undefined && inPlanText !== undefined
                    ? <span key={`${key}_${item.id}`} className={cx({ selected: key === selectedPackage }, inPlanText ? 'yes' : 'no')}>{inPlanText}</span>
                    : (
                      <i key={`${key}_${item.id}`}
                        className={cx({ selected: key === selectedPackage }, 'fa', isItemInPackage(item.id, packages[key].items, key) ? 'fa-check yes' : 'fa-times no')}
                      />
                    )
                })}
              </div>
            )}
          </React.Fragment>
        )}
      </SwipeableContainer>
    );
  };

  renderInvoice() {
    const { packages, selectedPackage } = this.state;

    const renderItem = (item, isAddon) => {
      const price = getItemTotal(item, isAddon);
      return (
        <div className="invoice-item">
          <div className="left">
            <div className="title">{item.title}</div>
            <div className="description">{item.count !== undefined && `count: ${item.count}`}</div>
          </div>
          <div className="right">{price ? `$${price}` : 'Included'}</div>
        </div>
      );
    };

    let packageTotal = packages[selectedPackage].price;
    let addonsTotal = 0;
    const addons = packages[selectedPackage].addons.filter(addon => addon.checked);
  
    return (
      <div className="invoice">
        <h1>{packages[selectedPackage].title}</h1>
        <div className="invoice-section">
          {packages[selectedPackage].items
            .filter(item => item.category || item.count !== undefined || item.price !== undefined || item.pricePerItem !== undefined)
            .map(item => {
              let categoryTotal = 0;
              if (item.category) {
                for (let i of item.items) {
                  categoryTotal += getItemTotal(i);
                }
                packageTotal += categoryTotal;
              } else {
                packageTotal += getItemTotal(item);
              }
              return (
                item.category
                ? (
                  <React.Fragment>
                    <h2>{item.category}</h2>
                    {item.items.map(renderItem)}
                    {
                      categoryTotal
                      ? <div className="subtotal">{item.category} Subtotal: ${categoryTotal}</div>
                      : null
                    }
                  </React.Fragment>
                )
                : renderItem(item)
              );
            })
          }
          { addons.length > 0 && <h2>Add-ons</h2> }
          {
            addons.map(addon => {
              addonsTotal += getItemTotal(addon, true);
              packageTotal += getItemTotal(addon, true);
              return renderItem(addon, true);
            })
          }
          {
            addonsTotal
            ? <div className="subtotal">Add-ons Subtotal: ${addonsTotal}</div>
            : null
          }
        </div>
  
        <div className="invoice-section total-amount">
          Total Amount: ${packageTotal}
        </div>
      </div>
    );
  }

  renderPackages() {
    const { packages, selectedPackage, showInvoice, currentSectionTitle, showImage } = this.state;
    const packageDetails = packages[selectedPackage];
    let allItems = [];
    if (packages[selectedPackage].items[0].category) {
      const categories = cloneDeep(packages[selectedPackage].items);
      const otherPackages =
        Object.keys(packages)
          .filter((key) => key !== selectedPackage)
          .map(key => packages[key]);
      categories.forEach(category => {
        const sameCategoryInOtherPackages = otherPackages.map(p => p.items.find(i => i.category === category.category));
        category.items = unionBy(
          category.items,
          ...sameCategoryInOtherPackages.map(c => c.items),
          'id'
        );
      });
      allItems = categories;
    } else {
      allItems = unionBy(
        packages[selectedPackage].items,
        ...Object.keys(packages)
          .filter((key) => key !== selectedPackage)
          .map((key) => packages[key].items),
        "id"
      );
    }

    return (
      <React.Fragment>
        <div className="inner-container">
          <div className="section">
            <div className="header">
              <div className="selected-plan">
                <div className="back">
                  {
                    this.props.history.length > 1 &&
                    <a href="https://events.anglersgrill.com/weddings">&larr;&nbsp;Go Back</a>
                    // <a href="/">&larr;&nbsp;Go Back</a>
                    // <Link to="/" onClick={() => this.props.history.goBack()}>&larr;&nbsp;Go Back</Link>
                  }
                </div>
                <div className="actions">
                  <SplitButton>
                    <button className="total" onClick={this.toggleInvoice}>
                      {
                        showInvoice
                        ? 'Customize'
                        : `Total $${this.calculateTotal()}`
                      }
                    </button>
                    <button onClick={this.toggleInvoice}>
                      {
                        showInvoice
                        ? 'Customize Package'
                        : 'Show Calculation'
                      }
                    </button>
                    <button onClick={this.resetAddons}>
                      Reset Add-ons
                    </button>
                  </SplitButton>
                </div>
                <div className="current-section">{ currentSectionTitle }</div>
              </div>
              <div className="plans">
                {Object.keys(packages).map(this.renderPackage)}
              </div>
            </div>
            {
              !showInvoice && (
                <React.Fragment>
                  <div className="items">
                    {allItems.sort((a, b) => a.order - b.order).map((item) => this.renderItem(item))}
                  </div>
                  <div className="items">
                    <h3 style={{ paddingLeft: 20 }}>Add-ons</h3>
                    {packageDetails.addons.map((item) => this.renderItem(item, true))}
                  </div>
                </React.Fragment>
              )
            }
            <div className={cx('invoice-wrapper', { expanded: showInvoice })}>
              { showInvoice && this.renderInvoice() }
            </div>
          </div>

          <div className="footer">
            { this.renderSendRequest() }
            Need Help? Call <a href="tel:+18507391109">850-739 1109</a>.
          </div>

          {
            showImage !== false && (
              <div
                className="image-wrapper"
                onTouchEnd={this.handleImagePreviewClose(showImage)}
                onClick={this.handleImagePreviewClose(showImage)}
              >
                <img src={ITEMS[showImage].image} alt={ITEMS[showImage].title} />
                <i className="close fa fa-times"/>
              </div>
            )
          }
        </div>
      </React.Fragment>
    );
  }

  renderSendRequest() {
    const { contact, date, notes } = this.state;
    return (
      <div className="request">
        <div className="picker">
          <label htmlFor="date">Preferred Date</label>
          <DatePicker
            id="date"
            selected={date}
            inline
            popperPlacement="top-center"
            onChange={(date) => this.setState({ date })}
          />
        </div>

        <label htmlFor="contact">Contact information</label>
        <input
          type="text"
          id="contact"
          value={contact}
          placeholder="Your name, email and phone number"
          onChange={event => this.setState({ contact: event.target.value })}
        />

        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          placeholder="Anything you'd like to add to your request"
          value={notes}
          onChange={event => this.setState({ notes: event.target.value })}
        />
        <button
          className="submit"
          disabled={!contact}
          onClick={this.sendRequest}
        >
          Submit request
        </button>
      </div>
    );
  }

  render() {
    const { selectedPackage, isSending, isSent } = this.state;
    return (
      <div className="packages-container">
        {selectedPackage && this.renderPackages()}
        {
          isSending && (
            <div className="sending">
              <i className={cx("fa fa-check", { 'is-sent': isSent })} />
              { isSent ? '' : 'Sending' }
            </div>
          )
        }
      </div>
    );
  }
}

export default withRouter(Packages);
