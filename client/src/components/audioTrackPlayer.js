import React, { useEffect, useState } from 'react';

/* set amount of volume notches on volume bar */
var notchNumber = 12;

export default function AudioTrackPlayer(props) {

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [responded, setResponded] = useState(false);
  const [audioSource, setAudioSource] = useState(null);

  useEffect(() => {
    //set reference to audio
    let audioSourceRef = document.getElementById("audio-source");
    setAudioSource(audioSourceRef);
    props.setAudioSourceRef(audioSourceRef);
    //set reference to timeline
    let timeline = document.getElementById("timeline");
    //add waiting animation
    audioSourceRef.addEventListener('waiting', () => {
      timeline.className = "";
      timeline.className = "timelineloading";
    });
    audioSourceRef.addEventListener('playing', () => {
      timeline.className = "";
      timeline.className = "timelineloaded";
    });
    //add animation when playing
    audioSourceRef.addEventListener('timeupdate', () => {
      timeline.firstChild.style.width = (100 * audioSourceRef.currentTime/audioSourceRef.duration) + "%";
    });
    //add timeline click
    timeline.addEventListener("click", (e) => {
      //get percentage of where timeline clicked
      let clickPercent = (e.clientX - timeline.getBoundingClientRect().left) / timeline.offsetWidth;
      // set playhead
      timeline.firstChild.style.width = (100 * clickPercent) + "%";
      // set new track time
      audioSourceRef.currentTime = audioSourceRef.duration * clickPercent;
    })
  }, []);

  return (
    <div id="audio-player-wrapper" className="Collider">
      {/* audio source */}
      <audio src={require("../content/sade.mp3").default} id="audio-source" />
      {/* play button */}
      <button id="play-pause-button" className="AudioPlayerButton" onClick={playPauseAudio}>
        {isPlaying
            ? <PauseIcon />
            : <PlayIcon /> }
      </button>
      {/* reset button */}
      <button className="AudioPlayerButton" onClick={() => {audioSource.currentTime = 0; props.restartTimer()}}>
        <RewindIcon />
      </button>
      {/*Audio Timeline*/}
      <div id="timeline" className="timelineloaded">
        <div id="playhead" />
      </div>
      {/* volume section */}
      <div id="volume-section-wrapper">
        {/* mute button */}
        <button className="AudioPlayerButton" id="mute-button" onClick={muteAudio}>
          {isMuted
            ? <MuteIconOff />
            : <MuteIconOn /> }                    
        </button>
        {/* volume slider */}
        <div id="volume-wrapper">
            {VolumeNotches}
        </div>
      </div>               
    </div>
  )
  function playPauseAudio(){
    if(audioSource.paused){
      audioSource.play();
      setIsPlaying(true);
      props.startTimer();
      if(!responded){
        props.setAskResponse(true);
        setResponded(true);
      }
    } else {
      audioSource.pause();
      setIsPlaying(false);
      props.pauseTimer();
    }
  }  
  function muteAudio(){
    audioSource.muted = !audioSource.muted;
    setIsMuted(!isMuted);
  }
}

let volNotchGen = Array(notchNumber).fill('');

/* can this be changed to button? */

const VolumeNotches = volNotchGen.map((nothing, index) =>
  <div className='VolumeNotch VolumeActive' id={index}
       key={index+nothing} 
       onMouseDown={clickVolumeNotch}
       onMouseEnter={(e) => {if(isMouseDown){clickVolumeNotch(e)}}}
       style={{height: 100/volNotchGen.length + "%"}} />
)

/* keep track of mouse down for volume drag event */
var isMouseDown = false;
document.addEventListener("mouseup", () => {isMouseDown = false});

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
  document.getElementById("audio-source").volume = newVolume;
}

function PlayIcon(){
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 110 110"
      xmlns="http://www.w3.org/2000/svg"
      transform="">
        <g transform="scale(.8) translate(15)" style={{transformOrigin: "center"}} className="AudioPlayerIcon">
          <polygon points="10,10 73,55 10,100"
                   strokeLinejoin="round"
                   strokeWidth="20"
          />
        </g>        
    </svg>
  )
}
function PauseIcon(){
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 110 110"
      xmlns="http://www.w3.org/2000/svg"
      transform="">
        <g transform="scale(.8) translate(15)" style={{transformOrigin: "center"}} className="AudioPlayerIcon">
          <path strokeLinecap="round" strokeWidth="30"
              d=" M 67.5,15
                  L 67.5,95" />
          <path strokeLinecap="round" strokeWidth="30"
              d=" M 15,15
                  L 15,95" />
        </g>        
    </svg>
  )
}
function RewindIcon(){
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 110 110"
      xmlns="http://www.w3.org/2000/svg"
      transform="">
        <g transform="scale(.8)" style={{transformOrigin: "center"}} className="AudioPlayerIcon">
          <polygon points="10,10 73,55 10,100"
                   strokeLinejoin="round"
                   strokeWidth="20"
                   transform="translate(-25) rotate(180, 55, 55)"
          />
          <path fill="none" strokeLinecap="round" strokeWidth="20"
              d=" M 100,10
                  L 100,100" />
        </g>
               
    </svg>
  )
}
function MuteIconOn(){
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      transform=""
      className="AudioPlayerIcon">
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
        <path fill="none" strokeLinecap="round" strokeWidth="6" className="MuteLines active"
              d=" M 45,35
                  Q 55,50 45,65" />
        <path fill="none" strokeLinecap="round" strokeWidth="6" className="MuteLines active"
              d=" M 55,22.5
                  Q 77.33,50 55,77.5" />
        <path fill="none" strokeLinecap="round" strokeWidth="6" className="MuteLines active"
              d=" M 65,10
                  Q 101.66,50 65,90" />
    </svg>
  )
}
function MuteIconOff(){
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      opacity="50%"
      className="AudioPlayerIcon">
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
        <path fill="none" strokeWidth="6" 
              d=" M 50, 35
                  L 80, 65
              " />
        <path fill="none" strokeWidth="6"
              d=" M 80, 35
                  L 50, 65
              " />
    </svg>
  )
}