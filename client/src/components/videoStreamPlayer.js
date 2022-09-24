import React from 'react';
import VideoPlayer from './videoPlayer';

const videoJsOptions = {
  autoplay: true,
  controls: false,
  sources: [{
    src: 'https://room2service-aueas.streaming.media.azure.net/fe46be4f-68fc-4f7e-b3c7-8d6d3c776504/output-20220924-144838-manifest.ism/manifest(format=m3u8-cmaf)',
    type: 'application/x-mpegURL'
  }],
  fill: true,
  pictureInPictureToggle: false
}

export default function VideoStreamPlayer(props){
  const playerRef = React.useRef(null);
  const handlePlayerReady = (player) => {
    playerRef.current = player;
  };
  return (
    <>
      <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} 
        analysing={props.analysing}
        setAudioGain={props.setAudioGain}
        setAudioCtx={props.setAudioCtx} />
    </>
  )
}

