import React, { useEffect, useState, Component } from 'react';
import A11yDialog from 'a11y-dialog';
import { acknowledgementOfCountryText, introText, instructionsText, whereDisclaimer/* warningText */ } from '../content/modalText';
import {sunSetText, currentMoonShape, firstMoonShape, secondMoonShape, thirdMoonShape, fourthMoonShape, fifthMoonShape, sixthMoonShape, seventhMoonShape, eighthMoonShape, ninthMoonShape} from './timeCalc';

import WhereAreYou from './whereModal';

export default function IntroModal(props) {
  
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
    <div id="modal-page-wrapper">
      <div id="modal-text-wrapper" className="modal-text-wrapper-aoc">
          <div id="modal-text">
            {acknowledgementOfCountryText}
            <WhereAreYou />
            <br />
            {whereDisclaimer}
          </div>
          
      </div>
      <button id="modal-continue-button" onClick={() => props.setCurrentModalPage(props.currentModalPage + 1)}> Continue </button>
    </div>,


    //'Where Are We' Native Land info TBA here
    <div id="modal-page-wrapper">
      <div id="modal-title-wrapper">
        <div id="modal-title">
          Where are you?
        </div>
        <hr />
      </div>
      
      <div id="modal-text-wrapper">
          <div id="modal-text">
            <p>Native Land info too go here</p>
            <span className="ModalTextSmall">Disclaimer text to go here</span>
          </div>
      </div>        
      <button id="modal-continue-button" onClick={() => props.setCurrentModalPage(props.currentModalPage + 1)}> Continue </button>
    </div>,

    //BF working on time stuff
    <div id="modal-page-wrapper">
      <div id="modal-title-wrapper">
        <div id="modal-title">
          Welcome to room2.fm async
        </div>
        <hr />
      </div>
      
      <div id="modal-text-wrapper">
          <div id="modal-text">
            {sunSetText}
            {firstMoonShape}
            {secondMoonShape}
            {thirdMoonShape}
            {fourthMoonShape}
            {fifthMoonShape}
            {sixthMoonShape}
            {seventhMoonShape}
            {eighthMoonShape}
            {ninthMoonShape}
          </div>
      </div>        
      <button id="modal-continue-button" onClick={() => props.setCurrentModalPage(props.currentModalPage + 1)}> Continue </button>
    </div>,
  
    //page 3 Welcome
    <div id="modal-page-wrapper">
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
      <button id="modal-continue-button" onClick={() => props.setCurrentModalPage(props.currentModalPage + 1)}> Continue </button>
    </div>,
  
    //page 4 Instructions
    <div id="modal-page-wrapper">
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
    </div>
  ]

  return (
    <div id="AOC-modal"
         className="ModalWrapper"
         aria-labelledby="modal-title"
         aria-hidden="false" >

      <div data-a11y-dialog-hide className="ModalOverlay" ></div>

      <div role="document" className="ModalBox">
        {props.currentModalPage === 1
          ? <>{modalPages[props.currentModalPage]}</>
          : <>
            <NineCycleBar currentCycle={props.currentCycle} />
            {modalPages[props.currentModalPage]}
            <CurrentCycleBar />
          </>}
      </div>
    </div>
  )
}

function NineCycleBar (props){
  // this can be based on an array with the actual moon phases and then connected send out
    
  let moonSpheres = Array(9).fill(9).map((num, i) =>
    { if(i < props.currentCycle){
        return <div className="MoonSphereWrapper" key={i} style={{opacity: 0.2}}>{thirdMoonShape}</div>
      } else if (i === props.currentCycle) {
        return <div className="MoonSphereWrapper" key={i}>{fourthMoonShape}</div>
      } else {
        return <div className="MoonSphereWrapper" key={i} style={{opacity: 0.8}}>{sixthMoonShape}</div>
      }  
    }
  );
  return(
    <div id="nine-cycle-wrapper">
      {moonSpheres}
    </div>
  )
}

function CurrentCycleBar(props){
  return(
    <div id="current-cycle-wrapper">
      <div className="MoonSphereWrapper">{currentMoonShape}</div>
      <div id="timeline-gradient">
        <div id="timeline-marker"></div>
      </div>
    </div>
  )
}