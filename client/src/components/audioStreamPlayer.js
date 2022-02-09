import React, { Component } from 'react'

export class AudioStreamPlayer extends Component {
  render() {
    return (
      <div id="audio-stream-wrapper">
        <audio 
          id="audio-stream"
          src="https://room2interface.xyz/stream"
          type="audio/mpg"
          crossOrigin="anonymous" />        
      </div>
    )
  }
  componentDidMount() {    
    this.audioInit();
   }
  audioInit(){
    this.audioStream = document.getElementById('audio-stream');
    this.props.setStreamPlayer(this.audioStream);
    //set up gain
    var AudioContext = window.AudioContext // Default
      || window.webkitAudioContext // Safari and old versions of Chrome
      || false;
    if (AudioContext) {
        var audioContext = new AudioContext();
        const gainNode = audioContext.createGain();
        this.props.setGainControl(gainNode);
        const source = audioContext.createMediaElementSource(this.audioStream);
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);
        this.audioStream.load();
        this.audioStream.play();
    } else {
        // Web Audio API is not supported
        alert("Sorry, but the Web Audio API is not supported by your browser. Please, consider upgrading to the latest version or downloading Google Chrome or Mozilla Firefox");
    } 
    
  }
}

export default AudioStreamPlayer
