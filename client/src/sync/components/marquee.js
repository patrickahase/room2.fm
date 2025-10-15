import React, { useEffect } from 'react';

export default function Marquee(props) {

  const marqueeStyle = {
    wrapper: {
      overflow: 'hidden',
      width: '100%',
      backgroundColor: 'var(--comp-col-01)',
      color: 'var(--comp-col-02)'
    },
    text: {
      width: 'max-content',
      position: 'relative',
      top: '-0.75vh',
      fontSize: '8vh',
      fontFamily: 'Marr Sans Medium',
      right: '110%'
    }
  }
  
  return (
    <div id="marquee-wrapper" style={marqueeStyle.wrapper}>
      <div id="marquee-text" style={marqueeStyle.text}>
        <span className='MarqueeText'>{props.text}{props.text}</span>
        <span className='MarqueeText'>{props.text}{props.text}</span>
        <span className='MarqueeText'>{props.text}{props.text}</span>
        <span className='MarqueeText'>{props.text}{props.text}</span>
      </div>
    </div>
    
  )
}

