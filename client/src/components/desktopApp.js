import React, { Component } from 'react';
import AudioControls from './audioControls';
import EmojiTri from './emojiTri';
import IntroModal from './introModal';
import Marquee from './marquee';

export class DesktopApp extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div id="desktop-wrapper">
        {this.props.modalIsOpen
          ? <IntroModal mobile={this.props.mobile} toggleModal={this.props.toggleModal} />
          : <>
            {/* Top Banner */}
            <Marquee />  
            {/* Background Visuals */}          
            <div id="bg-vis-wrapper">              
              {/* <BGVis /> */}
            </div>
            {/* Response Overlay */}
            <div id="response-wrapper">              
              {/* <Responses /> */}
            </div> 
            {/* Menu Overlay */}
            <div id="settings-menu-wrapper">
              {/* <SettingsMenu /> */}
            </div>
            {/* Prompt Overlay */}
            <div id="current-prompt">
              {this.props.currentPrompt}
            </div>           
            {/* Emoji Triangle */}
            <EmojiTri 
              height={this.props.height}
              artistPresets={this.props.artistPresets}
            />            
            {/* Input Section */}
            <div id="input-wrapper">              
              {this.props.drawingInput 
                  ? <></>/* Drawing Input */
                  : <></>/* Text Input */
                }
            </div>            
            {/* Audio Settings */}
            <AudioControls />      
            {/* dead simple text chat */}
            <iframe title="text chat" id="chat" src='https://deadsimplechat.com/34MeFCATo'></iframe>
          </>}
      </div>
    )
  }
}

export default DesktopApp
