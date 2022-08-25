import React, { Component } from 'react';
import { Shaders, Node, GLSL, NearestCopy} from "gl-react";
import { Surface } from "gl-react-dom";

export const shaders = Shaders.create({
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

    float hash12(vec2 p){
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }
    float cubicPulse(float c, float w, float x){
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
      vec3 noiseCol = ycol + hash12(st)*.04;
      vec3 fadeCol = mix(noiseCol, rcol, ((sin(timer)/2.) +.5)*(sin(st.x-timer-2.5)*stimer)) ;
      vec3 comp = mix(fadeCol, lcol, cubicPulse(.5,stimer*st.y,st.x));
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
    const float pi = 3.14159;

    mat2 rotate2d(float _angle){
      return mat2(cos(_angle),-sin(_angle),
                  sin(_angle),cos(_angle));
    }

    float ring(vec2 uv, float radius, float stimer){
      float width = 1.+radius;
      float blurTime = abs(sin(timer+radius));
      if (mod(radius, 2.0)==0.0){
        uv *= rotate2d(-1.*stimer*(radius/10.));
      } else {
        uv *= rotate2d(stimer+(radius/10.));
      }
      radius *= radius;
      float outerRadius = radius + width;
      float theta = 1.001*(atan(uv.y,uv.x)/pi);
      return  (smoothstep(radius-(radius*blurTime*.1),
                        radius+(radius*blurTime*.1),
                        dot(uv,uv)*3.5) -
              smoothstep(outerRadius-(outerRadius*blurTime*.1),
                        outerRadius+(outerRadius*blurTime*.1),
                        dot(uv,uv)*3.5)) / 
              (1.5 - abs(mod(theta+1.0,45.0)-1.0));
    }

    void main() {
      vec2 res = vec2(width,height);
      vec2 st = (gl_FragCoord.xy/res)-.3;
      float stimer = timer/20.;
      st *= 40.*(rotate2d(stimer)*st.x)*stimer;
      float col = 0.;
      for (float i = 1.; i < 120. ; i++){
        col += ring(st,i, stimer);
      }
      vec3 comp = mix(rcol,lcol,col*.5);
      gl_FragColor = vec4(comp, 1.0);
    }`
  },
  cycleThree: {
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

    float hash11(float p)
    {
        p = fract(p * .1031);
        p *= p + 33.33;
        p *= p + p;
        return fract(p);
    }
    float random (in vec2 st) {
        return fract(sin(dot(st.xy,
                            vec2(12.9898,78.233)))
                    * 43758.5453123);
    }
    mat2 rotate2d(float _angle){
      return mat2(cos(_angle),-sin(_angle),
                  sin(_angle),cos(_angle));
    }

    // 2D Noise based on Morgan McGuire @morgan3d
    // https://www.shadertoy.com/view/4dS3Wd
    float noise (in vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);

        // Four corners in 2D of a tile
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));

        // Smooth Interpolation

        // Cubic Hermine Curve.  Same as SmoothStep()
        vec2 u = f*f*(3.0-2.0*f);
        // u = smoothstep(0.,1.,f);

        // Mix 4 coorners percentages
        return mix(a, b, u.x) +
                (c - a)* u.y * (1.0 - u.x) +
                (d - b) * u.x * u.y;
    }

    float cubicPulse(float c, float w, float x){
      x = abs(x - c);
      if( x>w ) return 0.0;
      x /= w;
      return 1.0 - x*x*(3.0-2.0*x);
    }
    float sleepers(vec2 st, float left, float right){
      if(st.x<left) return 0.;
      if(st.x>right) return 0.;
      return (cubicPulse(.4,.5,sin(st.y*25.)))*.3;
    }

    void main() {
      vec2 res = vec2(width,height);
      float stimer = timer/5.;
      vec2 st = (gl_FragCoord.xy/res)*200.;
      vec2 rt = vec2(st.x * -1., st.y) - timer;
      st += timer*2.;
      float col = 0.;
      float rails = 0.;
      for (float i = 1.; i < 6. ; i++){
        st *= rotate2d(.01);
        rt *= rotate2d(.01);
        if (mod(i, 2.0)==0.0){
          col += noise(st*hash11(i)+i)*.1;
          col -= sleepers(st/90., i, i+1.3);
        } else {
          col += noise(rt*hash11(i)+i)*.1;
          col -= sleepers(rt/60., -1.*i-1.3, -1.*i);
        }
      }
      vec3 comp = vec3(col);
      gl_FragColor = vec4(comp, 1.0);
    }`
  },
  cycleSeven: {
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
    const vec3 rcol = vec3(0.71,0.91,0.467);
    const vec3 lcol = vec3(0.322,0.322,1.);
    const vec3 ycol = vec3(0.937,0.592,0.439);

    mat2 rotate2d(float _angle){
      return mat2(cos(_angle),-sin(_angle),
                  sin(_angle),cos(_angle));
    }

    void main() {
      vec2 res = vec2(width,height);
      vec2 st = ((gl_FragCoord.xy/res) - vec2(.5,.25));
      float stimer = timer*.1;
      float col = 0.;
      for (float i = 1.; i < 9. ; i++){
        vec2 rt = st*i*rotate2d(i);
        float a = atan(rt.x-fract(stimer+i/5.), rt.y) + pi;
        float r = twopi/3.;
        float d = cos(floor(.5+a/r)*r-a)*length(rt);
        col += (1.-smoothstep(.4,.45,d))*.2;
      }
      vec3 comp = vec3(col);
      gl_FragColor = vec4(comp, 1.0);
    }`
  },
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
