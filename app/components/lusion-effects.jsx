﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿"use client";
import { useEffect, useRef } from "react";

// Lusion 风格的 3D 粒子系统 - 宇宙星空感觉
export function LusionParticles({ particleCount = 3000, mouseInfluence = 0.3 }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    // Vertex shader
    const vertexShaderSource = `
      attribute vec3 aPosition;
      attribute float aSize;
      attribute float aAlpha;
      attribute float aColor;
      
      uniform float uTime;
      uniform float uPixelRatio;
      uniform vec2 uMouse;
      
      varying float vAlpha;
      varying float vDistance;
      varying float vColor;
      
      void main() {
        vec3 pos = aPosition;
        
        // 鼠标影响
        vec2 toMouse = uMouse - pos.xy;
        float dist = length(toMouse);
        float influence = smoothstep(0.8, 0.0, dist) * 0.15;
        pos.xy -= toMouse * influence;
        
        // 缓慢漂浮
        pos.x += sin(uTime * 0.1 + aPosition.z * 6.2831) * 0.02;
        pos.y += cos(uTime * 0.08 + aPosition.z * 3.14159) * 0.015;
        pos.z += sin(uTime * 0.05 + aPosition.z * 9.4248) * 0.01;
        
        vDistance = dist;
        vAlpha = aAlpha;
        vColor = aColor;
        
        gl_Position = vec4(pos, 1.0);
        gl_PointSize = aSize * uPixelRatio * (0.5 + 0.5 * smoothstep(1.0, 0.0, dist));
      }
    `;

    // Fragment shader - 宇宙星空颜色
    const fragmentShaderSource = `
      precision mediump float;
      
      varying float vAlpha;
      varying float vDistance;
      varying float vColor;
      
      void main() {
        vec2 center = gl_PointCoord - 0.5;
        float dist = length(center);
        float alpha = smoothstep(0.5, 0.0, dist) * vAlpha;
        
        // 宇宙颜色渐变
        vec3 color1 = vec3(0.54, 0.71, 0.97); // 蓝白
        vec3 color2 = vec3(0.87, 0.80, 0.95); // 紫色
        vec3 color3 = vec3(0.95, 0.85, 0.80); // 暖白
        
        vec3 color;
        if (vColor < 0.33) {
          color = mix(color1, color2, vColor * 3.0);
        } else if (vColor < 0.66) {
          color = mix(color2, color3, (vColor - 0.33) * 3.0);
        } else {
          color = mix(color3, color1, (vColor - 0.66) * 3.0);
        }
        
        // 靠近鼠标更亮
        float brightness = 1.0 + 1.5 * smoothstep(0.8, 0.0, vDistance);
        
        gl_FragColor = vec4(color * brightness, alpha);
      }
    `;

    const compileShader = (source, type) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Generate particle positions (spherical distribution)
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const alphas = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 0.3 + Math.random() * 0.7;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      sizes[i] = 1 + Math.random() * 2;
      alphas[i] = 0.3 + Math.random() * 0.7;
      colors[i] = Math.random();
    }

    const createBuffer = (data, attribName, size) => {
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      const attrib = gl.getAttribLocation(program, attribName);
      gl.enableVertexAttribArray(attrib);
      gl.vertexAttribPointer(attrib, size, gl.FLOAT, false, 0, 0);
    };

    createBuffer(positions, "aPosition", 3);
    createBuffer(sizes, "aSize", 1);
    createBuffer(alphas, "aAlpha", 1);
    createBuffer(colors, "aColor", 1);

    const uTime = gl.getUniformLocation(program, "uTime");
    const uPixelRatio = gl.getUniformLocation(program, "uPixelRatio");
    const uMouse = gl.getUniformLocation(program, "uMouse");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    const handleMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMouseMove);

    let startTime = Date.now();
    const render = () => {
      const time = (Date.now() - startTime) / 1000;

      // Smooth mouse
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1f(uTime, time);
      gl.uniform1f(uPixelRatio, window.devicePixelRatio);
      gl.uniform2f(uMouse, mouseRef.current.x * mouseInfluence, mouseRef.current.y * mouseInfluence);

      gl.drawArrays(gl.POINTS, 0, particleCount);
      animationRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [particleCount, mouseInfluence]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

// 流体渐变背景 - 强烈 Lusion 风格的柔和流动
export function FluidGradient() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // 更多渐变球体 - 宇宙深空感，淡色光晕
    const orbs = [
      { x: 0.1, y: 0.15, r: 0.6, color: [40, 80, 160], speed: 0.0003, phase: 0 },
      { x: 0.85, y: 0.8, r: 0.55, color: [30, 60, 120], speed: 0.00025, phase: 1.5 },
      { x: 0.5, y: 0.5, r: 0.5, color: [60, 50, 140], speed: 0.0002, phase: 3 },
      { x: 0.2, y: 0.85, r: 0.45, color: [20, 100, 130], speed: 0.00028, phase: 0.7 },
      { x: 0.75, y: 0.2, r: 0.4, color: [80, 40, 100], speed: 0.00022, phase: 2.3 },
    ];

    let time = 0;
    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 纯黑深空背景
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      orbs.forEach((orb) => {
        const x = canvas.width * (orb.x + Math.sin(time * orb.speed * 60 + orb.phase) * 0.15);
        const y = canvas.height * (orb.y + Math.cos(time * orb.speed * 50 + orb.phase) * 0.12);
        const r = Math.min(canvas.width, canvas.height) * orb.r;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
        const [cr, cg, cb] = orb.color;
        gradient.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, 0.15)`);
        gradient.addColorStop(0.5, `rgba(${cr}, ${cg}, ${cb}, 0.05)`);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      animationRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}

// 鼠标跟随的发光光标 - 强烈效果
export function GlowingCursor() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const trailPositions = useRef([]);
  const MAX_TRAILS = 15;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 添加新的位置到轨迹
      trailPositions.current.unshift({ ...mouseRef.current });
      if (trailPositions.current.length > MAX_TRAILS) {
        trailPositions.current = trailPositions.current.slice(0, MAX_TRAILS);
      }

      // 绘制拖尾
      trailPositions.current.forEach((pos, index) => {
        const alpha = (1 - index / MAX_TRAILS) * 0.4;
        const radius = 30 + (index * 5);
        
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, radius);
        gradient.addColorStop(0, `rgba(138, 180, 248, ${alpha * 0.6})`);
        gradient.addColorStop(0.4, `rgba(138, 180, 248, ${alpha * 0.3})`);
        gradient.addColorStop(1, "rgba(138, 180, 248, 0)");
        ctx.fillStyle = gradient;
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 中心光标
      ctx.beginPath();
      const mainGradient = ctx.createRadialGradient(
        mouseRef.current.x, mouseRef.current.y, 0,
        mouseRef.current.x, mouseRef.current.y, 15
      );
      mainGradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
      mainGradient.addColorStop(0.3, "rgba(138, 180, 248, 0.6)");
      mainGradient.addColorStop(1, "rgba(138, 180, 248, 0)");
      ctx.fillStyle = mainGradient;
      ctx.arc(mouseRef.current.x, mouseRef.current.y, 15, 0, Math.PI * 2);
      ctx.fill();

      requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  );
}
