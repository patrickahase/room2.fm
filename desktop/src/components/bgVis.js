import React from 'react'
import 'glslCanvas/lib/GlslCanvas'

export default function BGVis() {
  const fragShader = `precision highp float;
                      uniform vec2 u_resolution;
                      uniform float u_time;
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
                        float ftimer = sin(u_time * .01)*.5;
                        vec2 st = gl_FragCoord.xy / u_resolution;
                        vec2 translate = vec2(0.,0.5*ftimer);
                        if (fract( st.y * 0.5) > 0.4  || fract( st.y * 0.5) < 0.2){
                          st.x += translate.y*0.35; }
                        else {
                          if (fract( st.x * 0.5) > 0.2 || fract( st.x * 0.5) < 0.3){
                            st.x -= ftimer*0.5; }
                          else {
                            st.x += ftimer*0.35; }
                        }
                        if (fract( st.y * 0.5) > 0.8 || fract( st.y * 0.5) < 0.6){
                          st.x += translate.y*0.35; }
                        else {
                          if (fract( st.x * 0.5) < 0.4 || fract( st.x * 0.5) > 0.3){
                            st.x -= ftimer*0.5; }
                          else {
                            st.x += ftimer*0.35; }
                        }      
                        float f = noise( 2.0*st );
                        f = 1.-(0.6 + 0.2*f);
                        vec3 ycol = ycol * (0.5 * sin(ftimer));

                        gl_FragColor = vec4(min(mix(ycol,mix(rcol,lcol,st.x-0.2),st.y+0.2), vec3(f,f,f)), 1.0);
                      }
                      `;

  return (
    <canvas id="bgShader" className="glslCanvas" data-fragment={fragShader} 
        width="100%" height="100%"></canvas>
  )  
}
