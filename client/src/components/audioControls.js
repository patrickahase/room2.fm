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
      <>              
        <button id="mute-button">
          <MuteIcon />
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
    let notches = this.state.volumeNotches;
    for(let i = 0; i < notches; i++){
      let newDiv = document.createElement('div');
      newDiv.classList.add('volume-indicator');
      /* TAKE OUT */
      if(i > 1 ){
        newDiv.classList.add('active');
      }
      
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

function MuteIcon(props){
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      transform="rotate(-90)">
        {/* Speaker */}
        <path d=" M 10,42
                  A 2,2 90 0 1 12,40
                  L 15,40 30,15 35,15
                  Q 38,50 35,85 
                  L 30,85 15,60 12,60
                  A 2,2 90 0 1 10,58
                  Z              
        " />
        {/* Volume Lines */}
        <path fill="none" stroke="black" strokeLinecap="round" strokeWidth="6"
              d=" M 45,35
                  Q 55,50 45,65" />
        <path fill="none" stroke="black" strokeLinecap="round" strokeWidth="6"
              d=" M 55,22.5
                  Q 77.33,50 55,77.5" />
        <path fill="none" stroke="black" strokeLinecap="round" strokeWidth="6"
              d=" M 65,10
                  Q 101.66,50 65,90" />
    </svg>
  )
}
