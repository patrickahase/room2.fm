import React, { useState } from 'react';
import './App.css';
import BGVis from './components/bgVis';
import Marquee from './components/marquee';
import ResponseDisplay from './components/responseDisplay';

function App() {

  const [responseData, setResponseData] = useState([]);

  return (
    <div id="desktop-wrapper" className="App">
      <div id="banner-wrapper">
        <img id="banner-logo" src={require("./content/today-logo-placeholder.PNG")} alt="today logo"></img>
        <Marquee
          text={"Marquee Text but what about a longer text "}
        />
      </div>
      <div id="bg-wrapper">
      <div id="bgShader-wrapper">
        <BGVis />
      </div>
      <div id="bg-response-wrapper">
        <ResponseDisplay
          responseData={responseData} />'
      </div>  
      </div>      
    </div>
  );
}

export default App;
