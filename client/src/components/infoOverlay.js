import React from 'react';

export const InfoOverlay = (props) => {
  return (
    <div id="info-overlay-wrapper" onClick={props.overlayToggle}>
      <span id="info-overlay-close">&times;</span>
      <span id="info-overlay-proceed">CLICK ANYWHERE TO PROCEED</span>
    </div>
  )
};