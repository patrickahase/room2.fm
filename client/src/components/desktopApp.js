import React, { Component } from 'react';
import AudioControls from './audioControls';
import DrawingCanvas from './drawingCanvas';
import EmojiTri from './emojiTri';
import IntroModal from './introModal';
import Marquee from './marquee';
import DrawingTools from './drawingTools';
import SettingsMenu from './settingsMenu';
import VideoStreamPlayer from './videoStreamPlayer';
import ResponseDisplay from './responseDisplay';

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

    }
    this.setStreamPlayer = this.setStreamPlayer.bind(this);
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
              <VideoStreamPlayer
                setStreamPlayer={this.setStreamPlayer} />                
            </div>
            {/* Response Overlay */}
            <ResponseDisplay 
              getNextResponse={this.props.getNextResponse}
              responsesToDisplay={this.props.responsesToDisplay}
              height={this.props.height}
              width={this.props.width} /> 
            {/* Menu Overlay */}
            <SettingsMenu />
            {/* Prompt Overlay */}
            <div id="current-prompt">
              {this.props.currentPrompt}
            </div>           
            {/* Emoji Triangle */}
            <EmojiTri 
              height={this.props.height}
              artistPresets={this.props.artistPresets}
              emoji1={this.props.emoji1}
              emoji2={this.props.emoji2}
              emoji3={this.props.emoji3}
            />            
            {/* Input Section */}
            <div id="input-wrapper">              
              {this.props.promptType === 'draw' 
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
              <button id="response-submit-button" onClick={this.props.submitImageResponse}>
                SUBMIT RESPONSE
              </button>
              {/* Audio Settings */}
              <AudioControls
                muteAudio={this.muteAudio.bind(this)}
                isMuted={this.state.isMuted}
                changeVolume={this.changeVolume.bind(this)}
              />             
            </div> 
            {/* dead simple text chat */}
            <iframe title="text chat" id="chat" src='https://deadsimplechat.com/34MeFCATo'></iframe>
          </>}
      </div>
    )
  }
  componentDidMount() {  
    // update css style sheet
    
  }
  
  setStreamPlayer(streamPlayer){
    this.setState({ streamPlayer: streamPlayer })
  }
  muteAudio(){
    if(this.state.isMuted){
      this.setState({ isMuted: false });
      this.state.streamPlayer.muted(false);
    } else {
      this.setState({ isMuted: true });
      this.state.streamPlayer.muted(true);
    }    
  }
  changeVolume(newVolume){
    this.state.streamPlayer.volume(newVolume);
  }
  
}

export default DesktopApp
