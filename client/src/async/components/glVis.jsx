import { useEffect, useRef} from 'react'
import 'glslCanvas/lib/GlslCanvas';
import GlslCanvas from 'glslCanvas/lib/GlslCanvas';

export default function GLVis(props) {

  const canvasRef = useRef(null);

  /* init */
  useEffect(() => {
    canvasRef.current = new GlslCanvas(document.getElementById("bgShader"));
    canvasRef.current.load(fragShader);
  }, []);

  /* size */
  useEffect(() => {
    if(canvasRef.current){
      document.getElementById("bgShader").width = props.width;
      document.getElementById("bgShader").height = props.height;
    }    
  }, [props.height, props.width]);

  // update timer value
  useEffect(() => {
    canvasRef.current.setUniform("timer", props.timer);
  }, [props.timer]);

  const fragShader = `
    precision highp float;
    varying vec2 uv;
    uniform vec2 u_resolution;
    uniform float timer;
    const float tideUp = 1.0;
    const float tideHeight = 0.86;
    const vec3 lcol = vec3(0.69,0.69,0.69);
    const vec3 rcol = vec3(0.18,0.145,0.239);
    const vec3 ycol = vec3(0.1,0.,0.1);
    const float pi = 3.14159;

    float hash11(float p){
        p = fract(p * .1031);
        p *= p + 33.33;
        p *= p + p;
        return fract(p);
    }
    float random (vec2 st){
        return fract(sin(dot(st.xy,
                            vec2(12.9898,78.233)))
                    * 43758.5453123);
    }
    // 2D Noise based on Morgan McGuire @morgan3d
    // https://www.shadertoy.com/view/4dS3Wd
    float noise (vec2 st){
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));

        vec2 u = f*f*(3.0-2.0*f);
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

    void main() {
      float stimer = timer/5.;
      vec2 uv = (gl_FragCoord.xy/u_resolution);
      vec2 st = uv*100.;
      vec2 rt = vec2(st.x * -1., st.y) - stimer;
      st += timer*2.;
      float col = 0.;
      for (float i = 1.; i < 7. ; i++){
        if (mod(i, 2.0)==0.0){
          col += noise(st*hash11(i)+i)*cubicPulse(0.45,.1*i,uv.y)*.2;
        } else {
          col += noise(rt*hash11(i)+i)*cubicPulse(0.45,.1*i,uv.y)*.2;
        }
      }
      col -= cubicPulse(.4,.5,sin(uv.x*30.))*.3;
      vec3 comp = vec3(col);
      gl_FragColor = vec4(comp, 1.0);
    }`

  return (
    <canvas id="bgShader" /* className="glslCanvas" */ data-fragment={fragShader} 
        width={props.width} height={props.height} >
    </canvas>
  )
}
