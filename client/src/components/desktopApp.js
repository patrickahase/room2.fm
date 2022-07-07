import React, { useEffect, useState } from 'react';
import IntroModal from './introModal';
import GLVis from './glVis';
import ResponseDisplay from './responseDisplay';
import AudioTrackPlayer from './audioTrackPlayer';

/* set timer refresh rate in ms */
const timerRefreshRate = 50;

export default function DesktopApp(props) {

  const[askResponse, setAskResponse] = useState(false);
  const[readyToRespond, setReadyToRespond] = useState(false);

  const[timer, setTimer] = useState(0.);
  const[timerInterval, setTimerInterval] = useState(0.);
  const[audioSourceRef, setAudioSourceRef] = useState(null);

  return (
    <div id="desktop-wrapper">
      {props.modalIsOpen
        /* if true show modal */
        ? <IntroModal
            mobile={props.mobile}
            toggleModal={props.toggleModal} />
        /* else show the desktop app */
        : <>
          {/* Background Visuals */}
          <div id="bg-vis-wrapper">              
            <GLVis
              timer={timer}
              height={props.height}
              width={props.width} />          
          </div>
          {/* External Response Overlay */}
          <ResponseDisplay 
            getNextResponse={props.getNextResponse}
            responsesToDisplay={props.responsesToDisplay}
            height={props.height}
            width={props.width} />
          {/* Audio Player */}
          <AudioTrackPlayer
            setAudioSourceRef={setAudioSourceRef}
            startTimer={startTimer}
            pauseTimer={pauseTimer}
            restartTimer={restartTimer}
            setAskResponse={setAskResponse}
            />
          {/* Ask if ready to respond */} 
          {askResponse &&
            <button id="ready-submission-button"> submit response </button>
          }
          {/* Show response input */}
          {readyToRespond &&
            <div id="input-wrapper"></div>
          }
          </>
      }
    </div>
  )
  /* update timer value (based on track position) */
  function startTimer() {
    setTimerInterval(setInterval(() => {
      setTimer(100 * audioSourceRef.currentTime/audioSourceRef.duration)
    }, timerRefreshRate));
  }
  function pauseTimer() {
    clearInterval(timerInterval);    
  }
  function restartTimer() {
    setTimer(0.);    
  }
  
}
