import React, { useState, useEffect } from 'react';
import AudioControls from './audioControls';
import DrawingCanvas from './drawingCanvas';
import IntroModal from './introModal';
import Marquee from './marquee';
import DrawingTools from './drawingTools';
import SettingsMenu from './settingsMenu';
import GLVis from './glVis';
import ResponseDisplay from './responseDisplay';
import { InfoOverlay } from './infoOverlay';
import ColourPicker from './colourPicker';
import VideoStreamPlayer from './videoStreamPlayer';

export default function DesktopApp(props){

  const [currentModalPage, setCurrentModalPage] = useState(0);
  const [showOverlay, setShowOverlay] = useState(true);

  return (
    <div id="desktop-wrapper">
      {props.modalIsOpen
        ? <IntroModal 
            mobile={props.mobile}
            setIntroModal={props.setIntroModal}
            currentModalPage={currentModalPage}
            setCurrentModalPage={setCurrentModalPage}
            toggleModal={props.toggleModal} />
        : <>
            <div id="room2-wrapper">

              {/* Top Banner */}
              <Marquee
                currentArtist={props.currentArtist} />

              {/* Visuals */} 
              <div id="vis-wrapper">
                {/* Background Visuals */} 
                <div id="bg-vis-wrapper">
                  {/*  */}
                  {/* <VideoStreamPlayer
                    analysing={props.analysing}
                    setAudioCtx={props.setAudioCtx}
                    setAudioGain={props.setAudioGain}
                    /> */}
                    {props.analysing &&
                      <div id="gl-prompt-wrapper">
                        <GLVis 
                          height={props.height}
                          width={props.width}
                        />
                        {/* <p id="gl-prompt">{props.currentPrompt}</p> */}
                      </div>
                    }
                  
                    
                  
                </div>
                {/* Response Overlay */}
                <ResponseDisplay 
                  responseData={props.responseData}
                  height={props.height}
                  width={props.width}
                  colliding={props.colliding} />
                {/* Menu and Prompt Overlay */}
                <div id="menu-prompt-wrapper">
                  {/* Settings Menu Overlay */}
                  <SettingsMenu
                    toggleFocus={props.toggleFocus} 
                    toggleModal={props.toggleModal} />
                  {/* Prompt and Input Selection */}
                  <div id="current-prompt-wrapper" className="Collider PromptCycle">
                    <div id="prompt-end-timer-wrapper">
                      <div id="prompt-end-timer" />
                      <div id="prompt-end-timer-overlay" />
                    </div>           
                    <div id="current-prompt">
                      <PromptSpan prompt={props.currentPrompt} />
 
                    </div>           
                    <div id="input-select-wrapper">
                      <span id="input-select">I would like to&nbsp;
                      <button id="draw-input-select" className="InputSelectButton" onClick={() => props.setInput(true)}>draw</button>&nbsp;/&nbsp;
                      <button id="text-input-select" className="InputSelectButton ActiveInputButton" onClick={() => props.setInput(false)}>write</button>
                      &nbsp;a response</span>
                    </div>
                  </div>
                </div>                
              </div>

              {/* Interface */}
              <div id="interface-wrapper">
                {/* Left Side Drawing Tools */}
                <DrawingTools
                  undoDrawing={props.undoDrawing}
                  redoDrawing={props.redoDrawing}
                  toggleEraser={props.toggleEraser}
                  colours={props.colours}
                  changeColourOrder={props.changeColourOrder}
                  changeColours={props.changeColours}
                  brushSize={props.brushSize}
                  setBrushSize={props.setBrushSize} /> 
                {/* Input Section */}
                <div id="input-wrapper">
                  {/* Writing Section */}            
                  <textarea id="text-input" name="text based prompt response" placeholder="Please type your response here..." />
                  {/* Drawing Section */} 
                  <DrawingCanvas 
                    brushColour={props.colours[0]}
                    brushSize={props.brushSize}
                    setDrawingCanvas={props.setDrawingCanvas}
                    setCurrentCanvasState={props.setCurrentCanvasState}
                    setIsDrawing={props.setIsDrawing} />
                </div>             
                {/* Right UI Panel */}
                <div id="right-ui-wrapper">
                  {/* Colour Picker */}
                  <div id="col-pick-wrapper">                
                    <ColourPicker 
                      colours={props.colours}
                      updateCanvasBrush={props.updateCanvasBrush}
                      setSelectedColour={props.setSelectedColour}
                      setCurrentColours={props.setCurrentColours} />              
                  </div>
                  {/* Submit Response Button */}             
                  <button id="response-submit-button" onClick={props.submitResponse}>
                    <span>SUBMIT RESPONSE</span>                
                  </button>
                  {/* Audio Settings */}
                  <AudioControls
                    audioCtx={props.audioCtx}
                    audioGain={props.audioGain}
                  />            
                </div>
              </div>
            {/* Info Overlay */}
            {showOverlay &&
              <InfoOverlay overlayToggle={() => setShowOverlay(false)} /> }
          </div>
          {/* dead simple text chat */}
          <iframe title="text chat" id="chat" src='https://deadsimplechat.com/34MeFCATo'></iframe>        
        </>}
    </div>
  )  
}

function PromptSpan(props){

  useEffect(() => {
    document.getElementById("prompt-span").innerHTML = props.prompt;
  }, []);

  return(
    <pre id="prompt-span"></pre>
  )
}
