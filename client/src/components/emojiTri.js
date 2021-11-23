import React, { Component } from 'react';
import { Shader, Stage } from "react-pixi-fiber";
import * as PIXI from 'pixi.js';

export class EmojiTri extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shaderWidth: window.innerWidth/5,
      shaderHeight: (window.innerWidth/5)*0.866
    }
    // bind func's to this
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  render() {
    return (
      <div id="emoji-tri-wrapper">              
        
      </div>
    )
  }
  componentDidMount() {  
    this.updateWindowDimensions();
    this.setUpPixi();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    /* this.setState({ shaderWidth: window.innerWidth/5, shaderHeight: (window.innerWidth/5)*0.866 }); */
    /* this.setState({ width: window.innerWidth, height: window.innerHeight }); */
  }
  setUpPixi(){
    let renderer = new PIXI.autoDetectRenderer(this.props.height/6, (this.props.height/6)*0.866);
    document.getElementById("emoji-tri-wrapper").appendChild(renderer.view);
    let myTriShader = new PIXI.Filter('',emojiTriShader);
  }
}

export default EmojiTri

/* Fragment Shader */
/* GLSL */

const emojiTriShader = `
precision highp float;
varying vec2 uv;
const vec3 ycol = vec3(.789,.789,.984);
const vec3 lcol = vec3(.391,.313,.746);
const vec3 rcol = vec3(.793,.711,.363);

void main() {
  vec4 uvcol = vec4(mix(ycol,mix(rcol,lcol,uv.x),uv.y), 1.0);
  vec4 tricol = mix(uvcol,vec4(0.0),step(0.5, abs(uv.x - 0.5) + abs(uv.y*.5 - 0.5)));
  gl_FragColor = tricol;
}
`;
