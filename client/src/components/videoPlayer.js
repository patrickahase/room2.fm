import React, { useState } from 'react';
import videojs from 'video.js'
import 'video.js/dist/video-js.css';
import Sketch from 'react-p5';
import 'p5/lib/addons/p5.sound';

export default function VideoPlayer(props){
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const [fft, setFft] = useState(null);
  const {options, onReady} = props;

  let audioContext, audioSource;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(0, 0).parent(canvasParentRef);
    audioContext = p5.getAudioContext();
    props.setAudioCtx(audioContext);
    audioSource = audioContext.createMediaElementSource(document.getElementById("video-stream-player"));
    let newGain = audioContext.createGain();
    props.setAudioGain(newGain);
    audioSource.connect(newGain);
    newGain.connect(audioContext.destination);
    let newFft = new p5.constructor.FFT(0.989);
    newFft.setInput(audioSource);
    setFft(newFft);
    const videoElement = videoRef.current;
    const player = playerRef.current = videojs(videoElement, options, () => {
      onReady && onReady(player);
    });
  }
  
  const draw = p5 => {
    if(props.analysing === true){
      let spectrum = fft.analyze(256);
      let mid = remapEnergy(fft.getEnergy(50,220),150,175);
      let treble = remapEnergy(fft.getEnergy(220,14000),14,26);
      document.documentElement.style.setProperty("--font-var-two", mid);
      document.documentElement.style.setProperty("--font-var-three", treble);
    }    
  }

  function remapEnergy(energyInput, floor, ceiling){
    // this expects the 0 - 255 range of the getEnergy
    // return floor + (ceiling - floor) * energyInput/255;
    return (energyInput - floor)/(ceiling - floor) * 100;
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
    return (
      <div id="video-stream-wrapper">
        <div data-vjs-player>
          <video ref={videoRef} className="video-js vjs-fill" id="video-stream-player"></video>
          <Sketch setup={setup} draw={draw} />
        </div>
      </div>
    )
}