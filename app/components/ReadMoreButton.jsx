import React from "react";
import "./readMoreButton.css";

const ReadMoreButton = () => {
  return (
    <div>
      <button className="learn-more">
        <span aria-hidden="true" className="circle">
          <span className="icon arrow"></span>
        </span>
        <span className="button-text">Learn More</span>
      </button>
    </div>
  );
};

export default ReadMoreButton;
