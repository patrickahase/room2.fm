import React, { useState, useEffect, useRef } from 'react';
import './DesktopApp.css';
import BGVis from './components/bgVis';
import Marquee from './components/marquee';
import ResponseDisplay from './components/responseDisplay';

export default function DesktopApp() {

  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
  //how often to call the live update loop
  const liveUpdateTime = 5000;
  // last response id from database
  const [lastResponseID, setLastResponseID] = useState(0);
  var lastResponseIDRef = useRef(lastResponseID);
  useEffect(() => {lastResponseIDRef.current = lastResponseID}, [lastResponseID]);
  // responses from server
  const [responseData, setResponseData] = useState([]);
  // current prompt
  const [currentPrompt, setCurrentPrompt] = useState('this is a prompt');

  // run on init
  useEffect(() => {
    liveUpdate();
    setWindowSize([window.innerWidth, window.innerHeight]);
    window.addEventListener('resize', () => {
      setWindowSize([window.innerWidth, window.innerHeight])});
  }, []);

  return (
    <div id="desktop-wrapper" className="App">
      <div id="banner-wrapper">
        <img id="banner-logo" src={require("./assets/today-logo-placeholder.PNG")} alt="today logo"></img>
        <Marquee
          text={"Marquee Text but what about a longer text "} />
      </div>
      <div id="bg-wrapper">
        <div id="bgShader-wrapper">
          <BGVis />
        </div>
        <div id="bg-response-wrapper">
          <ResponseDisplay
            height={windowSize[1]}
            responseData={responseData} />
        </div>
        <div id="current-prompt-wrapper" className="Collider">
          <p id="current-prompt">
            {currentPrompt}
          </p>
        </div>
      </div>      
    </div>
  );

  // call to server for latest prompt and responses
  function liveUpdate(){
    //console.log("twice")
    fetch(`https://room2.fm/api/getLiveUpdate`, {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'POST',
      mode: 'cors',
      // send last responses id so we don't get older responses
      body: JSON.stringify({ lastResponseID: lastResponseIDRef.current})
    })
      .then(res => res.json())
      .then(res => updateStateFromServer(res.data));
      // loop liveUpdate function at set interval
      setTimeout(liveUpdate, liveUpdateTime);
  }

  function updateStateFromServer(serverResData){
    // update the prompt
    setCurrentPrompt(serverResData[0][0].currentPrompt);
    // add the new responses if any
    // array to push responses to
    let returnedResponses =[];
    
    if(serverResData[1].length){
      serverResData[1].forEach(response => {
        returnedResponses.push([response.RESPONSE, response.RESPONSE_TYPE]);
        setLastResponseID(response.id);
      });
      setResponseData(returnedResponses);
    }
  }

}