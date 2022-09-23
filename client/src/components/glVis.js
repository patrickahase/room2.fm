import React, { Component } from 'react';
import { Shaders, Node, GLSL, NearestCopy} from "gl-react";
import { Surface } from "gl-react-dom";

export const shaders = Shaders.create({
  onecolour: {
    frag: GLSL`
    #define pi 3.14159265359
    #define twopi 6.28318530718
    precision highp float;
    varying vec2 uv;
    uniform float width;
    uniform float height;
    uniform float timer;
    uniform float tideUp;
    uniform float tideHeight;
    const vec3 rcol = vec3(0.498,0.498,0.475);
    const vec3 lcol = vec3(0.267,0.222,0.502);
    const vec3 ycol = vec3(0.808,0.863,0.773);
    
    mat2 rotate2d(float _angle){
      return mat2(cos(_angle),-sin(_angle),
                  sin(_angle),cos(_angle));
    }
    float polygon(vec2 p, float s, float stimer)
    {
        p *= rotate2d(stimer);
        float a = ceil(s*(atan(-p.y, -p.x)/pi+1.)*.5);
        float n = 2.*pi/s;
        float t = n*a-n*.5;
        return mix(dot(p, vec2(cos(t), sin(t))), length(p), .3);
    }
    vec2 hash12(vec2 p){
      return vec2(fract(sin(dot(p, vec2(92.51, 65.19)))*9219.32),
                fract(sin(dot(p, vec2(23.34, 15.28)))*6485.32));
    }
    

    void main() {
      vec2 res = vec2(width,height);
      vec2 st = ((gl_FragCoord.xy/res) - vec2(.5,.5));
      st *= 6.;

      vec2 i_st = floor(st);
      vec2 f_st = fract(st);

      float minDist = .6;
      float minDist2 = .6;
      float stimer = timer *.2;

      for (int y= -1; y <= 1; y++) {
          for (int x= -1; x <= 1; x++) {
              // Neighbor place in the grid
              vec2 neighbor = vec2(float(x),float(y));

              // Random position from current + neighbor place in the grid
              vec2 point = hash12(i_st + neighbor);

              // Animate the point
              point = 0.5 + 0.5*sin(stimer + 6.2831*point);

              // Vector between the pixel and the point
              vec2 diff = neighbor + point - f_st;

              // Distance to the point
              float dist = polygon(neighbor+point - f_st, 3., stimer);
              float dist2 = polygon(neighbor+point - f_st, 5., stimer);

              // Keep the closer distance
              minDist = min(minDist, dist*(sin(stimer)+1.)*.5);
              minDist2 = min(minDist2, dist2);
          }
      }
      //vec3 comp = vec3(minDist);
      vec3 comp = mix(lcol, rcol, minDist);
      comp = mix(ycol, comp, minDist2);
      gl_FragColor = vec4(comp, 1.0);
    }`
}});

export class GLVis extends Component {
  constructor(props) {
    super(props);
    this.state = { timer: 0 };
  }
  render() {
    return <div id="gl-window">
    <Surface width={this.props.width*0.75} height={this.props.height*0.68}>

      <NearestCopy>
        <Node shader={shaders.onecolour} ignoreUnusedUniforms uniforms={{timer: this.state.timer, width: this.props.width*0.075, height: this.props.width*0.068}} width={this.props.width*0.075} height={this.props.height*0.068} /> 
      </NearestCopy>
                              
    </Surface>
    </div>;
  }
  componentDidMount() {    
    this.startTimer();
  }
  componentWillUnmount() {    
    this.stopTimer();
  }
  startTimer() {
    this.myInterval = setInterval(() => {
      this.setState(prevState =>({
        timer: prevState.timer + 0.1
      }))
    }, 100);     
  }
  stopTimer() {
    clearInterval(this.myInterval);
  }
}

export default GLVis;
