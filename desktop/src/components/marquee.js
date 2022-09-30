import React, { useEffect } from 'react';

export default function Marquee(props) {

  const marqueeStyle = {
    wrapper: {
      overflow: 'hidden',
      width: '100%'
    },
    text: {
      width: 'max-content',
      position: 'relative'
    }
  }

  useEffect(() => {
    window.addEventListener("resize", updateFontSize);
    updateFontSize();
  }, []);

  // update marquee text size on window size update
  function updateFontSize(){
    document.getElementById("marquee-text").style.fontSize = document.getElementById("marquee-wrapper").getBoundingClientRect().height * 0.8 + 'px';
    textStringLength();
  }

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
      duration: marqText.getBoundingClientRect().width * 2,
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

