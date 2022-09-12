import React, { Component, useState, useEffect, useRef } from 'react';
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

export default function DesktopApp(props){

  const [currentModalPage, setCurrentModalPage] = useState(1);

  // graphics settings  - 1 high 10 medium 20 low
  const[graphicsSettings, setGraphicsSettings] = useState(1);

  return (
    <div id="desktop-wrapper">
      {props.modalIsOpen
        ? <IntroModal 
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
                <div id="bg-vis-wrapper"></div>
                {/* Response Overlay */}
                <ResponseDisplay 
                  responseData={props.responseData}
                  height={props.height}
                  width={props.width} />
                {/* Menu and Prompt Overlay */}
                <div id="menu-prompt-wrapper">
                  {/* Settings Menu Overlay */}
                  <SettingsMenu
                    toggleFocus={props.toggleFocus} 
                    overlayToggle={props.toggleModal} />
                  {/* Prompt and Input Selection */}
                  <div id="current-prompt-wrapper" className="Collider">
                    <div id="prompt-end-timer-wrapper">
                      <div id="prompt-end-timer" />
                      <div id="prompt-end-timer-overlay" />
                    </div>           
                    <div id="current-prompt">
                      {props.currentPrompt}
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
                  <AudioControls />            
                </div>
              </div>
            {/* Info Overlay */}
            {/* {this.state.infoOverlay &&
              <InfoOverlay overlayToggle={this.toggleInfoOverlay.bind(this)} /> } */}
          </div>
          {/* dead simple text chat */}
          <iframe title="text chat" id="chat" src='https://deadsimplechat.com/34MeFCATo'></iframe>        
        </>}
    </div>
  )  
}
