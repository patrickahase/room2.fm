import React, { useEffect, useState, Component } from 'react';
import A11yDialog from 'a11y-dialog';
import { acknowledgementOfCountryText, introText, instructionsText, /* warningText */ } from '../content/modalText';
import {sunriseText, moonShape, nextMoonShape} from './timeCalc';
export default function IntroModal(props) {
  const [currentModalPage, setCurrentModalPage] = useState(1);
  
  // run init on load
  useEffect(() => {
    const container = document.getElementById("AOC-modal");
        const dialog = new A11yDialog(container);
        dialog.show();
  },[]);

  let modalPages = [
    //page 1 Logo - no continue button on this one if the site needs to get closed
    <div id="logo-wrapper">
      <div id="text-logo">
        <pre id="pre-logo-wrapper">
          <div id="logo-line-1">__________________________________________________________________<u className="text-gradient-1">/\\\\\\\\\</u>_____        <br/></div>
          <div id="logo-line-2">&nbsp;________________________________________________________________<u className="text-gradient-2">/\\\///////\\\</u>___       <br/></div>
          <div id="logo-line-3">&nbsp;&nbsp;_______________________________________________________________<u className="text-gradient-3">\///</u>______<u className="text-gradient-3">\//\\\</u>__      <br/></div>
          <div id="logo-line-4">&nbsp;&nbsp;&nbsp;__<u className="text-gradient-4">/\\/\\\\\\\</u>______<u className="text-gradient-4">/\\\\\</u>________<u className="text-gradient-4">/\\\\\</u>_______<u className="text-gradient-4">/\\\\\</u>__<u className="text-gradient-4">/\\\\\</u>_____________<u className="text-gradient-4">/\\\/</u>___     <br/></div>
          <div id="logo-line-5">&nbsp;&nbsp;&nbsp;&nbsp;_<u className="text-gradient-5">\/\\\/////\\\</u>___<u className="text-gradient-5">/\\\///\\\</u>____<u className="text-gradient-5">/\\\///\\\</u>___<u className="text-gradient-5">/\\\///\\\\\///\\\</u>________<u className="text-gradient-5">/\\\//</u>_____    <br/></div>
          <div id="logo-line-6">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_<u className="text-gradient-6">\/\\\</u>___<u className="text-gradient-6">\///</u>___<u className="text-gradient-6">/\\\</u>__<u className="text-gradient-6">\//\\\</u>__<u className="text-gradient-6">/\\\</u>__<u className="text-gradient-6">\//\\\</u>_<u className="text-gradient-6">\/\\\</u>_<u className="text-gradient-6">\//\\\</u>__<u className="text-gradient-6">\/\\\</u>_____<u className="text-gradient-6">/\\\//</u>________   <br/></div>
          <div id="logo-line-7">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_<u className="text-gradient-7">\/\\\</u>_________<u className="text-gradient-7">\//\\\</u>__<u className="text-gradient-7">/\\\</u>__<u className="text-gradient-7">\//\\\</u>__<u className="text-gradient-7">/\\\</u>__<u className="text-gradient-7">\/\\\</u>__<u className="text-gradient-7">\/\\\</u>__<u className="text-gradient-7">\/\\\</u>___<u className="text-gradient-7">/\\\/</u>___________  <br/></div>
          <div id="logo-line-8">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_<u className="text-gradient-8">\/\\\</u>__________<u className="text-gradient-8">\///\\\\\/</u>____<u className="text-gradient-8">\///\\\\\/</u>___<u className="text-gradient-8">\/\\\</u>__<u className="text-gradient-8">\/\\\</u>__<u className="text-gradient-8">\/\\\</u>__<u className="text-gradient-8">/\\\\\\\\\\\\\\\</u>_ <br/></div>
          <div id="logo-line-9">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_<u className="text-gradient-9">\///</u>_____________<u className="text-gradient-9">\/////</u>________<u className="text-gradient-9">\/////</u>_____<u className="text-gradient-9">\///</u>___<u className="text-gradient-9">\///</u>___<u className="text-gradient-9">\///</u>__<u className="text-gradient-9">\///////////////</u>__<br/></div>
        </pre>            
      </div>
    </div>,
  
    //page 2 AOC
    <>
      <div id="modal-text-wrapper" className="modal-text-wrapper-aoc">
          <div id="modal-text" style={{fontSize: "2.5rem", justifyContent: "space-around"}}>
            {acknowledgementOfCountryText}
          </div>
      </div>
      <button id="modal-continue-button" onClick={() => setCurrentModalPage(currentModalPage + 1)}> Continue </button>
    </>,

    //BF working on time stuff
    /*<>
      <div id="modal-title-wrapper">
        <div id="modal-title">
          Welcome to room2.fm live!
        </div>
      </div>
      <div id="modal-text-wrapper">
        <div id="modal-text-vert-align">
          <div id="modal-text">
            {sunriseText}
            {moonShape}
            {nextMoonShape}
          </div>
        </div>
      </div>        
      <button id="modal-continue-button" onClick={() => setCurrentModalPage(currentModalPage + 1)}> Continue </button>
    </>, */
  
    //page 3 Welcome
    <>
      <div id="modal-title-wrapper">
        <div id="modal-title">
          Welcome to room2.fm async
        </div>
        <hr />
      </div>
      <div id="modal-text-wrapper">
          <div id="modal-text">
            {introText}
          </div>
      </div>        
      <button id="modal-continue-button" onClick={() => setCurrentModalPage(currentModalPage + 1)}> Continue </button>
    </>,
  
    //page 4 Instructions
    <>
      <div id="modal-title-wrapper">
        <div id="modal-title">
          Welcome to room2.fm async
        </div>
        <hr />
      </div>
      <div id="modal-text-wrapper">
          <div id="modal-text">
            {instructionsText}
          </div>
      </div>        
      <button id="modal-continue-button" onClick={() => props.toggleModal()}> Continue </button>
    </>
  ]

  return (
    <div id="AOC-modal"
         className="ModalWrapper"
         aria-labelledby="modal-title"
         aria-hidden="false" >

      <div data-a11y-dialog-hide className="ModalOverlay" ></div>

      <div role="document" className="ModalBox">
        {modalPages[currentModalPage]}
      </div>
    </div>
  )
}