import React, { useEffect } from 'react';

import TodayLogo from '../assets/TODAY_LOGOTYPE_MONO_WHITE.svg';
import room2Logo from '../assets/room2-logo.svg';

export default function IntroAnim(props) {

  useEffect(() => {
    if(props.introAnimStart){
      // get all the elements to animate
      if(props.animOn){
        animateIntro();
      } else {
        document.getElementById("anim-wrapper").remove();
      }
    }
    
  }, [props.introAnimStart])

  const introStyle = {
    animWrapper: {
      position: 'absolute',
      left: '0%',
      top: '0%',
      height: 'calc(100% - 1.9rem)',
      width: 'calc(100% - 1.9rem)',
      margin: '0.95rem',
      backgroundColor: 'var(--comp-col-01)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      overflow: 'hidden'
    },
    hr: {
      position: 'relative',
      width: '100%',
      border: 'none',
      borderTop: 'solid 2px var(--comp-col-02)'
    },
    logo: {
      position: 'relative',
      width: '100%',
      margin: '0.5rem 0'
    },
    X: {
      position: 'relative',
      width: '20%',
      margin: '0.5rem 0',
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center'
    }
  }
  return (
    <div id="anim-wrapper" style={introStyle.animWrapper}>
      <hr style={introStyle.hr} />
      <img style={introStyle.logo} src={TodayLogo} />
      <div style={introStyle.X}><XIcon strokeColour={"white"} /></div>      
      <img style={introStyle.logo} src={room2Logo} />
      <hr style={introStyle.hr} />
    </div>
  )

  function animateIntro(){
    // stage one takes 1440 total
    // wait for 2000?
    // stage two
    let animateArray = Array.from(document.getElementById("anim-wrapper").children);
    // [0] - top horizontal line
    animateArray[0].animate([
      {top: '120%'}, {top: '0%'}
    ], { duration: 800,
         easing: 'cubic-bezier(0.665, 0.005, 0.580, 1.000)',
         fill: 'backwards'})
    .onfinish = () => {
      animateArray[0].animate([
        {opacity: 1}, {opacity: 0}
      ], { duration: 1200,
           delay: 2000,
           easing: 'ease-in',
           fill: 'backwards'})
    };
         
    // [1] - Today logo
    animateArray[1].animate([
      {top: '120%'}, {top: '0%'}
    ], { duration: 800,
         delay: 60,
         easing: 'cubic-bezier(0.665, 0.005, 0.580, 1.000)',
         fill: 'backwards'})
    .onfinish = () => {
    animateArray[1].animate([
      {left: '0%'}, {left: '-100%'}
    ], { duration: 1200,
          delay: 2000,
          easing: 'ease-in',
          fill: 'forwards'})
    };

    // [2] - X
    animateArray[2].animate([
      {top: '120%'}, {top: '0%'}
    ], { duration: 800,
         delay: 120,
         easing: 'cubic-bezier(0.665, 0.005, 0.580, 1.000)',
         fill: 'backwards'})
    .onfinish = () => {
    setTimeout(() => {document.getElementById("x-scale-anim").beginElement();}, 2000)
    animateArray[2].animate([
      {width: '20%'}, {width: '100%'}
    ], { duration: 1000,
          delay: 2000,
          easing: 'ease-in',
          fill: 'forwards'})
    animateArray[2].animate([
      {height: 'unset'}, {height: '100%'}
    ], { duration: 1000,
          delay: 2000,
          easing: 'ease-in',
          fill: 'forwards'})
    document.getElementById("anim-wrapper").animate([
      {opacity: 1}, {opacity: 0}
    ], { duration: 1000,
          delay: 2000,
          easing: 'ease-in',
          fill: 'forwards'})
    .onfinish = () => {
      document.getElementById("anim-wrapper").remove();
    }
    };

    // [3] - room2 logo
    animateArray[3].animate([
      {top: '120%'}, {top: '0%'}
    ], { duration: 800,
         delay: 180,
         easing: 'cubic-bezier(0.665, 0.005, 0.580, 1.000)',
         fill: 'backwards'})
    .onfinish = () => {
    animateArray[3].animate([
      {left: '0%'}, {left: '100%'}
    ], { duration: 1200,
          delay: 2000,
          easing: 'ease-in',
          fill: 'forwards'})
    };

    // [4] - bottom horizontal line
    animateArray[4].animate([
      {top: '120%'}, {top: '0%'}
    ], { duration: 800,
         delay: 240,
         easing: 'cubic-bezier(0.665, 0.005, 0.580, 1.000)',
         fill: 'backwards'})

  }
}

function XIcon(props){
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      fill='black'
      stroke={props.strokeColour}
      strokeWidth="15"
      >
        <animate
          attributeName="stroke-width"
          values="15;150"
          dur="2s"
          begin="indefinite"
          fill="freeze"
          id="x-scale-anim" />
        <path fill="none" 
              d=" M 10,-10
                  L 90,110
                  M 90,-10
                  L 10,110
                  " />
      
    </svg>
  )
}
