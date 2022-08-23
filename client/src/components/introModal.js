import React, { useEffect, useState, Component } from 'react';
import A11yDialog from 'a11y-dialog';
import { acknowledgementOfCountryText, introText, instructionsText, creditsText, /* warningText */ } from '../content/modalText';
import CountdownCalc, {/*sunSetText,*/ currentMoonShape, moonShapeArray} from './timeCalc';
import { cycleDates } from '../content/cyclePresets';
import WhereAreYou from './whereModal';

export default function IntroModal(props) {
  
  // run init on load
  useEffect(() => {
    const container = document.getElementById("AOC-modal");
    const dialog = new A11yDialog(container);
    props.setCurrentModalPage(1);
    dialog.show();
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "!": 
        props.setCurrentCycle(0);
        props.setCurrentModalPage(props.currentModalPage + 1);
          break;
        case "$": 
        props.setCurrentCycle(3);
        props.setCurrentModalPage(props.currentModalPage + 1);
          break;
        default:
          return; // Quit when this doesn't handle the key event.
      }
    })
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
            {props.trackHasUpdated
            ? <TrackUpdateMessage />
            : <CountdownCalc currentCycle={props.currentCycle} />            
            }
            {instructionsText}            
            <br />
            <br />
            {creditsText}
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
        {props.currentModalPage < 2
          ? <>{modalPages[props.currentModalPage]}</>
          : <>
            <NineCycleBar currentCycle={props.currentCycle} />
            {modalPages[props.currentModalPage]}
            <CurrentCycleBar currentCycle={props.currentCycle} />
            </>
          }
      </div>
    </div>
  )
}

function NineCycleBar (props){

  let moonSpheres = moonShapeArray.map((num, i) =>
    {
      if(i < props.currentCycle){
        return <div className="MoonSphereWrapper" key={i} style={{opacity: 0.4}}>{moonShapeArray[i]}</div>
      } else if (i === props.currentCycle) {
        return <div className="MoonSphereWrapper" key={i} style={{opacity: 1}}>{moonShapeArray[i]}</div>
      } else {
        return <div className="MoonSphereWrapper" key={i} style={{opacity: 0.6}}>{moonShapeArray[i]}</div>
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
  let currentDate = Date.now();
  var cycleDuration = cycleDates[props.currentCycle].endTime - cycleDates[props.currentCycle].endTime;
  var currentPos = currentDate - cycleDates[props.currentCycle].endTime;
  var cents = 80 / cycleDuration;
  var percentage = cents * currentPos;
  var marginstyle = {marginTop: percentage + "vh"}
  if (percentage >= 76) { //this is approx 3 hours at the end of the cycle
    percentage = 76; //so that the moon doesn't overshoot the modal box
    marginstyle = {marginTop: percentage + "vh", animationName: "pulse"} //pulse to indicate changeover is soon
  }
  
  return(
    <>
    <div id="current-cycle-wrapper">
      <div className="CurrentMoonWrapper" style={marginstyle}>{currentMoonShape}</div>
      <div id="timeline-gradient"></div>
    </div>
    </>
  )
}

function TrackUpdateMessage(){
  return(
    <p style={{marginBottom: "1rem"}}>
      The selected track has been updated. Refresh the page to listen and respond to the new music and prompts.
    </p>
  )
}
