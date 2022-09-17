import React from 'react';
import Sketch from 'react-p5';
import 'p5/lib/addons/p5.sound';

export default function TextBG() {

  let fft, mic;

  let col1 = 0;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(0, 0).parent(canvasParentRef);
    mic = new p5.constructor.AudioIn();
    mic.start();
    fft = new p5.constructor.FFT();
    fft.setInput(mic);
  }
  
  const draw = p5 => {
    p5.background(col1, 130, 20);
    let spectrum = fft.analyze();
    let mid = fft.getEnergy("mid");
    console.log(mid);
    //console.log(fft.analyze());
    //col1 = fft.getEnergy("mid");
    document.documentElement.style.setProperty("--font-var-one", mid);
  }
  
  return <>
  <Sketch setup={setup} draw={draw} />
  <span className='vfText'>Variable Test</span>
  </>
}
