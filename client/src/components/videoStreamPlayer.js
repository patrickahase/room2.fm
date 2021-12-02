import React, { Component } from 'react';
import videojs from "video.js";
import VideoPlayer from './videoPlayer';

const videoJsOptions = {
  autoplay: true,
  controls: false,
  sources: [{
    src: '//vjs.zencdn.net/v/oceans.mp4',
    type: 'video/mp4'
  }],
  fill: true,
  pictureInPictureToggle: false
}

export class VideoStreamPlayer extends Component {
  render() {
    return (
      <>
        <VideoPlayer { ...videoJsOptions } />
        {/* <button onClick={this.changeWidth}>sss</button> */}
      </>
    )
  }
  componentDidMount(){
    // set stream player ref
    this.props.setStreamPlayer(videojs.getPlayer('video-stream-player'));
  }
}

export default VideoStreamPlayer
