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
    uniform float tideUp;
    uniform float tideHeight;
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
      st.y += tideUp*timer/10.;
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
}, 
  newvis: {
    frag: GLSL`
    precision highp float;
    varying vec2 uv;
    uniform float width;
    uniform float height;
    uniform float timer;
    //const float timer = 15.8;
    uniform float tideUp;
    uniform float tideHeight;
    const float emtriy = 0.7;
    const float emtrix = 1.5;
    const vec3 rcol = vec3(0.71,0.91,0.467);
    const vec3 lcol = vec3(0.322,0.322,1.);
    const vec3 ycol = vec3(0.937,0.592,0.439);
   // const vec3 rcol = vec3(0.902,0.733,0.271);
   // const vec3 lcol = vec3(0.937,0.592,0.439);
   // const vec3 ycol = vec3(0.835,0.867,0.565);

    float hash( float x ) {
      return fract(sin(x)*43758.5453);
    }  
    float rand(vec2 n) { 
      return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
    }        
    float noise(vec2 p){
      vec2 ip = floor(p);
      vec2 u = fract(p);
      u = u*u*(3.0-2.0*u);          
      float res = mix(
        mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
        mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
      return res*res;
    }
    mat2 rotate2d(float _angle){
      return mat2(cos(_angle),-sin(_angle),
                  sin(_angle),cos(_angle));
    }
    void main() {
      vec2 res = vec2(width,height);
      vec2 st = (gl_FragCoord.xy/res)- .5;
      st.x += 0.45;
      st.y *= st.x;
      float stimer = timer*.2;
      vec2 pos = (vec2(0.0)-st)*rotate2d(stimer+(emtrix*4.));
      float r = length(pos)*2.0*emtriy;
      float a = atan(pos.y,pos.x);
      float f = abs(cos(a*2.5))*.3+(.3*emtrix);
      vec3 flow = mix(vec3(0.), ycol, ((1.-smoothstep(f-0.,f+0.01,r))*1.2));
      flow -= 1.-smoothstep(0.04,0.05,distance(st,vec2(0.0)));
      float mixerx = timer + st.y;
      st.y += stimer;
      float noisecol = noise(st*8.);
      if (noisecol < .6+(sin(timer)*.2))
        noisecol = noisecol/2.;
      else noisecol = 1.;
      float bg = ((sin(timer)/2.)+.5)*noisecol;
      vec3 bgcol = lcol-flow;
      vec3 comp = mix(bgcol,flow,f);
      gl_FragColor = vec4(comp, 1.0);
    }`
}, 
  cycleTwo: {
    frag: GLSL`
    precision highp float;
    varying vec2 uv;
    uniform float width;
    uniform float height;
    uniform float timer;
    uniform float tideUp;
    uniform float tideHeight;
    const vec3 rcol = vec3(0.925,0.878,0.878);
    const vec3 lcol = vec3(0.176,0.251,0.278);
    const vec3 ycol = vec3(0.937,0.592,0.439);
    const float pi = 3.14159;

    mat2 rotate2d(float _angle){
      return mat2(cos(_angle),-sin(_angle),
                  sin(_angle),cos(_angle));
    }

    float hash( float x ) {
      return fract(sin(x)*43758.5453);
    }  
    float rand(vec2 n) { 
      return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
    }        
    float noise(vec2 p){
      vec2 ip = floor(p);
      vec2 u = fract(p);
      u = u*u*(3.0-2.0*u);          
      float res = mix(
        mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
        mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
      return res*res;
    }

    void main() {
      vec2 res = vec2(width,height);
      vec2 st = (gl_FragCoord.xy/res)-.3;
      float stimer = timer/4.;
      // distance field
      float theta = (180.0+timer)*(atan(st.y,st.x)/pi);
      //st += noise((st+.08)*10.)*.02;
      st = rotate2d(stimer) * st;
      float d = length(abs(st-.01));
      float c = abs(mod(timer,45.0)-(55.-sin(timer)*5.));
      //vec3 comp = vec3(fract(d*stimer)/(c-2.));
      vec3 comp = mix(rcol, lcol,fract(d*stimer)/c);
      //vec3 comp = vec3(c);
      gl_FragColor = vec4(comp, 1.0);
    }`
}, 
  cycleOne: {
    frag: GLSL`
    precision highp float;
    varying vec2 uv;
    uniform float width;
    uniform float height;
    uniform float timer;
    uniform float tideUp;
    uniform float tideHeight;
    const vec3 rcol = vec3(0.8,0.,0.2);
    const vec3 lcol = vec3(0.,0.502,0.376);
    const vec3 ycol = vec3(0.1,0.,0.1);

    float cubicPulse( float c, float w, float x )
    {
      x = abs(x - c);
      if( x>w ) return 0.0;
      x /= w;
      return 1.0 - x*x*(3.0-2.0*x);
    }

    void main() {
      vec2 res = vec2(width,height);
      vec2 st = (gl_FragCoord.xy/res);
      float stimer = timer/200.;
      st.x -= sin(st.y*st.y*timer)*st.y*stimer;
      vec3 fadeCol = mix(ycol, rcol, ((sin(timer)/2.) +.5)*(sin(st.x-timer-2.5)*stimer)) ;
      vec3 comp = mix(fadeCol, lcol, cubicPulse(.5,stimer*st.y,st.x));
      gl_FragColor = vec4(comp, 1.0);
    }`
}, 
  cycleBlank: {
    frag: GLSL`
    precision highp float;
    varying vec2 uv;
    uniform float width;
    uniform float height;
    uniform float timer;
    uniform float tideUp;
    uniform float tideHeight;
    const vec3 rcol = vec3(0.71,0.91,0.467);
    const vec3 lcol = vec3(0.322,0.322,1.);
    const vec3 ycol = vec3(0.937,0.592,0.439);

    void main() {
      vec2 res = vec2(width,height);
      vec2 st = (gl_FragCoord.xy/res);
      vec3 comp = vec3(1.,1.,1.);
      gl_FragColor = vec4(comp, 1.0);
    }`
}, 
});

export class GLVis extends Component {
  render() {
    return <>
    <Surface width={this.props.width} height={this.props.height}>

      <NearestCopy>
        <Node shader={shaders[this.props.shaderName]} ignoreUnusedUniforms uniforms={{
          timer: this.props.timer, 
          width: this.props.width*0.75/this.props.graphicsSettings, 
          height: this.props.width*0.68/this.props.graphicsSettings, 
          tideUp: this.props.tideData.tideUp,
          tideHeight: this.props.tideData.tideHeight,
          }} width={this.props.width*0.75/this.props.graphicsSettings} height={this.props.height*0.68/this.props.graphicsSettings} /> 
      </NearestCopy>
                              
    </Surface>
    </>;
  }
}

export default GLVis;
