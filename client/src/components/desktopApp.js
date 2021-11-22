import React, { Component } from 'react';
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
            {/* <BGVis /> */}
            {/* Response Overlay */}
            {/* <Responses /> */}
            {/* Prompt Overlay */}
            <div id="current-prompt"> {this.props.currentPrompt} </div>
            {/* dead simple text chat */}
            <iframe title="text chat" id="chat" src='https://deadsimplechat.com/34MeFCATo'></iframe>
          </>}
      </div>
    )
  }
}

export default DesktopApp
