import React, { useState, useRef } from 'react';
import cx from 'classnames';
import { range } from 'lodash';

import "./split-button.scss";

const Menu = ({ open, onClose, anchorEl, ...props}) => {
    const rect = anchorEl && anchorEl.getBoundingClientRect();
    return open && (
        <div className="overlay" onClick={onClose}>
            <div
                className="menu"
                style={{
                    position: 'absolute',
                    left: rect.left,
                    top: rect.top + rect.height + 5,
                }}
                {...props}
            />
        </div>
    );
};

const SplitButton = (props) => {
  const moreButtonRef = useRef();
  const [anchor, setAnchor] = useState(null);
  const { children } = props;
  const hasMore = children.length > 1 && range(1, children.length).some(i => children[i]);

  return (
      <div className={cx('split-button', props.className || '', { 'no-more': !hasMore })}>
          { Array.isArray(children) ? children[0] : children }
          {
              hasMore && (
                  <React.Fragment>
                      <button
                          ref={moreButtonRef}
                          disabled={props.disabled}
                          className="more"
                          onClick={() => setAnchor(moreButtonRef.current)}
                      >
                          <i className="fa fa-caret-down"/>
                      </button>
                      <Menu
                          anchorEl={anchor}
                          open={!!anchor}
                          onClose={() => setAnchor(null)}
                      >
                          { range(1, children.length).map(i => children[i]) }
                      </Menu>
                  </React.Fragment>
              )
          }
      </div>
  );
};

export default SplitButton;
