import React from 'react';
import VideoPlayer from './videoPlayer';

const videoJsOptions = {
  autoplay: true,
  controls: false,
  sources: [{
    src: 'https://room2service-aueas.streaming.media.azure.net/3ee27784-7e53-4009-a692-28ef013bf388/output-20220917-151013-manifest.ism/manifest(format=m3u8-cmaf)',
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

