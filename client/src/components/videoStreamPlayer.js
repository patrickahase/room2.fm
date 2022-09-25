import React from 'react';
import VideoPlayer from './videoPlayer';

const videoJsOptions = {
  autoplay: true,
  controls: false,
  sources: [{
    src: 'https://room2service-aueas.streaming.media.azure.net/10ce3025-a425-4d1c-85fb-23324e70de9a/53cd404a-4808-4cd3-bd1b-d749e8e633a7.ism/manifest(format=m3u8-cmaf)',
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

