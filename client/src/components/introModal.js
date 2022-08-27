import React, { useEffect, useState, Component } from 'react';
import A11yDialog from 'a11y-dialog';
import { acknowledgementOfCountryText, introText, instructionsText, creditsText, /* warningText */ } from '../content/modalText';
import CountdownCalc, {sunsetText, currentMoonShape, moonShapeArray} from './timeCalc';
import { cycleDates } from '../content/cyclePresets';
import WhereAreYou from './whereModal';

export default function IntroModal(props) {
  
  // run init on load
  useEffect(() => {
    const container = document.getElementById("AOC-modal");
    const dialog = new A11yDialog(container);
    dialog.show();
    function secretKey(e){
      switch (e.key) {
        case "!": 
        props.setCurrentCycle(0);
        props.setCurrentModalPage(props.currentModalPage + 1);
          break;
        case "@": 
        props.setCurrentCycle(1);
        props.setCurrentModalPage(props.currentModalPage + 1);
          break;
        case "#": 
        props.setCurrentCycle(2);
        props.setCurrentModalPage(props.currentModalPage + 1);
          break;
        case "$": 
        props.setCurrentCycle(3);
        props.setCurrentModalPage(props.currentModalPage + 1);
          break;
        case "%": 
        props.setCurrentCycle(4);
        props.setCurrentModalPage(props.currentModalPage + 1);
          break;
        case "^": 
        props.setCurrentCycle(5);
        props.setCurrentModalPage(props.currentModalPage + 1);
          break;
        case "&": 
        props.setCurrentCycle(6);
        props.setCurrentModalPage(props.currentModalPage + 1);
          break;
        case "*": 
        props.setCurrentCycle(7);
        props.setCurrentModalPage(props.currentModalPage + 1);
          break;
        case "(": 
        props.setCurrentCycle(8);
        props.setCurrentModalPage(props.currentModalPage + 1);
          break;
        default:
          return; // Quit when this doesn't handle the key event.
      }
    }
    window.addEventListener("keydown", secretKey);

    return function cleanup(){
      window.removeEventListener("keydown", secretKey);
    }
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
      <div id="modal-text-wrapper" className="modal-text-wrapper-aoc" style={{textAlign: 'center'}}>
          <div id="modal-text" style={{alignItems: 'center', justifyContent: 'space-around'}}>
            {acknowledgementOfCountryText}
            <WhereAreYou />
          </div>          
      </div>
      <button id="modal-continue-button" onClick={() => nextModalPage()}> Continue </button>
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
      <button id="modal-continue-button" onClick={() => nextModalPage()}> Continue </button>
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
            The current cycle's track is:
            <br />
            <p style={{fontSize: '1.95rem'}}>{props.cyclePreset.trackDetails} by <a href={props.cyclePreset.artistLink} target="_blank" rel="noreferrer">{props.cyclePreset.artistDetails}</a></p>        
            <p>
            {sunsetText}
            {props.tideData.tideUp === 1
            ? <>In nearby waterways, the tide is rising. </>
            : <>In nearby waterways, the tide is falling. </>
            }
            {props.trackHasUpdated
            ? <TrackUpdateMessage />
            : <CountdownCalc currentCycle={props.currentCycle}/>            
            }
            </p>
            
            <br />       
            <br />
            {/* <p>
            room2 @ <a href="https://bleedonline.net/" target="_blank" rel="noreferrer">BLEED</a> will culminate in a live 
            event on Sunday 25 September, 14:00 – 19:00 AEST held both here at this URL and at Arts House - <a href="https://artshouse.sales.ticketsearch.com/sales/salesevent/76403" target="_blank" rel="noreferrer">tickets
              for the in person event can be found here</a>.
            </p> */}
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

  function nextModalPage(){
    props.setCurrentModalPage(props.currentModalPage + 1);
    document.getElementById("modal-text-wrapper").scrollTop = 0;
  }
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
  var cycleDuration = cycleDates[props.currentCycle].endTime - cycleDates[props.currentCycle].startTime;
  var currentPos = currentDate - cycleDates[props.currentCycle].startTime;
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
    <span style={{marginBottom: "1rem"}}>
      The selected track has been updated. Refresh the page to listen and respond to the new music and prompts.
    </span>
  )
}


