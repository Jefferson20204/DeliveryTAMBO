import React from "react";
import "./Divider.css";

const Divider = ({ text = "o" }) => {
  return (
    <div className="divider">
      <hr className="divider-line" />
      <span className="divider-text">{text}</span>
      <hr className="divider-line" />
    </div>
  );
};

export default Divider;
