import React from "react";
import "./AppDownload.css";
import { assets } from "../../assets/assets"; 

const AppDownload = () => {
  return (
    <div className="app-download" id="appDownload">
      <h1>
        For Better Experience <br />
        Download Apsor App
      </h1>

      <div className="app-download-platforms">
        <img src={assets.play_store} alt="Google Play" />
        <img src={assets.app_store} alt="App Store" />
      </div>
    </div>
  );
};

export default AppDownload;
