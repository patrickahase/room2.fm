import React, { Component } from 'react';

export class AudioControls extends Component {
  constructor(props) {
    super(props)
    this.state = {
<<<<<<< HEAD
      volumeNotches: 12
=======
      volumeNotches: 8,
>>>>>>> 64fb46d7d74262fa4ccde706309f23b35e2344e6
    }
  }
  render() {
    return (
      <>              
<<<<<<< HEAD
        <button id="mute-button" onClick={this.props.muteAudio}>
          {this.props.isMuted
            ? <MuteIconOff />
            : <MuteIconOn />
          }          
=======
        <button id="mute-button">
          <MuteIcon />
>>>>>>> 64fb46d7d74262fa4ccde706309f23b35e2344e6
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
<<<<<<< HEAD
      newDiv.classList.add('active');      
=======
      if(i > 1 ){
        newDiv.classList.add('active');
      }
      
>>>>>>> 64fb46d7d74262fa4ccde706309f23b35e2344e6
      newDiv.id = notches - i;
      newDiv.style.height = 100/notches + "%";
      newDiv.addEventListener('click', this.setVolume);
      volumeWrapper.appendChild(newDiv);
    }
  }
  setVolume = (e) => {
    let notches = e.target.parentNode.childNodes;
<<<<<<< HEAD
    let clickID = e.target.id;
    // change the mute icon opacity
    let iconLines = document.getElementsByClassName('MuteLines');
    // this is based on 12 volume notches
    let lineCutoff = Math.floor(clickID/5);
    for (let j = 0; j < 3; j ++){
      if(j<lineCutoff+1){
        iconLines[j].classList.add('active');
      } else {
        iconLines[j].classList.remove('active');
      }
    }
    // change the volume bar opacity
    for(let k = 0; k < clickID; k++){
      notches[notches.length-k-1].classList.add('active');  
=======
    for(let k = 0; k < e.target.id; k++){
      notches[notches.length-k-1].classList.add('active');
>>>>>>> 64fb46d7d74262fa4ccde706309f23b35e2344e6
    }
    for(let m = e.target.id; m < notches.length; m++){
      notches[notches.length-m-1].classList.remove('active');
    }
<<<<<<< HEAD
    //set actual volume
    let newVolume = clickID * 1.0/notches.length;
    this.props.changeVolume(newVolume);
=======

>>>>>>> 64fb46d7d74262fa4ccde706309f23b35e2344e6
  }
}

export default AudioControls

<<<<<<< HEAD
function MuteIconOn(props){
=======
function MuteIcon(props){
>>>>>>> 64fb46d7d74262fa4ccde706309f23b35e2344e6
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
<<<<<<< HEAD
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
=======
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
>>>>>>> 64fb46d7d74262fa4ccde706309f23b35e2344e6
              d=" M 65,10
                  Q 101.66,50 65,90" />
    </svg>
  )
}
<<<<<<< HEAD
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
=======
>>>>>>> 64fb46d7d74262fa4ccde706309f23b35e2344e6
