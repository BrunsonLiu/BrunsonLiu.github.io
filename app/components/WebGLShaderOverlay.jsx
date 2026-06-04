﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿import { useRef, useEffect } from "react";

// 顶点着色器 - 全屏四边形映射
const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 vUv;
  void main() {
    vUv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// 片元着色器 - 水波折射扰动效果
const fragmentShaderSource = `
  precision highp float;
  varying vec2 vUv;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_mouseIntensity;

  // Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
           + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
              dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // FBM 分形布朗运动
  float fbm(vec2 p, int octaves) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    float maxValue = 0.0;
    for (int i = 0; i < 8; i++) {
      if (i >= octaves) break;
      value += amplitude * snoise(p * frequency);
      maxValue += amplitude;
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value / maxValue;
  }

  void main() {
    vec2 uv = vUv;
    float t = u_time * 0.12;

    // UV扰动 - 多层FBM噪声产生水波流动
    vec2 noiseUv1 = vec2(
      fbm(uv * 2.5 + vec2(t * 0.4, t * 0.25), 5),
      fbm(uv * 2.5 + vec2(t * 0.25, -t * 0.35), 5)
    );
    
    vec2 noiseUv2 = vec2(
      fbm(uv * 5.0 + vec2(-t * 0.2, t * 0.5) + noiseUv1 * 1.2, 4),
      fbm(uv * 5.0 + vec2(t * 0.35, -t * 0.45) + noiseUv1 * 1.2, 4)
    );

    // 折射偏移
    float refractionStrength = 0.018;
    vec2 finalUv = uv + noiseUv2 * refractionStrength;

    // 鼠标交互
    vec2 mouse = u_mouse / u_resolution;
    mouse.y = 1.0 - mouse.y;
    float mouseDist = length(uv - mouse);
    float mouseInfluence = smoothstep(0.35, 0.0, mouseDist) * u_mouseIntensity;
    vec2 mouseOffset = (uv - mouse) * mouseInfluence * 0.06;
    
    float mouseRipple = snoise(uv * 18.0 - u_time * 1.8 + mouseDist * 8.0);
    mouseRipple *= mouseInfluence * 0.4;
    finalUv += mouseOffset + mouseRipple * 0.015;

    // 配色（低饱和灰调）
    vec3 bgColor = vec3(0.969, 0.957, 0.933);
    vec3 warmGold = vec3(0.722, 0.584, 0.416);
    vec3 warmBronze = vec3(0.545, 0.435, 0.361);
    vec3 softGold = vec3(0.788, 0.659, 0.486);

    // 颜色混合
    float n1 = fbm(finalUv * 1.8 + vec2(t * 0.15), 4) * 0.5 + 0.5;
    float n2 = fbm(finalUv * 3.5 + vec2(-t * 0.1, t * 0.2), 3) * 0.5 + 0.5;
    float n3 = (snoise(finalUv * 7.0 + vec2(t * 0.08)) * 0.5 + 0.5);

    vec3 color = bgColor;
    color = mix(color, warmGold * 0.3, n1 * 0.35);
    color = mix(color, warmBronze * 0.25, n2 * 0.28);
    color += softGold * n3 * 0.08;
    color += softGold * smoothstep(0.55, 0.85, n3 * 0.5 + n1 * 0.5) * 0.12;
    color += mouseInfluence * warmGold * 0.12;

    // 边缘呼吸光
    float edgeGlow = smoothstep(0.0, 0.12, uv.x) * smoothstep(1.0, 0.88, uv.x) *
                     smoothstep(0.0, 0.12, uv.y) * smoothstep(1.0, 0.88, uv.y);
    color += edgeGlow * warmGold * 0.06 * (0.75 + 0.25 * sin(u_time * 0.4));

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function WebGLShaderOverlay() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const mouseIntensityRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: false, antialias: false });
    if (!gl) return;

    const createShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // 全屏四边形
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uMouseInt = gl.getUniformLocation(program, "u_mouseIntensity");

    const resize = () => {
      canvas.width = window.innerWidth * Math.min(window.devicePixelRatio, 2);
      canvas.height = window.innerHeight * Math.min(window.devicePixelRatio, 2);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX * Math.min(window.devicePixelRatio, 2), y: e.clientY * Math.min(window.devicePixelRatio, 2) };
      mouseIntensityRef.current = Math.min(mouseIntensityRef.current + 0.35, 1.0);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let raf;
    const start = performance.now();
    const animate = () => {
      const time = (performance.now() - start) / 1000;
      mouseIntensityRef.current *= 0.95;

      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(uMouseInt, mouseIntensityRef.current);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(raf);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1 }}
    />
  );
}