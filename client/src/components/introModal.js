import React, { Component } from 'react';

import { acknowledgementOfCountryText, introText, instructionsText, /* warningText */ } from '../content/modalText';

export class IntroModal extends Component {

  constructor(props) {
    super(props)    
    this.state = {
      modalPages: 4,
      currentPage: 1,
    }
    this.continueClick = this.continueClick.bind(this);
  }

  render() {
    return (
      <div id="modal-wrapper">

        {modalContentSelector(this.state.currentPage)}

        {this.state.currentPage !== 0 &&
          <button id="modal-continue-button" onClick={this.continueClick}> Continue </button>
        }

      </div>
    )
  }

  continueClick(){
    // if still pages left to view - else close modal
    if(this.state.currentPage < this.state.modalPages-1){
      this.setState(prevState => ({
        currentPage: prevState.currentPage + 1
      }))
    } else {
      this.props.toggleModal();
    }    
  }
}
export default IntroModal

/* Select from modal content based on currentPage state */
function modalContentSelector(currentPage, string){
  switch(currentPage){
    // 0 - closed
    case 0:
      return <Closed />;
    // 1 - Acknowledgement of Country
    case 1:
      return <Acknowledgement />;
    // 2 - Introduction Text
    case 2:
      return <Intro />;
    // 3 - Instruction Text
    case 3:
      return <Instructions />;
    default:
      return <Closed />;
  }
}

//0
function Closed(props) {
  return (
    <div id="logo-wrapper">
      <div id="text-logo">
        <pre id="pre-logo-wrapper">
          <div id="logo-line-1">__________________________________________________________________<u className="text-gradient-1">/\\\\\\\\\</u>_____        <br/></div>
          <div id="logo-line-2">&nbsp;________________________________________________________________<u className="text-gradient-2">/\\\///////\\\</u>___       <br/></div>
          <div id="logo-line-3">&nbsp;&nbsp;_______________________________________________________________<u className="text-gradient-3">\///</u>______<u className="text-gradient-3">\//\\\</u>__      <br/></div>
          <div id="logo-line-4">&nbsp;&nbsp;&nbsp;__<u className="text-gradient-4">/\\/\\\\\\\</u>______<u className="text-gradient-4">/\\\\\</u>________<u className="text-gradient-4">/\\\\\</u>_______<u className="text-gradient-4">/\\\\\</u>__<u className="text-gradient-4">/\\\\\</u>_____________<u className="text-gradient-4">/\\\/</u>___     <br/></div>
          <div id="logo-line-5">&nbsp;&nbsp;&nbsp;&nbsp;_<u className="text-gradient-5">\/\\\/////\\\</u>___<u className="text-gradient-5">/\\\///\\\</u>____<u className="text-gradient-5">/\\\///\\\</u>___<u className="text-gradient-5">/\\\///\\\\\///\\\</u>________<u className="text-gradient-5">/\\\//</u>_____    <br/></div>
          <div id="logo-line-6">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_<u className="text-gradient-6">\/\\\</u>___<u className="text-gradient-6">\///</u>___<u className="text-gradient-6">/\\\</u>__<u className="text-gradient-6">\//\\\</u>__<u className="text-gradient-6">/\\\</u>__<u className="text-gradient-6">\//\\\</u>_<u className="text-gradient-6">\/\\\</u>_<u className="text-gradient-6">\//\\\</u>__<u className="text-gradient-6">\/\\\</u>_____<u className="text-gradient-6">/\\\//</u>________   <br/></div>
          <div id="logo-line-7">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_<u className="text-gradient-7">\/\\\</u>_________<u className="text-gradient-7">\//\\\</u>__<u className="text-gradient-7">/\\\</u>__<u className="text-gradient-7">\//\\\</u>__<u className="text-gradient-7">/\\\</u>__<u className="text-gradient-7">\/\\\</u>__<u className="text-gradient-7">\/\\\</u>__<u className="text-gradient-7">\/\\\</u>___<u className="text-gradient-7">/\\\/</u>___________  <br/></div>
          <div id="logo-line-8">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_<u className="text-gradient-8">\/\\\</u>__________<u className="text-gradient-8">\///\\\\\/</u>____<u className="text-gradient-8">\///\\\\\/</u>___<u className="text-gradient-8">\/\\\</u>__<u className="text-gradient-8">\/\\\</u>__<u className="text-gradient-8">\/\\\</u>__<u className="text-gradient-8">/\\\\\\\\\\\\\\\</u>_ <br/></div>
          <div id="logo-line-9">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_<u className="text-gradient-9">\///</u>_____________<u className="text-gradient-9">\/////</u>________<u className="text-gradient-9">\/////</u>_____<u className="text-gradient-9">\///</u>___<u className="text-gradient-9">\///</u>___<u className="text-gradient-9">\///</u>__<u className="text-gradient-9">\///////////////</u>__<br/></div>
        </pre>            
      </div>
    </div>
  )
}

//1
function Acknowledgement(props) {
  return (
    <div id="modal-text-wrapper" className="modal-text-wrapper-aoc">
      <div id="modal-text-vert-align">
        <div id="modal-text" className="modal-text-aoc">
          {acknowledgementOfCountryText}
        </div>
      </div>
    </div>
  )
}

//2
function Intro(props) {
  return (<>
    <div id="modal-title-wrapper">
      <div id="modal-title">
        Welcome to room2.fm live!
      </div>
    </div>
    <div id="modal-text-wrapper">
      <div id="modal-text-vert-align">
        <div id="modal-text">
          {introText}
        </div>
      </div>
    </div>        
    <div id="modal-button-wrapper"></div>
  </>
  )
}

//3
function Instructions(props) {
  return (<>
    <div id="modal-title-wrapper">
      <div id="modal-title">
        Welcome to room2.fm live!
      </div>
    </div>
    <div id="modal-text-wrapper">
      <div id="modal-text-vert-align">
        <div id="modal-text">
          {instructionsText}
        </div>
      </div>
    </div>        
    <div id="modal-button-wrapper"></div>
  </>
  )
}
//Warning not currently assigned
/* function Warning(props) {
  return (
    <div> aoc </div>
  )
} */