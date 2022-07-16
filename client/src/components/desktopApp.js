import React, { useEffect, useState } from 'react';
import IntroModal from './introModal';
import GLVis from './glVis';
import ResponseDisplay from './responseDisplay';
import AudioTrackPlayer from './audioTrackPlayer';
import DrawingTools from './drawingTools';
import DrawingCanvas from './drawingCanvas';
import ColourPicker from './colourPicker';

/* set timer refresh rate in ms */
const timerRefreshRate = 50;

export default function DesktopApp(props) {

  const[askResponse, setAskResponse] = useState(false);
  const[readyToRespond, setReadyToRespond] = useState(false);
  /* if false it's assumed to be text instead */
  const[inputIsDraw, setInputIsDraw] = useState(false);

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
          {/* Daily Prompt */}
          <div id="current-prompt-wrapper">
            <div id="current-prompt">
              Take a deep breath. As you exhale, what feelings linger for you?
              <br />
              Share as much or as little as you’d like.
            </div>
          </div>
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
            <button id="ready-submission-button" onClick={() => {setReadyToRespond(true); setAskResponse(false);}}> i'm ready to respond </button>
          }
          {/* Show response input */}
          {readyToRespond &&
            <>                           
              <div id="input-wrapper">
                <div id="input-select-wrapper">
                  <span id="input-select">
                    I would like to&nbsp;
                    <button id="draw-input-select" className="InputSelectButton" onClick={() => setInput(true)}>draw</button>
                    &nbsp;/&nbsp;
                    <button id="text-input-select" className="InputSelectButton ActiveInputButton" onClick={() => setInput(false)}>write</button>
                    &nbsp;a response
                  </span>
                </div>
                <div id="input-area">
                  {!inputIsDraw
                   ?<textarea id="text-input" name="text based prompt response" placeholder="Please type your response here..." />
                   :<>
                      <DrawingTools
                        undoDrawing={props.undoDrawing}
                        redoDrawing={props.redoDrawing}
                        toggleEraser={props.toggleEraser}
                        colours={props.colours}
                        brushSize={props.brushSize}
                        setBrushSize={props.setBrushSize} />
                      <DrawingCanvas 
                        brushColour={props.colours[0]}
                        brushSize={props.brushSize}
                        setDrawingCanvas={props.setDrawingCanvas}
                        setCurrentCanvasState={props.setCurrentCanvasState}
                        setIsDrawing={props.setIsDrawing} />
                      <ColourPicker 
                        colours={props.colours}
                        setCurrentColours={props.setCurrentColours} />                      
                   </>                                    
                  }
                </div>               
              </div>
            </>            
          }
          {/* External Response Overlay */}
          <ResponseDisplay 
            getNextResponse={props.getNextResponse}
            responsesToDisplay={props.responsesToDisplay}
            height={props.height}
            width={props.width} />
          {/* Background Visuals */}
          <div id="bg-vis-wrapper">              
            <GLVis
              timer={timer}
              height={props.height}
              width={props.width} />          
          </div> 
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
  /* to change between draw and write - true = draw - false = text */
  function setInput(changeToDraw){
    if(changeToDraw){
      setInputIsDraw(true);
      document.getElementById("draw-input-select").classList.add("ActiveInputButton");
      document.getElementById("text-input-select").classList.remove("ActiveInputButton");
    } else {
      setInputIsDraw(false);
      document.getElementById("draw-input-select").classList.remove("ActiveInputButton");
      document.getElementById("text-input-select").classList.add("ActiveInputButton");
    }
  }
  
}
