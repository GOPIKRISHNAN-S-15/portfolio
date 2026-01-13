import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  Moon,
  Sun,
  ExternalLink,
  Award,
  BookOpen,
  Briefcase,
  Code2,
  User,
  ChevronRight,
  Database,
  BarChart3,
  Globe,
  Instagram,
  Twitter,
  LayoutGrid,
  Bot,
  Eye,
  ShieldCheck
} from 'lucide-react';

const SectionHeading = ({ children, icon, fadeIn }) => (
  <motion.div
    {...fadeIn}
    className="flex items-center gap-3 mb-12"
  >
    <div className="p-3 rounded-2xl bg-primary-500/10 text-primary-500">
      {icon}
    </div>
    <h2 className="text-3xl font-bold tracking-tight">{children}</h2>
    <div className="h-px flex-1 bg-gradient-to-r from-primary-500/50 to-transparent ml-4" />
  </motion.div>
);

const MouseFollower = () => {
  const followerRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
      }
    };

    const onMouseDown = () => setIsActive(true);
    const onMouseUp = () => setIsActive(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return <div ref={followerRef} className={`mouse-follower ${isActive ? 'active' : ''}`} />;
};

const SpotlightCard = ({ children, className = "" }) => {
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    const { left, top } = containerRef.current.getBoundingClientRect();
    containerRef.current.style.setProperty('--mouse-x', `${e.clientX - left}px`);
    containerRef.current.style.setProperty('--mouse-y', `${e.clientY - top}px`);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`spotlight-card ${className}`}
    >
      {children}
    </div>
  );
};

const Magnetic = ({ children }) => {
  const magneticRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } = magneticRef.current.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      // Interpolate with a smaller factor for subtle effect
      magneticRef.current.style.transform = `translate3d(${x * 0.3}px, ${y * 0.3}px, 0)`;
    };

    const handleMouseLeave = () => {
      magneticRef.current.style.transform = `translate3d(0, 0, 0)`;
    };

    const node = magneticRef.current;
    if (node) {
      node.addEventListener("mousemove", handleMouseMove);
      node.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (node) {
        node.removeEventListener("mousemove", handleMouseMove);
        node.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div ref={magneticRef} className="magnetic-item">
      {children}
    </div>
  );
};

