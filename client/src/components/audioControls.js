import React, { Component } from 'react';

export class AudioControls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      volumeNotches: 12,
      volumeDragging: false,
      hoverNotch: null
    }
  }
  render() {
    return (
      <>              
        <button id="mute-button" onClick={this.props.muteAudio}>
          {this.props.isMuted
            ? <MuteIconOff />
            : <MuteIconOn />
          }          
          </button>
        <div id="volume-wrapper">
        </div>
      </> 
    )
  }
  componentDidMount() { 
    this.createNotches();
  }
  createNotches(){
    let volumeWrapper = document.getElementById('volume-wrapper');
    volumeWrapper.addEventListener('mousemove', this.detectVolumeHover);
    volumeWrapper.addEventListener('mouseenter', this.detectVolumeHover);
    volumeWrapper.addEventListener('mousedown', this.detectVolumeClick);
    volumeWrapper.addEventListener('mouseleave', this.exitVolumeWrapper);
    let notches = this.state.volumeNotches;
    for(let i = 0; i < notches; i++){
      let newDiv = document.createElement('div');
      newDiv.classList.add('VolumeNotch');
      newDiv.classList.add('VolumeActive');     
      newDiv.id = notches - i;
      newDiv.style.height = 100/notches + "%";
      volumeWrapper.appendChild(newDiv);
    }
  }
  exitVolumeWrapper(){
    Array.from(document.getElementsByClassName('VolumeHover')).forEach(function (element) {
      element.classList.remove('VolumeHover');
    });    
  }
  detectVolumeHover = (e) => {
    let volumeWrapper = e.target;
    let mousePos = Math.trunc((e.clientY - volumeWrapper.getBoundingClientRect().top) / volumeWrapper.offsetHeight * this.state.volumeNotches);
    if(this.state.hoverNotch !== mousePos){ 
      this.setState({ hoverNotch: mousePos });
      Array.from(document.getElementsByClassName('VolumeHover')).forEach(function (element) {
        element.classList.remove('VolumeHover');
      });      
      e.target.childNodes[mousePos].classList.add('VolumeHover');
      if(e.buttons === 1) {
        this.detectVolumeClick(e);
      }
    }
  }
  // can this be streamlined?? possibly get a normal value from mouse pos then do other maths to it
  detectVolumeClick = (e) => {
    let volumeWrapper = e.target;
    let mousePos = Math.trunc((e.clientY - volumeWrapper.getBoundingClientRect().top) / volumeWrapper.offsetHeight * this.state.volumeNotches);
    Array.from(document.getElementsByClassName('VolumeNotch')).forEach(function (element, index) {
      if(index+1 > mousePos){ element.classList.add('VolumeActive') }
      else{ element.classList.remove('VolumeActive') }
    });
    let iconLines = document.getElementsByClassName('MuteLines');
    let lineCutoff = 3 - (mousePos/this.state.volumeNotches*3);
    for (let j = 0; j < 3; j ++){
      if(j<lineCutoff){
        iconLines[j].classList.add('active');
      } else {
        iconLines[j].classList.remove('active');
      }
    }
    let newVolume = 1 - mousePos / this.state.volumeNotches;
    this.props.changeVolume(newVolume);
  }
}

export default AudioControls

function MuteIconOn(props){
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      transform="">
        {/* Speaker */}
        <path id="mute-speaker"
              d=" M 10,42
              A 2,2 90 0 1 12,40
              L 15,40 30,15 35,15
              Q 38,50 35,85 
              L 30,85 15,60 12,60
              A 2,2 90 0 1 10,58
              Z              
        " />
        {/* Volume Lines */}
        <path fill="none" stroke="black" strokeLinecap="round" strokeWidth="6" className="MuteLines active"
              d=" M 45,35
                  Q 55,50 45,65" />
        <path fill="none" stroke="black" strokeLinecap="round" strokeWidth="6" className="MuteLines active"
              d=" M 55,22.5
                  Q 77.33,50 55,77.5" />
        <path fill="none" stroke="black" strokeLinecap="round" strokeWidth="6" className="MuteLines active"
              d=" M 65,10
                  Q 101.66,50 65,90" />
    </svg>
  )
}
function MuteIconOff(props){
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      opacity="50%">
        {/* Speaker */}
        <path id="mute-speaker"
              d=" M 10,42
              A 2,2 90 0 1 12,40
              L 15,40 30,15 35,15
              Q 38,50 35,85 
              L 30,85 15,60 12,60
              A 2,2 90 0 1 10,58
              Z              
        " />
        <path fill="none" stroke="black" strokeWidth="6"
              d=" M 50, 35
                  L 80, 65
              " />
        <path fill="none" stroke="black" strokeWidth="6" 
              d=" M 80, 35
                  L 50, 65
              " />
    </svg>
  )
}
