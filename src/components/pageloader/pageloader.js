import React from "react";
import "./pageloader.scss";

export default function PageLoader() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="spinner">
        <div className="spinner-item"></div>
        <div className="spinner-item"></div>
        <div className="spinner-item"></div>
      </div>
    </div>
  );
}
