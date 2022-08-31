import React, { useState, useEffect, useRef } from 'react';
import IntroModal from './introModal';
import GLVis from './glVis';
import ResponseDisplay from './responseDisplay';
import AudioTrackPlayer from './audioTrackPlayer';
import DrawingTools from './drawingTools';
import DrawingCanvas from './drawingCanvas';
import ColourPicker from './colourPicker';
import SettingsMenu from './settingsMenu';

/* set timer refresh rate in ms */
const timerRefreshRate = 15;

export default function DesktopApp(props) {

  const [currentModalPage, setCurrentModalPage] = useState(1);
  var currentModalPageRef = useRef(currentModalPage);
  useEffect(() => {currentModalPageRef.current = currentModalPage}, [currentModalPage]);

  const[askResponse, setAskResponse] = useState(false);
  const[readyToRespond, setReadyToRespond] = useState(false);  

  const[timer, setTimer] = useState(0.);
  const[timerInterval, setTimerInterval] = useState(null);
  const[audioSourceRef, setAudioSourceRef] = useState(null);

  // graphics settings  - 1 high 10 medium 20 low
  const[graphicsSettings, setGraphicsSettings] = useState(1);

  return (
    <div id="desktop-wrapper">
      {/* Intro Modal */}
      <IntroModal
        currentModalPage={currentModalPage}
        currentModalPageRef={currentModalPageRef}
        setCurrentModalPage={setCurrentModalPage}
        trackHasUpdated={props.trackHasUpdated}
        toggleModal={props.toggleModal}
        modalIsOpen={props.modalIsOpen}
        setIntroModal={props.setIntroModal}
        currentCycle={props.currentCycle}
        setCurrentCycle={props.setCurrentCycle}
        cyclePreset={props.cyclePreset}
        tideData={props.tideData} />
      {/* Settings Menu */}
      {!props.modalIsOpen &&
      <SettingsMenu
        toggleModal={props.toggleModal}
        setGraphicsSettings={setGraphicsSettings}
        toggleFocus={props.toggleFocus} />}
      {/* Daily Prompt */}
      <div id="current-prompt-wrapper" className="Collider">
        <div id="current-prompt">
          {props.cyclePreset.prompt}
        </div>
      </div>
      {/* Audio Player */}
      <AudioTrackPlayer
        trackSrc={props.cyclePreset.trackSrc}
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
                <button id="draw-input-select" className="InputSelectButton" onClick={() => props.setInput(true)}>draw</button>
                &nbsp;/&nbsp;
                <button id="text-input-select" className="InputSelectButton ActiveInputButton" onClick={() => props.setInput(false)}>write</button>
                &nbsp;a response
              </span>
            </div>
            <div id="input-area">
              <textarea id="text-input" name="text based prompt response" placeholder="Please type your response here..." />
              <DrawingTools
                undoDrawing={props.undoDrawing}
                redoDrawing={props.redoDrawing}
                toggleEraser={props.toggleEraser}
                colours={props.colours}
                brushSize={props.brushSize}
                setBrushSize={props.setBrushSize} />
              <DrawingCanvas 
                brushColour={props.colours[props.selectedColour]}
                brushSize={props.brushSize}
                setDrawingCanvas={props.setDrawingCanvas}
                setCurrentCanvasState={props.setCurrentCanvasState}
                setIsDrawing={props.setIsDrawing} />
              <ColourPicker 
                colours={props.colours}
                setSelectedColour={props.setSelectedColour}
                setCurrentColours={props.setCurrentColours} />
            </div>
          </div>
          <button id="response-submit-button" 
                onClick={() => {
                  props.submitResponse();
                  setReadyToRespond(false);
              }}>submit my response</button>
        </>            
      }
      {/* External Response Overlay */}
      <ResponseDisplay 
        responseData={props.responseData}
        height={props.height}
        width={props.width} />
      {/* Background Visuals */}
      <div id="bg-vis-wrapper">              
        <GLVis
          shaderName={props.cyclePreset.shaderName}
          graphicsSettings={graphicsSettings}
          timer={timer}
          height={props.height}
          width={props.width}
          tideData={props.tideData} />          
      </div> 
    </div>
  )
  /* update timer value (based on track position) */
  function startTimer() {
    if(timerInterval !== null){
      clearInterval(timerInterval); 
      setTimerInterval(setInterval(() => {
        setTimer(100 * audioSourceRef.currentTime/audioSourceRef.duration)
      }, timerRefreshRate+graphicsSettings));
    } else {
      setTimerInterval(setInterval(() => {
        setTimer(100 * audioSourceRef.currentTime/audioSourceRef.duration)
      }, timerRefreshRate+graphicsSettings));
    }
  }
  function pauseTimer() {
    clearInterval(timerInterval);    
  }
  function restartTimer() {
    setTimer(0.);    
  }  
}
