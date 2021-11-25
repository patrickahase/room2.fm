import React, { Component } from 'react';
import AudioControls from './audioControls';
import ColourPicker from './colourPicker';
import DrawingCanvas from './drawingCanvas';
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
                ? <>{/* Drawing Input */}
                  <DrawingCanvas 
                    brushColour={"blue"}
                    brushSize={10}
                    />
                </>
                : <></>/* Text Input */
                }
            </div>
            {/* Right UI Panel */}
            <div id="right-ui-wrapper">
              {/* Drawing Colour Picker */} 
              <ColourPicker />
              <button id="increase-brush-button">
                B+
              </button>
              <button id="decrease-brush-button">
                B-
              </button>
              <button id="erase-brush-button">
                E
              </button>
              <button id="undo-button">
                &#8604;
              </button>
              <button id="redo-button">
                ↝
              </button>
              <button id="response-submit-button">
                Submit Response
              </button>
              {/* Audio Settings */}
              <AudioControls />              
            </div> 
            {/* dead simple text chat */}
            <iframe title="text chat" id="chat" src='https://deadsimplechat.com/34MeFCATo'></iframe>
          </>}
      </div>
    )
  }
}

export default DesktopApp
