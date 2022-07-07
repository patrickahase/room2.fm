import React, { Component } from 'react';
import AudioControls from './audioControls';
import DrawingCanvas from './drawingCanvas';
import IntroModal from './introModal';
import DrawingTools from './drawingTools';
import SettingsMenu from './settingsMenu';
import GLVis from './glVis';
import ResponseDisplay from './responseDisplay';
import { InfoOverlay } from './infoOverlay';
import ColourPicker from './colourPicker';
import AudioTrackPlayer from './audioTrackPlayer';

export class DesktopApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
      isMuted: false,

      //video stream player
      streamPlayer: null,

      // emoji triangle values
      emojiX: 0.5,
      emojiY: 0.5,

      timer: 0.,

      infoOverlay: true

    }
    this.setStreamPlayer = this.setStreamPlayer.bind(this);
    this.timerInterval = null;
  }
  render() {
    return (
      <div id="desktop-wrapper">
        {this.props.modalIsOpen
          ? <IntroModal 
              mobile={this.props.mobile}
              toggleModal={this.props.toggleModal} />
          : <>      
            <div id="bg-vis-wrapper">              
              <GLVis
                timer={this.state.timer}
                height={this.props.height}
                width={this.props.width} />          
            </div>
            {/* Response Overlay */}
            <ResponseDisplay 
              getNextResponse={this.props.getNextResponse}
              responsesToDisplay={this.props.responsesToDisplay}
              height={this.props.height}
              width={this.props.width} />
            <AudioTrackPlayer
              startTimer={this.startTimer.bind(this)}
              pauseTimer={this.pauseTimer.bind(this)}
              restartTimer={this.restartTimer.bind(this)}
               />
            {/* Menu Overlay */}
            {/* <SettingsMenu
              toggleFocus={this.props.toggleFocus} 
              overlayToggle={this.toggleInfoOverlay.bind(this)} /> */}
            {/* Info Overlay */}
            {/* {this.state.infoOverlay &&
              <InfoOverlay overlayToggle={this.toggleInfoOverlay.bind(this)} /> } */}
            {/* Prompt and Input Selection Overlay */}
            {/* <div id="current-prompt-wrapper">
              <div id="prompt-end-timer-wrapper">
                <div id="prompt-end-timer" />
                <div id="prompt-end-timer-overlay" />
              </div>           
              <div id="current-prompt">
                {this.props.currentPrompt}
              </div>           
              <div id="input-select-wrapper">
                <span>I would like to&nbsp;
                <button id="draw-input-select" className="InputSelectButton" onClick={this.props.setDrawInput}>draw</button>&nbsp;/&nbsp;
                <button id="text-input-select" className="InputSelectButton ActiveInputButton" onClick={this.props.setWriteInput}>write</button>
                &nbsp;a response</span>
              </div>           
            </div>  */}                    
            {/* Input Selection */}
            
            {/* Input Section */}
            {/* <div id="input-wrapper"> */}              
              <>
                {/* <textarea id="text-input" name="text based prompt response" placeholder="Please type your response here..." /> */}
              </>
              <>{/* Drawing Input */}
                {/* <DrawingCanvas 
                  brushColour={this.props.colours.colour1}
                  brushSize={this.props.brushSize}
                  setCanvas={this.props.setCanvas}
                  setIsDrawing={this.props.setIsDrawing}
                  /> */}
              </>
                
            {/* </div> */}
            {/* <DrawingTools
                undoDrawing={this.props.undoDrawing}
                redoDrawing={this.props.redoDrawing}
                toggleEraser={this.props.toggleEraser}
                colours={this.props.colours}
                changeColourOrder={this.props.changeColourOrder}
                changeColours={this.props.changeColours}
                changeBrushSize={this.props.changeBrushSize} />  */} 
            {/* Right UI Panel */}
            <div id="right-ui-wrapper">
            <div id="drawing-tools-wrapper">                
                {/* <ColourPicker 
                  colours={this.props.colours}
                  changeColourOrder={this.props.changeColourOrder}
                  changeColours={this.props.changeColours}
                /> */}
                
            </div>
                          
              {/* <button id="response-submit-button" onClick={this.props.submitResponse}>
                <span>SUBMIT RESPONSE</span>                
              </button> */}
              {/* Audio Settings */}
              {/* <AudioControls
                muteAudio={this.muteAudio.bind(this)}
                isMuted={this.state.isMuted}
                changeVolume={this.changeVolume.bind(this)}
                />
              <AudioStreamPlayer
                setStreamPlayer={this.setStreamPlayer}
                setGainControl={this.setGainControl} />   */}           
            </div>
          </>}
      </div>
    )
  }
  componentDidMount() {  
  }
  startTimer() {
    this.timerInterval = setInterval(() => {
      this.setState(prevState =>({
        timer: prevState.timer + 0.01
      }))
    }, 50)     
  }
  pauseTimer() {
    clearInterval(this.timerInterval);    
  }
  restartTimer() {
    this.setState({ timer: 0 });    
  }
  setStreamPlayer(streamPlayer){
    this.setState({ streamPlayer: streamPlayer })
  }
  toggleInfoOverlay(){
    this.setState(prevState => ({infoOverlay: !prevState.infoOverlay}))
  }
  
}

export default DesktopApp
