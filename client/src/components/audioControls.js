import React, { Component } from 'react';

export class AudioControls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      volumeNotches: 8,
    }
  }
  render() {
    return (
      <div id="audio-control-wrapper">              
        <button id="mute-button" />
        <div id="volume-wrapper">
        </div>
      </div> 
    )
  }
  componentDidMount() { 
    this.createNotches();
  }
  createNotches(){
    let volumeWrapper = document.getElementById('volume-wrapper');
    let notches = this.state.volumeNotches;
    for(let i = 0; i < notches; i++){
      let newDiv = document.createElement('div');
      newDiv.classList.add('volume-indicator');
      newDiv.id = notches - i;
      newDiv.style.height = 100/notches + "%";
      newDiv.addEventListener('click', this.setVolume);
      volumeWrapper.appendChild(newDiv);
    }
  }
  setVolume = (e) => {
    let notches = e.target.parentNode.childNodes;
    for(let k = 0; k < e.target.id; k++){
      notches[notches.length-k-1].classList.add('active');
    }
    for(let m = e.target.id; m < notches.length; m++){
      notches[notches.length-m-1].classList.remove('active');
    }

  }
}

export default AudioControls
