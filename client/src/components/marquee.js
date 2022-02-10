import React, { Component } from 'react';

export class Marquee extends Component {
  render() {
    return (
      <div id="top-banner-wrapper">
        <img id="cd-gif" src={require('../content/media/slowdiscpixel.gif').default} alt="spinning cd gif" />  
        <div id="marquee-wrapper">
            <div id="marquee-text-scroll"><span className="MarqueeEmoji"> ~(˘▾˘~) </span>~ ~ ~ room2.fm is live <span className="MarqueeEmoji">(~˘▾˘)~</span> {"NOW PLAYING: " + this.props.currentArtist} <span className="MarqueeEmoji"> ~(˘▾˘~) </span>~ ~ ~ room2.fm is live <span className="MarqueeEmoji">(~˘▾˘)~</span> {"NOW PLAYING: " + this.props.currentArtist} <span className="MarqueeEmoji"> ~(˘▾˘~) </span>~ ~ ~ room2.fm is live <span className="MarqueeEmoji">(~˘▾˘)~</span> {"NOW PLAYING: " + this.props.currentArtist}</div>
        </div>            
      </div>
    )
  }
}

export default Marquee