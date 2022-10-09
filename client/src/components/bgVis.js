import React, { useEffect } from 'react'
import 'glslCanvas/lib/GlslCanvas'

export default function BGVis(props) {
  useEffect(() => {}, []);
  const fragShaders = [
    // shader 1 - hw - peach, blue, taupe
    `precision highp float;
    uniform vec2 u_resolution;
    uniform float u_time;
    const vec3 rcol = vec3(0.855,0.804,0.722);
    const vec3 lcol = vec3(0.161,0.298,1.);
    const vec3 ycol = vec3(1.,0.714,0.549);
    #define PI 3.141592
    
    mat2 rotate2d(float _angle){
      return mat2(cos(_angle),-sin(_angle),
                  sin(_angle),cos(_angle));
    }
    float polygon(vec2 p, float s, float stimer)
    {
        p *= rotate2d(stimer);
        float a = ceil(s*(atan(-p.y, -p.x)/PI+1.)*.5);
        float n = 2.*PI/s;
        float t = n*a-n*.5;
        return mix(dot(p, vec2(cos(t), sin(t))), length(p), .3);
    }
    vec2 hash12(vec2 p){
      return vec2(fract(sin(dot(p, vec2(92.51, 65.19)))*9219.32),
                fract(sin(dot(p, vec2(23.34, 15.28)))*6485.32));
    }

    void main() {
      float stimer = u_time * .1;
      vec2 st = gl_FragCoord.xy / u_resolution - vec2(.5);
      st *= 4.;

      vec2 i_st = floor(st);
      vec2 f_st = fract(st);

      float minDist = .6;
      float minDist2 = .6;

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
          float dist2 = polygon(neighbor+point - f_st - vec2(.5, 0.), 4., stimer);

          // Keep the closer distance
          minDist = min(minDist, dist*(sin(stimer)+1.)*.5);
          minDist2 = min(minDist2, dist2);
        }
      }
      vec3 comp = mix(lcol, rcol, minDist);
      comp = mix(comp, ycol, minDist2);
      gl_FragColor = vec4(comp, 1.0);
    }
    `,
    // shader 2 - as - red purple taupe               
    `precision highp float;
    uniform vec2 u_resolution;
    uniform float u_time;
    const vec3 lcol = vec3(1.,0.31,0.);
    const vec3 rcol = vec3(0.365,0.176,0.831);
    const vec3 ycol = vec3(0.855,0.804,0.722);
    #define PI 3.141592
    
    float hash11(float p){
      p = fract(p * .1031);
      p *= p + 33.33;
      p *= p + p;
      return fract(p);
    }

    float circle(vec2 st, float radius){
      vec2 dist = st;
      return 1.-smoothstep(radius-(radius*0.01),
                            radius+(radius*0.01),
                            dot(dist,dist)*4.0);
    }

    float ring(vec2 st, float radius, float width){
      vec2 dist = st;
      return max(smoothstep(radius-(radius*0.01),
                radius*width+(radius*width),
                dot(dist,dist)*4.0) * (st.x+radius/4.), 0.);
    }
    mat2 rotate2d(float _angle){
      return mat2(cos(_angle),-sin(_angle),
                  sin(_angle),cos(_angle));
    }

    void main() {
      float timer = u_time*.03;
      vec2 uv = (gl_FragCoord.xy-.5 * u_resolution) / u_resolution.y;
      float col = 0.;
      for (float i = 0.1; i < 1.1; i += .1){
        col += ring(uv-vec2(i*sin(timer), 0.)*rotate2d(timer*hash11(i)), 1., 0.1);
      }
      vec3 gradCircle = mix(ycol,rcol,col);
      vec3 comp = mix(ycol,gradCircle,circle(uv, 1.));
      gl_FragColor = vec4(comp, 1.0);
    }
    `,                  
    // shader 3 - as - red purple taupe               
    `precision highp float;
    uniform vec2 u_resolution;
    uniform float u_time;
    const vec3 lcol = vec3(1.,0.31,0.);
    const vec3 rcol = vec3(1.,0.796,0.831);
    const vec3 ycol = vec3(0.855,0.804,0.722);
    
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
      float timer = u_time*.2;
      vec2 uv = (gl_FragCoord.xy-.5 * u_resolution) / u_resolution.y;
      vec2 st = uv;
      st.x += 0.45;
      st.y *= st.x;
      float stimer = timer*.2;
      vec2 pos = (vec2(0.0)-st)*rotate2d(stimer+(2.));
      float r = length(pos)*1.;
      float a = atan(pos.y,pos.x);
      float f = abs(cos(a*2.5))*((sin(uv.y+stimer)+2.)*.25);
      vec3 flow = mix(rcol, lcol, clamp((1.-smoothstep(f-0.,f+0.01,r))*3.5,0.,1.));
      st.y += stimer;
      float noisecol = noise(st*8.);
      if (noisecol < .6+(sin(timer)*.2))
        noisecol = noisecol/2.;
      else noisecol = 1.;
      float bg = ((sin(timer)/2.)+.5)*noisecol;
      vec3 bgcol = mix(ycol,rcol,flow);
      vec3 comp = mix(bgcol,flow,f);
      //vec3 comp = vec3(uv.y);
      gl_FragColor = vec4(comp, 1.0);
    }
    `,                  
  ]

  return (
    <canvas id="bgShader" className="glslCanvas" data-fragment={fragShaders[props.shaderID]} 
        width={props.width} height={props.height}></canvas>
  )  
}
