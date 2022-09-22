import React, { useEffect } from 'react';
import videojs from 'video.js'
import 'video.js/dist/video-js.css';
import Sketch from 'react-p5';
import 'p5/lib/addons/p5.sound';

export default function VideoPlayer(props){

  let player, videoNode, fft, audioContext, audioSource;


  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(0, 0).parent(canvasParentRef);
    audioContext = p5.getAudioContext();
    props.setAudioCtx(audioContext);
    audioSource = audioContext.createMediaElementSource(document.getElementById("video-stream-player"));
    audioSource.connect(audioContext.destination);
    fft = new p5.constructor.FFT();
    fft.setInput(audioSource);
    /* let player = videojs(videoNode, props, function onPlayerReady() {
    }); */
  }
  
  const draw = p5 => {
    if(props.analysing === true){
      let spectrum = fft.analyze();
      let mid = fft.getEnergy("mid");
      console.log(mid);
      document.documentElement.style.setProperty("--font-var-one", mid);
    }    
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
    return (
      <div id="video-stream-wrapper">
        <div data-vjs-player>
          <video ref={ node => videoNode = node } className="video-js vjs-fill" id="video-stream-player"></video>
          {/* <video id="video-stream-player2"></video> */}
          <Sketch setup={setup} draw={draw} />
        </div>
      </div>
    )
}