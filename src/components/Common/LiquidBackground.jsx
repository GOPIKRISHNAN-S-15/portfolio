import React, { useEffect, useRef, useMemo } from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * LiquidBackground - A high-performance WebGL Fluid Simulation (Navier-Stokes)
 * Optimized for cinematic feel and interactive flow.
 */
const LiquidBackground = ({ recruiterMode = false }) => {
    const canvasRef = useRef(null);
    const { theme } = useTheme();

    // Theme-aware colors
    const themeColors = useMemo(() => {
        switch (theme) {
            case 'neon':
                return { primary: [1.0, 0.0, 1.0], secondary: [0.0, 1.0, 1.0] }; // Magenta & Cyan
            case 'cyber':
                return { primary: [0.68, 1.0, 0.0], secondary: [0.0, 0.5, 1.0] }; // Lime & Blue
            case 'light':
                return { primary: [0.1, 0.6, 1.0], secondary: [0.5, 0.2, 0.8] }; // Blue & Purple
            default: // Dark
                return { primary: [0.05, 0.65, 1.0], secondary: [0.5, 0.0, 1.0] };
        }
    }, [theme]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext('webgl', { antialias: false, depth: false });
        if (!gl) return;

        // --- Shader Sources ---
        const baseVertex = `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv;
      void main() {
        vUv = aPosition * 0.5 + 0.5;
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

        const copyShader = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      void main() { gl_FragColor = texture2D(uTexture, vUv); }
    `;

        const displayShader = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uFinal;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      void main() {
        vec4 data = texture2D(uFinal, vUv);
        float density = data.x;
        vec3 color = mix(vec3(0.01, 0.02, 0.05), uColor1, density * 1.5);
        color = mix(color, uColor2, density * density);
        gl_FragColor = vec4(color, 1.0);
      }
    `;

        // Fluid Solver Shaders
        const advectionShader = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 uTexelSize;
      uniform float uDt;
      void main() {
        vec2 coord = vUv - uDt * texture2D(uVelocity, vUv).xy * uTexelSize;
        gl_FragColor = texture2D(uSource, coord);
      }
    `;

        const splatShader = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTarget;
      uniform float uAspect;
      uniform vec2 uPoint;
      uniform vec3 uColor;
      uniform float uRadius;
      void main() {
        vec2 p = vUv - uPoint;
        p.x *= uAspect;
        float s = exp(-dot(p, p) / uRadius);
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + uColor * s, 1.0);
      }
    `;

        const divergenceShader = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform vec2 uTexelSize;
      void main() {
        float L = texture2D(uVelocity, vUv - vec2(uTexelSize.x, 0.0)).x;
        float R = texture2D(uVelocity, vUv + vec2(uTexelSize.x, 0.0)).x;
        float T = texture2D(uVelocity, vUv + vec2(0.0, uTexelSize.y)).y;
        float B = texture2D(uVelocity, vUv - vec2(0.0, uTexelSize.y)).y;
        gl_FragColor = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
      }
    `;

        const pressureShader = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;
      uniform vec2 uTexelSize;
      void main() {
        float L = texture2D(uPressure, vUv - vec2(uTexelSize.x, 0.0)).x;
        float R = texture2D(uPressure, vUv + vec2(uTexelSize.x, 0.0)).x;
        float T = texture2D(uPressure, vUv + vec2(0.0, uTexelSize.y)).x;
        float B = texture2D(uPressure, vUv - vec2(0.0, uTexelSize.y)).x;
        float div = texture2D(uDivergence, vUv).x;
        gl_FragColor = vec4(0.25 * (L + R + T + B - div), 0.0, 0.0, 1.0);
      }
    `;

        const gradientSubtractShader = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;
      uniform vec2 uTexelSize;
      void main() {
        float L = texture2D(uPressure, vUv - vec2(uTexelSize.x, 0.0)).x;
        float R = texture2D(uPressure, vUv + vec2(uTexelSize.x, 0.0)).x;
        float T = texture2D(uPressure, vUv + vec2(0.0, uTexelSize.y)).x;
        float B = texture2D(uPressure, vUv - vec2(0.0, uTexelSize.y)).x;
        vec2 vel = texture2D(uVelocity, vUv).xy;
        gl_FragColor = vec4(vel - 0.5 * vec2(R - L, T - B), 0.0, 1.0);
      }
    `;

        // --- Boilerplate WebGL Helpers ---
        function createShader(type, source) {
            const s = gl.createShader(type);
            gl.shaderSource(s, source);
            gl.compileShader(s);
            return s;
        }
        function createProgram(vsSource, fsSource) {
            const p = gl.createProgram();
            gl.attachShader(p, createShader(gl.VERTEX_SHADER, vsSource));
            gl.attachShader(p, createShader(gl.FRAGMENT_SHADER, fsSource));
            gl.linkProgram(p);
            return p;
        }

        const programs = {
            display: createProgram(baseVertex, displayShader),
            splat: createProgram(baseVertex, splatShader),
            advection: createProgram(baseVertex, advectionShader),
            divergence: createProgram(baseVertex, divergenceShader),
            pressure: createProgram(baseVertex, pressureShader),
            gradientSubtract: createProgram(baseVertex, gradientSubtractShader),
        };

        // --- Framebuffers ---
        function createFBO(w, h) {
            const tex = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

            const fbo = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
            return { fbo, tex, w, h };
        }

        function doubleFBO(w, h) {
            let f1 = createFBO(w, h);
            let f2 = createFBO(w, h);
            return {
                get read() { return f1; },
                get write() { return f2; },
                swap() { [f1, f2] = [f2, f1]; }
            };
        }

        // Grid resolution (Dynamic for performance)
        const isMobile = window.innerWidth < 768;
        let simRes = isMobile ? 64 : 128;
        let dyeRes = isMobile ? 256 : 512;
        let velocity = doubleFBO(simRes, simRes);
        let density = doubleFBO(dyeRes, dyeRes);
        let divergence = createFBO(simRes, simRes);
        let pressure = doubleFBO(simRes, simRes);

        const quadBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

        // --- Simulation Parameters ---
        let lastTime = Date.now();
        let mouse = { x: 0.5, y: 0.5, px: 0.5, py: 0.5, active: false };

        // --- Splatting Logic ---
        const splat = (fbo, x, y, r, g, b, radius) => {
            gl.useProgram(programs.splat);
            gl.uniform1i(gl.getUniformLocation(programs.splat, 'uTarget'), 0);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, fbo.read.tex);
            gl.uniform1f(gl.getUniformLocation(programs.splat, 'uAspect'), canvas.width / canvas.height);
            gl.uniform2f(gl.getUniformLocation(programs.splat, 'uPoint'), x, y);
            gl.uniform3f(gl.getUniformLocation(programs.splat, 'uColor'), r, g, b);
            gl.uniform1f(gl.getUniformLocation(programs.splat, 'uRadius'), radius / 1000.0);

            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.write.fbo);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            fbo.swap();
        };

        // --- Main Rendering Loop ---
        const step = () => {
            if (recruiterMode) {
                requestAnimationFrame(step);
                return;
            }

            const now = Date.now();
            const dt = Math.min((now - lastTime) / 1000, 0.016);
            lastTime = now;

            gl.viewport(0, 0, simRes, simRes);

            // 1. Advect Velocity
            gl.useProgram(programs.advection);
            gl.uniform1f(gl.getUniformLocation(programs.advection, 'uDt'), dt * 0.5);
            gl.uniform2f(gl.getUniformLocation(programs.advection, 'uTexelSize'), 1 / simRes, 1 / simRes);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
            gl.uniform1i(gl.getUniformLocation(programs.advection, 'uVelocity'), 0);
            gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
            gl.uniform1i(gl.getUniformLocation(programs.advection, 'uSource'), 0);
            gl.bindFramebuffer(gl.FRAMEBUFFER, velocity.write.fbo);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            velocity.swap();

            // 2. Splat Interaction
            // Add subtle constant ambient flow
            const time = now * 0.001;
            splat(velocity, 0.5 + Math.cos(time * 0.5) * 0.2, 0.5 + Math.sin(time * 0.3) * 0.2, Math.cos(time) * 0.015, Math.sin(time) * 0.015, 0, 0.2);

            if (mouse.active) {
                let x = mouse.x;
                let y = mouse.y;
                let dx = (mouse.x - mouse.px) * 8.0;
                let dy = (mouse.y - mouse.py) * 8.0;

                splat(velocity, x, y, dx, dy, 0, 0.8);
                splat(density, x, y, 0.15, 0.15, 0.15, 1.5);
            }
            mouse.px = mouse.x; mouse.py = mouse.y;

            // 3. Pressure/Divergence Logic (Simplified Navier-Stokes)
            gl.useProgram(programs.divergence);
            gl.uniform2f(gl.getUniformLocation(programs.divergence, 'uTexelSize'), 1 / simRes, 1 / simRes);
            gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
            gl.bindFramebuffer(gl.FRAMEBUFFER, divergence.fbo);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

            gl.useProgram(programs.pressure);
            gl.uniform2f(gl.getUniformLocation(programs.pressure, 'uTexelSize'), 1 / simRes, 1 / simRes);
            gl.uniform1i(gl.getUniformLocation(programs.pressure, 'uDivergence'), 0);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, divergence.tex);
            for (let i = 0; i < 20; i++) {
                gl.activeTexture(gl.TEXTURE1);
                gl.bindTexture(gl.TEXTURE_2D, pressure.read.tex);
                gl.uniform1i(gl.getUniformLocation(programs.pressure, 'uPressure'), 1);
                gl.bindFramebuffer(gl.FRAMEBUFFER, pressure.write.fbo);
                gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
                pressure.swap();
            }

            gl.useProgram(programs.gradientSubtract);
            gl.uniform2f(gl.getUniformLocation(programs.gradientSubtract, 'uTexelSize'), 1 / simRes, 1 / simRes);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, pressure.read.tex);
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
            gl.bindFramebuffer(gl.FRAMEBUFFER, velocity.write.fbo);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            velocity.swap();

            // 4. Advect Density
            gl.viewport(0, 0, dyeRes, dyeRes);
            gl.useProgram(programs.advection);
            gl.uniform2f(gl.getUniformLocation(programs.advection, 'uTexelSize'), 1 / dyeRes, 1 / dyeRes);
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, density.read.tex);
            gl.uniform1i(gl.getUniformLocation(programs.advection, 'uSource'), 1);
            gl.bindFramebuffer(gl.FRAMEBUFFER, density.write.fbo);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            density.swap();

            // 5. Final Display Render
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.useProgram(programs.display);
            gl.uniform3fv(gl.getUniformLocation(programs.display, 'uColor1'), themeColors.primary);
            gl.uniform3fv(gl.getUniformLocation(programs.display, 'uColor2'), themeColors.secondary);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, density.read.tex);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

            requestAnimationFrame(step);
        };

        // --- Inputs & Resizing ---
        const onResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        const onMouseMove = (e) => {
            mouse.x = e.clientX / canvas.width;
            mouse.y = 1.0 - e.clientY / canvas.height;
            mouse.active = true;
        };

        window.addEventListener('resize', onResize);
        window.addEventListener('mousemove', onMouseMove);
        onResize();
        step();

        return () => {
            window.removeEventListener('resize', onResize);
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, [themeColors, recruiterMode]);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="fixed inset-0 pointer-events-none z-0"
                style={{ opacity: theme === 'light' ? 0.3 : 0.8 }}
            />
            <div className="grain-overlay" />
        </>
    );
};

export default LiquidBackground;
