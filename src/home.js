import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import ceremonyImage from '../assets/img/ceremony.png';
import receptionImage from '../assets/img/reception.png';

function home() {
  return (
    <div className="packages-wrapper">
      <div className="package">
        <Link to="/package/ceremony-and-reception">
          <div className="multi-image">
            <img src={ceremonyImage} alt="ceremony and reception" />
            <img src={receptionImage} alt="ceremony and reception" />
          </div>
          <span>Ceremony And Reception</span>
          <span className="from">From $2900</span>
        </Link>
      </div>
      <div className="package">
        <Link to="/package/ceremony-on-the-beach">
          <img src={ceremonyImage} alt="ceremony on the beach" />
          <span>Ceremony Only</span>
          <span className="from">From $570</span>
        </Link>
      </div>
      <div className="package">
        <Link to="/package/reception-only">
          <img src={receptionImage} alt="reception only" />
          <span>Reception Only</span>
          <span className="from">From $1800</span>
        </Link>
      </div>
    </div>
  );
}

export default withRouter(home);
