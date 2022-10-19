import React, { useState, useEffect, useRef } from 'react';
import './DesktopApp.css';
import BGVis from './components/bgVis';
import Marquee from './components/marquee';
import ResponseDisplay from './components/responseDisplay';
import io from 'socket.io-client';

import TodayLogo from './assets/TODAY_LOGOTYPE_MONO_WHITE.svg';
import room2Logo from './assets/room2-logo.svg';
import { useParams } from 'react-router-dom';

const socket = io();

export default function DesktopApp() {

  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
  //how often to call the live update loop
  const liveUpdateTime = 5000;
  // last response id from database
  const [lastResponseID, setLastResponseID] = useState(0);
  var lastResponseIDRef = useRef(lastResponseID);
  useEffect(() => {lastResponseIDRef.current = lastResponseID}, [lastResponseID]);
  // responses from server
  const [responseData, setResponseData] = useState([
    /* ["https://thelongesthumstore.sgp1.digitaloceanspaces.com/room2-purpose-live/1666089854386.png", "image"],
    ["ry", "text"], */
  ]);
  var responseDataRef = useRef(responseData);
  useEffect(() => {responseDataRef.current = responseData}, [responseData]);
  // current prompt
  const [currentPrompt, setCurrentPrompt] = useState('What do you hope for?');
  // shader id
  let shaderIDParam = useParams().shaderID;
  const [shaderID, setShaderID] = useState(0);
  var shaderIDRef = useRef(shaderID);
  useEffect(() => {shaderIDRef.current = shaderID}, [shaderID]);

  // run on init
  useEffect(() => {
    //liveUpdate();
    setWindowSize([window.innerWidth, window.innerHeight]);
    window.addEventListener('resize', () => {
      setWindowSize([window.innerWidth, window.innerHeight])});
    // if using shader id from url update shader selection
    if(shaderIDParam) { setShaderID(shaderIDParam);};
    /* socket.on("receive-text-response", textResponse => {console.log("s",textResponse)});
    socket.on("receive-image-response", imageResponse => {console.log("s",imageResponse)}); */
    socket.on("receive-text-response", textResponse => {
      let returnedResponses =[];
      returnedResponses.push([textResponse, "text"]);
      setResponseData(returnedResponses);
    });
    socket.on("receive-image-response", imageResponse => {
      let returnedResponses =[];
      returnedResponses.push([imageResponse, "image"]);
      setResponseData(returnedResponses);
    });
    socket.on("receive-prompt", initData => {
      setCurrentPrompt(initData[0][0].currentPrompt);
      if(shaderIDRef.current < 4){
        setShaderID(shaderIDRef.current + 1);
      } else {
        setShaderID(0);
      }
    });
  }, []);

  return (
    <div id="desktop-wrapper" className="App">
      <div id="banner-wrapper">
        <div id="banner-logo-wrapper">
          <img className="BannerLogo" src={TodayLogo} />
          <div id="banner-x"><XIcon strokeColour={"white"} /></div>      
          <img className="BannerLogo" src={room2Logo} />
        </div>
        <Marquee
          text={"Today x room2 is live @ Purpose Conference 2022 "} />
      </div>
      <div id="bg-wrapper">
        <div id="bgShader-wrapper">
          <BGVis
            shaderID={shaderID}
            width={windowSize[0]}
            height={windowSize[1]*.9}
          />
        </div>
        <div id="bg-response-wrapper">
          <ResponseDisplay
            height={windowSize[1]}
            responseData={responseData}
            currentPrompt={currentPrompt} />
        </div>
        <div id="current-prompt-wrapper">
          <p id="current-prompt" className="Collider">
            {currentPrompt}
          </p>
        </div>
      </div>      
    </div>
  );

  // call to server for latest prompt and responses
  /* function liveUpdate(){
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
 */
  /* function updateStateFromServer(serverResData){
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
  } */

}

function XIcon(props){
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      fill='black'
      stroke={props.strokeColour}
      strokeWidth="15"
      >
        <path fill="none" 
              d=" M 10,-10
                  L 90,110
                  M 90,-10
                  L 10,110
                  " />
      
    </svg>
  )
}