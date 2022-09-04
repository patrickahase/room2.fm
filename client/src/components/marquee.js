import React from 'react';

export default function Marquee (props){
  return (
    <div id="top-banner-wrapper">
      <img id="cd-gif" src={require('../content/media/slowdiscpixel.gif').default} alt="spinning cd gif" />  
      <div id="marquee-wrapper">
        <div style={{width: '100%'}}>
          <div id="marquee-text-scroll">
              <span className="MarqueeEmoji"> ~(˘▾˘~) </span>
              ~ ~ ~ room2.fm is live 
              <span className="MarqueeEmoji">(~˘▾˘)~</span> 
              {"NOW PLAYING: " + props.currentArtist} 
              <span className="MarqueeEmoji"> ~(˘▾˘~) </span>
              ~ ~ ~ room2.fm is live 
              <span className="MarqueeEmoji">(~˘▾˘)~</span> 
              {"NOW PLAYING: " + props.currentArtist} 
              <span className="MarqueeEmoji"> ~(˘▾˘~) </span>
              ~ ~ ~ room2.fm is live 
              <span className="MarqueeEmoji">(~˘▾˘)~</span> 
              {"NOW PLAYING: " + props.currentArtist}
          </div>
        </div>
          
      </div>            
    </div>
  )
}