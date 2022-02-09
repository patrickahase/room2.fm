import React, { Component } from 'react';
import AudioControls from './audioControls';
import DrawingCanvas from './drawingCanvas';
import EmojiTri from './emojiTri';
import IntroModal from './introModal';
import Marquee from './marquee';
import DrawingTools from './drawingTools';
import SettingsMenu from './settingsMenu';
import GLVis from './glVis';
import ResponseDisplay from './responseDisplay';
import AudioStreamPlayer from './audioStreamPlayer';

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

    }
    this.setStreamPlayer = this.setStreamPlayer.bind(this);
    this.setGainControl = this.setGainControl.bind(this);
  }
  render() {
    return (
      <div id="desktop-wrapper">
        {this.props.modalIsOpen
          ? <IntroModal 
              mobile={this.props.mobile}
              toggleModal={this.props.toggleModal} />
          : <>
            {/* Top Banner */}
            <Marquee
              currentArtist={this.props.currentArtist} />  
            {/* Background Visuals */}          
            <div id="bg-vis-wrapper">              
              {/* <BGVis /> */}
              <GLVis
                timer={this.state.timer}
                height={this.props.height}
                width={this.props.width} />
              {/* <VideoStreamPlayer
                setStreamPlayer={this.setStreamPlayer} />  */}               
            </div>
            {/* Response Overlay */}
            <ResponseDisplay 
              getNextResponse={this.props.getNextResponse}
              responsesToDisplay={this.props.responsesToDisplay}
              height={this.props.height}
              width={this.props.width} /> 
            {/* Menu Overlay */}
            <SettingsMenu />
            {/* Prompt and Input Selection Overlay */}
            <div id="current-prompt-wrapper">
              <div id="prompt-end-timer-wrapper">
                <div id="prompt-end-timer" />
                <div id="prompt-end-timer-overlay" />
              </div>           
              <div id="current-prompt">
                {this.props.currentPrompt}
              </div>           
              <div id="input-select-wrapper">
                <span>I would like to </span>
                <button id="draw-input-select-button" onClick={this.props.setDrawInput}>draw</button>
                <button id="write-input-select-button" onClick={this.props.setWriteInput}>write</button>
                <span> a response</span>
              </div>           
            </div>           
            {/* Emoji Triangle */}
            <EmojiTri 
              height={this.props.height}
              artistPresets={this.props.artistPresets}
              emoji1={this.props.emoji1}
              emoji2={this.props.emoji2}
              emoji3={this.props.emoji3}
            />            
            {/* Input Selection */}
            
            {/* Input Section */}
            <div id="input-wrapper">              
              {this.props.drawingResponse
                ? <>{/* Drawing Input */}
                  <DrawingCanvas 
                    brushColour={this.props.colours.colour1}
                    brushSize={this.props.brushSize}
                    setCanvas={this.props.setCanvas}
                    setIsDrawing={this.props.setIsDrawing}
                    />
                </>
                : <>
                  <textarea id="text-input" name="text based prompt response" placeholder="Please type your response here..." />
                </>/* Text Input */
                }
            </div>
            {/* Right UI Panel */}
            <div id="right-ui-wrapper">
              <DrawingTools
                undoDrawing={this.props.undoDrawing}
                redoDrawing={this.props.redoDrawing}
                toggleEraser={this.props.toggleEraser}
                colours={this.props.colours}
                changeColourOrder={this.props.changeColourOrder}
                changeBrushSize={this.props.changeBrushSize} />              
              <button id="response-submit-button" onClick={this.props.submitResponse}>
                <span>SUBMIT RESPONSE</span>                
              </button>
              {/* Audio Settings */}
              <AudioControls
                muteAudio={this.muteAudio.bind(this)}
                isMuted={this.state.isMuted}
                changeVolume={this.changeVolume.bind(this)}
                />
              <AudioStreamPlayer
                setStreamPlayer={this.setStreamPlayer}
                setGainControl={this.setGainControl} />             
            </div> 
            {/* dead simple text chat */}
            <iframe title="text chat" id="chat" src='https://deadsimplechat.com/34MeFCATo'></iframe>
          </>}
      </div>
    )
  }
  componentDidMount() {  
    // update css style sheet
    this.startTimer();
    document.addEventListener('keydown', this.presetKeyDown.bind(this));
  }
  startTimer() {
    this.myInterval = setInterval(() => {
      this.setState(prevState =>({
        timer: prevState.timer + 0.01
      }))
    }, 50)     
  }
  presetKeyDown(e){
    if (e.keyCode === 192){
      this.startPromptCountdown();
    } 
  }
  startPromptCountdown(){
    let promptTimer = document.getElementById("prompt-end-timer-wrapper").children[0];
    let promptTimerOverlay = document.getElementById("prompt-end-timer-wrapper").children[1];
    promptTimerOverlay.style.transition = "60s linear";
    promptTimerOverlay.style.width = "100%";
    let countdown = 60;
    promptTimer.innerHTML = "this prompt will change in " + countdown + " seconds...";
    let x = setInterval(function() {    
      countdown -= 1;
      promptTimer.innerHTML = "this prompt will change in " + countdown + " seconds...";
      if (countdown < 1) {
        clearInterval(x);
        promptTimerOverlay.style.transition = "0s linear";
        promptTimerOverlay.style.width = "0%";
        promptTimer.innerHTML = "";        
      }
    }, 1000);
  }
  setStreamPlayer(streamPlayer){
    this.setState({ streamPlayer: streamPlayer })
  }
  setGainControl(gainControl){
    this.setState({ gainControl: gainControl })
  }
  muteAudio(){
    let streamPlayer = this.state.streamPlayer;
    if(this.state.isMuted){
      this.setState({ isMuted: false });
      streamPlayer.muted = false;
    } else {
      this.setState({ isMuted: true });
      streamPlayer.muted = true;
    }    
  }
  changeVolume(newVolume){
    /* this.state.streamPlayer.volume(newVolume); */
    this.state.gainControl.gain.setValueAtTime(newVolume, this.state.streamPlayer.currentTime);
  }
  
}

export default DesktopApp
