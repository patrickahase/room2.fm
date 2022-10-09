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
      fontFamily: 'Marr Sans Medium'
    }
  }

  useEffect(() => {    
    window.addEventListener("resize", textStringLength);
    textStringLength();
  }, []);

  // makes sure the string is long enough
  function textStringLength(){
    let marqText = document.getElementById("marquee-text");
    if(marqText.getBoundingClientRect().width < document.getElementById("marquee-wrapper").getBoundingClientRect().width * 2){
      marqText.innerHTML = marqText.innerHTML + marqText.innerHTML;
      textStringLength();
    } else {
      addTextAnim();
    }
  }

  // add animation to string
  function addTextAnim(){
    let marqText = document.getElementById("marquee-text");
    marqText.animate([
      {left: '0px'},
      {left: -1 * marqText.getBoundingClientRect().width/2 + 'px'}
    ], {
      duration: marqText.getBoundingClientRect().width * 8,
      iterations: Infinity
    })
  }
  
  return (
    <div id="marquee-wrapper" style={marqueeStyle.wrapper}>
      <div id="marquee-text" style={marqueeStyle.text}>
        {props.text}
      </div>
    </div>
    
  )
}

