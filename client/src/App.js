import './App.css';
import React, { Component } from 'react';
import DesktopApp from './components/desktopApp';
import MobileApp from './components/mobileApp';
import {artistPresets} from './content/preloadArrays.js';

export class App extends Component {
  constructor() {
    super()
    this.state = {
      // is on mobile
      mobile: window.matchMedia('all and (any-hover: none)').matches,

      width: window.innerWidth,
      height: window.innerHeight,

      // turn on/off different layers
      modalIsOpen: true,

      // current user settings
      drawingInput: true,

      // current info from server
      currentPrompt: "Is this a prompt?",
    }
    // bind func's to this
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  render() {
    return (
      <div id="global-wrapper">
        {this.state.mobile
        ? <MobileApp
            modalIsOpen={this.state.modalIsOpen}
            toggleModal={this.toggleModal}
            mobile={this.state.mobile}
            currentPrompt={this.state.currentPrompt}
            drawingInput={this.state.drawingInput}
          />
        : <DesktopApp 
            modalIsOpen={this.state.modalIsOpen}
            toggleModal={this.toggleModal}
            mobile={this.state.mobile}
            currentPrompt={this.state.currentPrompt}
            drawingInput={this.state.drawingInput}
            height={this.state.height}
            artistPresets={artistPresets}
          />
        }
      </div>
    )
  }
  componentDidMount() {  
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    // run start up processes based on mob/desk
    if (this.state.mobile){
      //MOBILE
    } else {
      //DESKTOP
    }
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  toggleModal() {
    this.setState(prevState => ({
      modalIsOpen: !prevState.modalIsOpen
    }))
  }
}

export default App

