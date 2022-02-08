import React, { Component } from 'react';
import { Shaders, Node, GLSL, NearestCopy} from "gl-react";
import { Surface } from "gl-react-dom";

export const shaders = Shaders.create({
  onecolour: {
    frag: GLSL`
    // based on Inigo Quilez noise shader https://www.shadertoy.com/view/XdXGW8
    precision highp float;
    varying vec2 uv;
    uniform float width;
    uniform float height;
    uniform float timer;
    const vec3 ycol = vec3(.824,.953,.91);
    const vec3 lcol = vec3(.961,.652,.266);
    const vec3 rcol = vec3(.184,.219,.297);
    
    vec2 hash( vec2 x ) {
      const vec2 k = vec2( 0.3183099, 0.3678794 );
      x = x*k + k.yx;
      return -1.0 + 2.0*fract( 16.0 * k*fract( x.x*x.y*(x.x+x.y)) );
    }

    float noise( in vec2 p ) {
      vec2 i = floor( p );
      vec2 f = fract( p );	
	    vec2 u = f*f*(3.0-2.0*f);
      return mix( mix( dot( hash( i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ), 
                       dot( hash( i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                  mix( dot( hash( i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ), 
                       dot( hash( i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
    }

    void main() {
      vec2 res = vec2(width,height);
      vec2 st = gl_FragCoord.xy / res;
      vec2 translate = vec2(0.,0.5*timer);
      if (fract( st.y * 0.5) > 0.4  || fract( st.y * 0.5) < 0.2){
        st.x += translate.y*0.35; }
      else {
        if (fract( st.x * 0.5) > 0.2 || fract( st.x * 0.5) < 0.3){
          st.x -= timer*0.5; }
        else {
          st.x += timer*0.35; }
      }
      if (fract( st.y * 0.5) > 0.8 || fract( st.y * 0.5) < 0.6){
        st.x += translate.y*0.35; }
      else {
        if (fract( st.x * 0.5) < 0.4 || fract( st.x * 0.5) > 0.3){
          st.x -= timer*0.5; }
        else {
          st.x += timer*0.35; }
      }      
      float f = noise( 2.0*st );
      f = 1.-(0.6 + 0.2*f);
      vec3 ycol = ycol * (0.5 * sin(timer));

      gl_FragColor = vec4(min(mix(ycol,mix(rcol,lcol,uv.x-0.2),uv.y+0.2), vec3(f,f,f)), 1.0);
    }`
}});

export class GLVis extends Component {
  render() {
    return <>
    <Surface width={this.props.width*0.75} height={this.props.height*0.68}>

      <NearestCopy>
        <Node shader={shaders.onecolour} ignoreUnusedUniforms uniforms={{timer: this.props.timer, width: this.props.width*0.075, height: this.props.width*0.068}} width={this.props.width*0.075} height={this.props.height*0.068} /> 
      </NearestCopy>
                              
    </Surface>
    </>;
  }
}

export default GLVis;
