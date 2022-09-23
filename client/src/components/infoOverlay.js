import React from 'react';

export const InfoOverlay = (props) => {
  return (
    <div id="info-overlay-wrapper" onClick={props.overlayToggle}>
      <span id="info-overlay-close">&times;</span>
      <span id="info-overlay-proceed" className="InfoOverlayText">CLICK ANYWHERE TO PROCEED</span>
      <span id="info-overlay-response-label" className="InfoOverlayText">↑&nbsp; &nbsp; &nbsp;&nbsp;↑<br/>CHOOSE RESPONSE TYPE<br /><br />← RESPOND TO PROMPTS HERE →</span>
      <span id="info-overlay-colour-select-label" className="InfoOverlayText">COLOUR<br/>SELECTION<br/>↓</span>
      <span id="info-overlay-mute-label" className="InfoOverlayText">← MUTE</span>
      <span id="info-overlay-volume-label" className="InfoOverlayText">← VOLUME</span>
    </div>
  )
};