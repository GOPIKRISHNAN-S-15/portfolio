import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Download, Bot, ShieldCheck, Instagram, Twitter, LayoutGrid } from 'lucide-react';

const Hero3D = ({ personalInfo }) => {
    const containerRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-300, 300], [15, -15]), { stiffness: 100, damping: 30 });
    const rotateY = useSpring(useTransform(x, [-300, 300], [-15, 15]), { stiffness: 100, damping: 30 });

    const handleMouseMove = (e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative min-h-[80vh] flex flex-col items-center justify-center text-center perspective-1000 py-20"
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                className="relative z-10 space-y-8"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    style={{ translateZ: '50px' }}
                >
                    <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-widest text-[#afff00] uppercase bg-lime-500/10 rounded-full border border-lime-500/20 backdrop-blur-sm">
                        System Protocol Active
                    </span>

                    <h1 className="text-7xl lg:text-9xl font-black mb-6 tracking-tighter leading-none">
                        I'm <span className="bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-slow block sm:inline">
                            {personalInfo.name}
                        </span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-xl lg:text-3xl text-slate-400 font-light leading-relaxed tracking-tight" style={{ translateZ: '30px' }}>
                        {personalInfo.role}. Architecting
                        <span className="text-primary-500 font-bold mx-2">intelligent systems</span>
                        and deciphering complex data narratives.
                    </p>
                </motion.div>

                <motion.div
                    className="flex flex-wrap justify-center gap-6"
                    style={{ translateZ: '40px' }}
                >
                    {[
                        { icon: <Github size={24} />, href: personalInfo.github },
                        { icon: <Linkedin size={24} />, href: personalInfo.linkedin },
                        { icon: <Bot size={24} />, href: personalInfo.huggingface }
                    ].map((item, i) => (
                        <motion.a
                            key={i}
                            whileHover={{ scale: 1.2, z: 50 }}
                            href={item.href}
                            className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/50 text-slate-400 hover:text-primary-500 glass-morphism transition-all interactive"
                            target="_blank" rel="noopener noreferrer"
                        >
                            {item.icon}
                        </motion.a>
                    ))}
                </motion.div>
            </motion.div>

            {/* Background Decorative Shapes */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 45, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/10 blur-[100px] rounded-full"
                />
                <motion.div
                    animate={{ y: [0, 20, 0], rotate: [0, -45, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 blur-[120px] rounded-full"
                />
            </div>
        </div>
    );
};

export default Hero3D;
