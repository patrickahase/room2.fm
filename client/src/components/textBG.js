import React from 'react';
import Sketch from 'react-p5';
import 'p5/lib/addons/p5.sound';

export default function TextBG(props) {

  let fft, mic;

  let col1 = 0;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(0, 0).parent(canvasParentRef);
    props.audioInit(p5.getAudioContext());
    fft = new p5.constructor.FFT();
    //fft.setInput(props.streamAudio);
  }
  
  const draw = p5 => {
    p5.background(col1, 130, 20);
    let spectrum = fft.analyze();
    let mid = fft.getEnergy("mid");
    console.log(mid);
    document.documentElement.style.setProperty("--font-var-one", mid);
  }
  
  return <>
  <Sketch setup={setup} draw={draw} />
  <span className='vfText'>Variable Test</span>
  </>
}
