import React, { useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

// import video1 from '../assets/video/video.mp4';
// import video2 from '../assets/video/video4.mp4';
import combinedImage from '../assets/img/combined-package.png';
import ceremonyImage from '../assets/img/new-ceremony-only-package.png';
import receptionImage from '../assets/img/reception-only-package.png';

function home() {
  // const [video, setVideo] = useState(video1);
  document.location = 'https://www.emeraldcoastevents.com/weddings';
  /*
  return (
    <div className="packages-wrapper">
      <video autoPlay muted loop playsInline src={video} onClick={() => setVideo(video === video1 ? video2 : video1)} />
      <div className="packages-inner">
        <div className="package">
          <Link to="/package/ceremony-and-reception">
            <div className="left">
              <img src={combinedImage} alt="ceremony and reception" />
            </div>
            <div className="right">
              <span className="from">From $2900</span>
              <span>Ceremony And Reception</span>
            </div>
          </Link>
        </div>
        <div className="package">
          <Link to="/package/ceremony-on-the-beach">
            <div className="left">
              <img src={ceremonyImage} alt="ceremony on the beach" />
            </div>
            <div className="right">
              <span className="from">From $570</span>
              <span>Ceremony Only</span>
            </div>
          </Link>
        </div>
        <div className="package">
          <Link to="/package/reception-only">
            <div className="left">
              <img src={receptionImage} alt="reception only" />
            </div>
            <div className="right">
              <span className="from">From $1800</span>
              <span>Reception Only</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
  */
}

export default withRouter(home);