const DynamicMesh = () => {
  const canvasRef = useRef(null);

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

    const mouse = { x: -1000, y: -1000, active: false };
    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    const particles = [];
    const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 10000), 100);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains('dark');
      const particleColor = isDark ? 'rgba(14, 165, 233, 0.4)' : 'rgba(14, 165, 233, 0.2)';
      const lineColor = isDark ? 'rgba(14, 165, 233, 0.1)' : 'rgba(14, 165, 233, 0.05)';

      particles.forEach((p, i) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Mouse avoidance
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (150 - dist) / 150;
            const angle = Math.atan2(dy, dx);
            p.x -= Math.cos(angle) * force * 2;
            p.y -= Math.sin(angle) * force * 2;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        // Connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = lineColor;
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
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const storedViews = localStorage.getItem('portfolio_views');
    const newCount = storedViews ? parseInt(storedViews) + 1 : 1234;
    setViewCount(newCount);
    localStorage.setItem('portfolio_views', newCount.toString());
  }, []);

  const personalInfo = {
    name: "Gopikrishnan S",
    role: "Data Science Student | AI & Data Science",
    email: "gopi15062006@gmail.com",
    phone: "+91 9043603313",
    location: "Namakkal, Tamil Nadu, India",
    github: "https://github.com/GOPIKRISHNAN-S-15",
    linkedin: "https://www.linkedin.com/in/gopi15/",
    kaggle: "https://www.kaggle.com/gopikrishhhh",
    huggingface: "https://huggingface.co/Krishnan15",
    instagram: "https://www.instagram.com/gopi_krishnan_15/",
    twitter: "https://x.com/Gopikrishn1300"
  };

  const sections = [
    { id: 'about', label: 'About', icon: <User size={18} /> },
    { id: 'education', label: 'Education', icon: <BookOpen size={18} /> },
    { id: 'skills', label: 'Skills', icon: <Code2 size={18} /> },
    { id: 'projects', label: 'Projects', icon: <Globe size={18} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={18} /> },
    { id: 'certifications', label: 'Certificates', icon: <Award size={18} /> },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-primary-500/30">
      <DynamicMesh />
      <MouseFollower />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary-500 z-[60] origin-left"
        style={{ scaleX: useSpring(useScroll().scrollProgress, { stiffness: 100, damping: 30 }) }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-morphism border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Magnetic>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl font-bold bg-gradient-to-r from-primary-500 to-indigo-500 bg-clip-text text-transparent cursor-pointer"
              >
                GS.
              </motion.span>
            </Magnetic>

            <div className="hidden md:flex items-center gap-8">
              {sections.map((section) => (
                <Magnetic key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-sm font-medium hover:text-primary-500 transition-colors"
                  >
                    {section.label}
                  </a>
                </Magnetic>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Magnetic>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </Magnetic>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                <Eye size={16} className="text-primary-500" />
                <span className="text-xs font-bold font-mono">{viewCount.toLocaleString()}</span>
              </div>

              <Magnetic>
                <a
                  href="/Gopi_Krishnan_Resume.pdf"
                  download
                  className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-primary-500/25"
                >
                  <Download size={16} />
                  Resume
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary-500/10 blur-[130px] rounded-full animate-float" />
          <div className="absolute bottom-[10%] right-[-5%] w-[55%] h-[55%] bg-purple-500/10 blur-[130px] rounded-full animate-float-delayed" />
          <div className="absolute top-[20%] right-[10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[120px] rounded-full animate-pulse delay-500" />
          <div className="absolute bottom-[-10%] left-[5%] w-[50%] h-[50%] bg-pink-500/10 blur-[120px] rounded-full animate-pulse delay-200" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-primary-500 uppercase bg-primary-500/10 rounded-full border border-primary-500/20">
              Available for Internships
            </span>
            <h1 className="text-6xl lg:text-8xl font-extrabold mb-6 tracking-tight">
              I'm <span className="bg-gradient-to-r from-primary-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">{personalInfo.name}</span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg lg:text-2xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              {personalInfo.role}. Passionate about building <span className="text-primary-500 font-semibold">intelligent systems</span> and extracting insights from complex data.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-shadow">
                <MapPin size={18} className="text-primary-500" />
                <span className="font-medium">{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-shadow">
                <Mail size={18} className="text-primary-500" />
                <span className="font-medium">{personalInfo.email}</span>
              </div>
            </div>

            <div className="mt-16 flex flex-wrap justify-center items-center gap-6">
              {[
                { icon: <Github size={24} />, href: personalInfo.github, color: 'hover:text-black dark:hover:text-white', label: 'GitHub' },
                { icon: <Linkedin size={24} />, href: personalInfo.linkedin, color: 'hover:text-blue-600', label: 'LinkedIn' },
                { icon: <LayoutGrid size={24} />, href: personalInfo.kaggle, color: 'hover:text-blue-400', label: 'Kaggle' },
                { icon: <Bot size={24} />, href: personalInfo.huggingface, color: 'hover:text-yellow-500', label: 'Hugging Face' },
                { icon: <Instagram size={24} />, href: personalInfo.instagram, color: 'hover:text-pink-600', label: 'Instagram' },
                { icon: <Twitter size={24} />, href: personalInfo.twitter, color: 'hover:text-blue-400', label: 'Twitter' }
              ].map((social, i) => (
                <Magnetic key={i}>
                  <motion.a
                    whileHover={{ y: -8, scale: 1.15 }}
                    href={social.href}
                    className={`flex items-center justify-center p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-700 transition-all ${social.color}`}
                    target="_blank" rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                </Magnetic>
              ))}
            </div>
          </motion.div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-40">
        {/* About Section */}
        <section id="about">
          <SectionHeading icon={<User size={24} />} fadeIn={fadeIn}>Profile</SectionHeading>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn} className="space-y-8">
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                I am a dedicated <span className="text-primary-500 font-semibold italic">Data Science enthusiast</span> with a deep fascination for AI and Machine Learning.
                My approach combines analytical rigor with creative problem-solving to build systems that truly matter.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <SpotlightCard className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                  <h4 className="text-primary-500 font-bold text-4xl mb-2">8.82</h4>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Current CGPA</p>
                </SpotlightCard>
                <SpotlightCard className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                  <h4 className="text-primary-500 font-bold text-4xl mb-2">2x</h4>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Student of Month Award</p>
                </SpotlightCard>
              </div>
            </motion.div>
            <motion.div
              {...fadeIn}
              className="relative group cursor-none"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-indigo-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative aspect-video rounded-3xl overflow-hidden glass-morphism flex items-center justify-center border border-white/20">
                <motion.div
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-center p-8"
                >
                  <Database size={80} className="mx-auto mb-6 text-primary-500" />
                  <p className="text-lg font-mono text-primary-500/80 font-bold tracking-tighter">AI_RESEARCH_ACTIVE</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education">
          <SectionHeading icon={<BookOpen size={24} />} fadeIn={fadeIn}>Education</SectionHeading>
          <div className="space-y-12">
            {[
              {
                title: "B.Tech in Artificial Intelligence & Data Science",
                org: "M. Kumarasamy College of Engineering (Anna University)",
                date: "Present",
                details: "Focused on AI fundamentals, Machine Learning, and Big Data Analytics. Maintaining a CGPA of 8.82."
              },
              {
                title: "Higher Secondary (CBSE)",
                org: "Green Park International School",
                date: "Completed",
                details: "Specialized in Computer Science and Mathematics."
              }
            ].map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative pl-12 border-l-2 border-slate-200 dark:border-slate-800 pb-12 last:pb-0"
              >
                <div className="absolute left-[-11px] top-0 w-6 h-6 rounded-full bg-primary-500 border-4 border-white dark:border-slate-950 shadow-lg shadow-primary-500/50" />
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{edu.title}</h3>
                    <p className="text-primary-500 font-bold text-lg">{edu.org}</p>
                  </div>
                  <span className="text-sm font-bold px-4 py-1.5 bg-primary-500 text-white rounded-full shadow-lg shadow-primary-500/20">
                    {edu.date}
                  </span>
                </div>
                <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                  {edu.details}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills">
          <SectionHeading icon={<Code2 size={24} />} fadeIn={fadeIn}>Expertise</SectionHeading>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              { name: "Python", category: "Languages", gradient: 'from-blue-500/20 to-blue-600/20', border: 'hover:border-blue-500/50' },
              { name: "Java", category: "Languages", gradient: 'from-red-500/20 to-orange-600/20', border: 'hover:border-red-500/50' },
              { name: "C / C++", category: "Languages", gradient: 'from-blue-600/20 to-indigo-700/20', border: 'hover:border-blue-600/50' },
              { name: "SQL", category: "Databases", gradient: 'from-cyan-500/20 to-blue-500/20', border: 'hover:border-cyan-500/50' },
              { name: "Power BI", category: "Visualization", gradient: 'from-yellow-400/20 to-amber-600/20', border: 'hover:border-yellow-500/50' },
              { name: "Tableau", category: "Visualization", gradient: 'from-indigo-500/20 to-blue-600/20', border: 'hover:border-indigo-500/50' },
              { name: "Excel", category: "Tools", gradient: 'from-green-500/20 to-emerald-600/20', border: 'hover:border-green-500/50' },
              { name: "Data Structures", category: "Core", gradient: 'from-purple-500/20 to-pink-600/20', border: 'hover:border-purple-500/50' },
            ].map((skill, i) => (
              <SpotlightCard key={i}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className={`p-8 rounded-3xl bg-gradient-to-br ${skill.gradient} border border-slate-200 dark:border-slate-800/50 ${skill.border} transition-all group backdrop-blur-sm h-full`}
                >
                  <div className="text-xs font-black text-primary-500 uppercase tracking-widest mb-4">
                    {skill.category}
                  </div>
                  <h4 className="text-xl font-bold tracking-tight">{skill.name}</h4>
                </motion.div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <SectionHeading icon={<Globe size={24} />} fadeIn={fadeIn}>Portfolio Work</SectionHeading>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Wealth Navigator",
                description: "Built an end-to-end financial dashboard using IBM Cognos for predictive analytics.",
                tags: ["Cognos", "SQL", "Analytics"],
                color: "from-blue-500/20 to-indigo-500/20",
                icon: <BarChart3 size={40} />,
                github: "https://github.com/GOPIKRISHNAN-S-15/BI-Wealth-Navigator"
              },
              {
                title: "Web Crawler",
                description: "Developed a high-performance web crawler in C++ for efficient data collection.",
                tags: ["C++", "Networking", "Data"],
                color: "from-emerald-500/20 to-teal-500/20",
                icon: <Globe size={40} />,
                github: "https://github.com/GOPIKRISHNAN-S-15/Web-Crawler"
              },
              {
                title: "Distributed Auction System",
                description: "Implemented a robust auction platform using Java with multi-threading support.",
                tags: ["Java", "Multi-threading", "SQL"],
                color: "from-orange-500/20 to-rose-500/20",
                icon: <LayoutGrid size={40} />,
                github: "https://github.com/GOPIKRISHNAN-S-15/Auction-management-System"
              }
            ].map((project, i) => (
              <SpotlightCard key={i} className="h-full">
                <motion.div
                  whileHover={{ y: -12 }}
                  className={`flex flex-col h-full p-10 rounded-[2.5rem] bg-gradient-to-br ${project.color} border border-white/20 backdrop-blur-xl shadow-2xl shadow-slate-200/20 dark:shadow-none`}
                >
                  <div className="mb-8 p-5 w-fit rounded-2xl bg-white/80 dark:bg-slate-800/80 text-primary-500 shadow-xl border border-white/20">
                    {project.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight">{project.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-10 flex-grow leading-relaxed font-medium">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-black px-3 py-1 bg-white/40 dark:bg-slate-800/40 text-primary-700 dark:text-primary-300 rounded-lg border border-primary-500/10 uppercase tracking-tighter">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <Magnetic>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-bold text-primary-500 hover:text-primary-600 transition-colors"
                      >
                        <Github size={18} />
                        View on GitHub
                        <ChevronRight size={16} />
                      </a>
                    </Magnetic>
                  </div>
                </motion.div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience">
          <SectionHeading icon={<Briefcase size={24} />} fadeIn={fadeIn}>Industry Journey</SectionHeading>
          <div className="grid gap-8">
            {[
              {
                role: "Data Analyst Intern",
                company: "Unified Mentor",
                desc: "Harnessing statistical models to convert raw data into strategic business intelligence.",
                date: "Nov 2024"
              },
              {
                role: "Ethical Hacking Intern",
                company: "Kaashiv Infotech",
                desc: "Conducted security audits and implemented penetration testing protocols for network resilience.",
                date: "Oct 2024"
              },
              {
                role: "IT Infrastructure Intern",
                company: "TNPL, Karur",
                desc: "Managed large-scale enterprise server systems and optimized digital workflow architectures.",
                date: "Aug 2024"
              }
            ].map((intern, i) => (
              <SpotlightCard key={i}>
                <motion.div
                  {...fadeIn}
                  className="group relative p-10 rounded-[2rem] bg-slate-100/50 dark:bg-slate-800/30 hover:bg-primary-500/5 transition-all duration-500 border border-slate-200 dark:border-slate-800 hover:border-primary-500/20"
                >
                  <div className="flex flex-wrap items-center justify-between gap-6">
                    <div>
                      <h3 className="text-3xl font-black group-hover:text-primary-500 transition-colors tracking-tighter">{intern.role}</h3>
                      <div className="flex items-center gap-3 mt-2">
                        <p className="text-xl font-bold text-slate-500">{intern.company}</p>
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-500/50" />
                        <p className="text-sm font-black text-primary-500/70 uppercase tracking-widest">{intern.date}</p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-8 text-xl text-slate-600 dark:text-slate-400 max-w-4xl leading-relaxed italic">
                    "{intern.desc}"
                  </p>
                </motion.div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications">
          <SectionHeading icon={<Award size={24} />} fadeIn={fadeIn}>Global Validation</SectionHeading>
          <div className="grid md:grid-cols-2 gap-10">
            <SpotlightCard>
              <motion.div
                {...fadeIn}
                className="p-10 rounded-[2.5rem] glass-morphism border border-primary-500/30 shadow-2xl shadow-primary-500/10 h-full"
              >
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-2xl font-black mb-1">Industrial IoT 4.0</h3>
                    <p className="text-primary-500 font-black uppercase tracking-widest">NPTEL | Swayam Certified</p>
                  </div>
                  <ShieldCheck size={40} className="text-primary-500" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-bold text-slate-500">MASTERY LEVEL</span>
                    <span className="text-3xl font-black text-primary-500">82%</span>
                  </div>
                  <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden border border-white/10 p-1">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '82%' }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-primary-500 to-indigo-500 rounded-full shadow-lg shadow-primary-500/30"
                    />
                  </div>
                </div>
              </motion.div>
            </SpotlightCard>

            <SpotlightCard>
              <motion.div
                {...fadeIn}
                className="p-10 rounded-[2.5rem] bg-slate-100/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 h-full"
              >
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-2xl font-black mb-1 text-slate-900 dark:text-white">Ethical Hacking</h3>
                    <p className="text-primary-500 font-black uppercase tracking-widest">NPTEL | Swayam Certified</p>
                  </div>
                  <ShieldCheck size={40} className="text-primary-500" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-bold text-slate-500">MASTERY LEVEL</span>
                    <span className="text-3xl font-black text-primary-500">62%</span>
                  </div>
                  <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden border border-white/10 p-1">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '62%' }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-primary-500 to-indigo-500 rounded-full shadow-lg shadow-primary-500/30"
                    />
                  </div>
                </div>
              </motion.div>
            </SpotlightCard>

            <SpotlightCard className="md:col-span-2">
              <motion.div
                {...fadeIn}
                className="p-10 rounded-[2.5rem] bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 flex flex-col md:flex-row items-center gap-8"
              >
                <div className="p-6 rounded-3xl bg-amber-500 text-white shadow-2xl shadow-amber-500/40">
                  <Award size={64} />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-2 tracking-tight">Double Student of the Month</h3>
                  <p className="text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                    Awarded twice for exceptional academic performance and pioneering contributions to the <span className="text-amber-600 dark:text-amber-400 font-bold">AI & Data Science</span> department.
                  </p>
                </div>
              </motion.div>
            </SpotlightCard>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-24 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-center md:text-left">
              <Magnetic>
                <span className="text-4xl font-black bg-gradient-to-r from-primary-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent tracking-tighter cursor-pointer">
                  GS.
                </span>
              </Magnetic>
              <p className="mt-4 text-lg text-slate-500 font-medium italic">"Building the future, one byte at a time."</p>
              <p className="mt-6 text-sm text-slate-400 font-bold uppercase tracking-[0.2em]">© 2026 {personalInfo.name}</p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6">
              {[
                { icon: <Github size={24} />, href: personalInfo.github },
                { icon: <Linkedin size={24} />, href: personalInfo.linkedin },
                { icon: <LayoutGrid size={24} />, href: personalInfo.kaggle },
                { icon: <Bot size={24} />, href: personalInfo.huggingface },
                { icon: <Instagram size={24} />, href: personalInfo.instagram },
                { icon: <Twitter size={24} />, href: personalInfo.twitter },
                { icon: <Mail size={24} />, href: `mailto:${personalInfo.email}` }
              ].map((social, i) => (
                <Magnetic key={i}>
                  <a
                    href={social.href}
                    className="flex items-center justify-center p-4 rounded-xl text-slate-400 hover:text-primary-500 bg-white dark:bg-slate-800 shadow-lg dark:shadow-none hover:shadow-primary-500/10 transition-all border border-slate-200 dark:border-slate-700 hover:border-primary-500/50"
                    target="_blank" rel="noopener noreferrer"
                  >
                    {social.icon}
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
