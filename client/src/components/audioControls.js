import React from 'react';

export default function AudioControls(props){

  const notchNumber = 12;

  let volNotchGen = Array(notchNumber).fill('');

  /* keep track of mouse down for volume drag event */
  var isMouseDown = false;
  document.addEventListener("mouseup", () => {isMouseDown = false});

  const VolumeNotches = volNotchGen.map((nothing, index) =>
    <button className='VolumeNotch VolumeActive' id={index}
        key={index+nothing} 
        onMouseDown={clickVolumeNotch}
        onMouseEnter={(e) => {if(isMouseDown){clickVolumeNotch(e)}}}
        style={{height: 100/volNotchGen.length + "%"}} />
  );

  return (
    <>              
      <button id="mute-button" onClick={props.muteAudio}>
        {props.isMuted
          ? <MuteIconOff />
          : <MuteIconOn />
        }          
        </button>
      <div id="volume-wrapper">
        {VolumeNotches}
      </div>
    </> 
  )

  function clickVolumeNotch(e){
    e.stopPropagation();
    isMouseDown = true;
    let clickedID = parseInt(e.target.id);
    /* set classes for active notch */
    let notches = document.getElementsByClassName("VolumeNotch");
    for (let notch of notches){
      if(notch.id < clickedID){
        notch.classList.remove("VolumeActive");
      } else {
        notch.classList.add("VolumeActive");
      }  
    }
    /* set new volume */
    let newVolume = 1 - (1/notchNumber) * clickedID;
    //document.getElementById("audio-source").volume = newVolume;
  }
}

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
