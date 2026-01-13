import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

const UltraBackground = () => {
    const canvasRef = useRef(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        const mouse = { x: -1000, y: -1000 };
        const onMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener('mousemove', onMouseMove);

        const particles = [];
        const particleCount = 60;

        const getThemeColors = () => {
            switch (theme) {
                case 'light': return { p: 'rgba(14, 165, 233, 0.2)', l: 'rgba(14, 165, 233, 0.05)' };
                case 'neon': return { p: 'rgba(255, 0, 255, 0.4)', l: 'rgba(0, 255, 255, 0.1)' };
                case 'cyber': return { p: 'rgba(175, 255, 0, 0.4)', l: 'rgba(175, 255, 0, 0.1)' };
                default: return { p: 'rgba(14, 165, 233, 0.4)', l: 'rgba(14, 165, 233, 0.1)' };
            }
        };

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 2 + 0.5,
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const colors = getThemeColors();

            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 200) {
                    const force = (200 - dist) / 200;
                    p.x -= (dx / dist) * force * 1.5;
                    p.y -= (dy / dist) * force * 1.5;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = colors.p;
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx2 = p.x - p2.x;
                    const dy2 = p.y - p2.y;
                    const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                    if (dist2 < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = colors.l;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, [theme]);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Mesh Gradient Layer */}
            <div className={`absolute inset-0 transition-opacity duration-1000 opacity-30 ${theme === 'neon' ? 'bg-[radial-gradient(circle_at_50%_50%,#ff00ff22_0%,#00000000_50%)]' :
                    theme === 'cyber' ? 'bg-[radial-gradient(circle_at_50%_50%,#afff0022_0%,#00000000_50%)]' :
                        'bg-[radial-gradient(circle_at_50%_50%,#0ea5e922_0%,#00000000_50%)]'
                }`} />

            <canvas ref={canvasRef} className="absolute inset-0" />

            {/* Noise/Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay grain-overlay" />
        </div>
    );
};

export default UltraBackground;
