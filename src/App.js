import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useTheme } from './context/ThemeContext';
import LiquidBackground from './components/Common/LiquidBackground';
import CustomCursor from './components/Common/CustomCursor';
import Hero3D from './components/Hero/Hero3D';
import ScrollReveal, { TextMask } from './components/Common/ScrollReveal';
import AIAssistant from './components/Smart/AIAssistant';
import SkillCharts from './components/Data/SkillCharts';
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Download,
  Moon,
  Sun,
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
  ShieldCheck,
  Sparkles
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

const SpotlightCard = ({ children, className = "" }) => {
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
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
      if (!magneticRef.current) return;
      const { clientX, clientY } = e;
      const { width, height, left, top } = magneticRef.current.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      magneticRef.current.style.transform = `translate3d(${x * 0.3}px, ${y * 0.3}px, 0)`;
    };

    const handleMouseLeave = () => {
      if (!magneticRef.current) return;
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

const App = () => {
  const { theme, toggleTheme } = useTheme();
  const [viewCount, setViewCount] = useState(0);
  const [recruiterMode, setRecruiterMode] = useState(false);

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
    location: "Namakkal, Tamil Nadu, India",
    github: "https://github.com/GOPIKRISHNAN-S-15",
    linkedin: "https://www.linkedin.com/in/gopi15/",
    kaggle: "https://www.kaggle.com/gopikrishhhh",
    huggingface: "https://huggingface.co/Krishnan15",
    instagram: "https://www.instagram.com/gopi_krishnan_15/",
    twitter: "https://x.com/Gopikrishn1300"
  };

  const sections = [
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'certifications', label: 'Certificates' },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className={`min-h-screen bg-transparent text-slate-900 dark:text-slate-100 font-sans selection:bg-primary-500/30`}>
      <LiquidBackground recruiterMode={recruiterMode} />
      {!recruiterMode && <CustomCursor />}

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
                    className="text-sm font-medium hover:text-primary-500 transition-colors interactive"
                  >
                    {section.label}
                  </a>
                </Magnetic>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setRecruiterMode(!recruiterMode)}
                className={`hidden lg:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border ${recruiterMode
                  ? 'bg-lime-500 text-black border-lime-600 shadow-lg shadow-lime-500/20'
                  : 'bg-slate-100/50 dark:bg-slate-800/50 text-slate-500 border-slate-200 dark:border-slate-700 opacity-60'
                  } interactive`}
              >
                <Sparkles size={14} />
                Recruiter Mode
              </button>

              <div className="flex items-center gap-2 p-1 rounded-full bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700">
                {[
                  { id: 'light', icon: <Sun size={14} />, color: 'text-amber-500' },
                  { id: 'dark', icon: <Moon size={14} />, color: 'text-blue-400' },
                  { id: 'neon', icon: <Bot size={14} />, color: 'text-purple-500' },
                  { id: 'cyber', icon: <ShieldCheck size={14} />, color: 'text-lime-500' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => toggleTheme(t.id)}
                    className={`p-2 rounded-full transition-all ${theme === t.id
                      ? 'bg-white dark:bg-slate-700 shadow-sm scale-110'
                      : 'hover:bg-slate-200 dark:hover:bg-slate-600 opacity-50'
                      } ${t.color}`}
                    title={`${t.id.charAt(0).toUpperCase() + t.id.slice(1)} Mode`}
                  >
                    {t.icon}
                  </button>
                ))}
              </div>

              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                <Eye size={16} className="text-primary-500" />
                <span className="text-xs font-bold font-mono">{viewCount.toLocaleString()}</span>
              </div>

              <Magnetic>
                <a
                  href="/Gopi_Krishnan_Resume.pdf"
                  download
                  className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-primary-500/25 interactive"
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
      <section id="home">
        <Hero3D personalInfo={personalInfo} />
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-40">
        {/* About Section */}
        <ScrollReveal>
          <section id="about">
            <SectionHeading icon={<User size={24} />} fadeIn={fadeIn}>
              <TextMask>Profile</TextMask>
            </SectionHeading>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div {...fadeIn} className="space-y-8">
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                  I am a dedicated <span className="text-primary-500 font-semibold italic">Data Science enthusiast</span> with a deep fascination for AI and Machine Learning.
                  My approach combines analytical rigor with creative problem-solving to build systems that truly matter.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <SpotlightCard className="p-6 rounded-3xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                    <h4 className="text-primary-500 font-bold text-4xl mb-2">8.82</h4>
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Current CGPA</p>
                  </SpotlightCard>
                  <SpotlightCard className="p-6 rounded-3xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                    <h4 className="text-primary-500 font-bold text-4xl mb-2">2x</h4>
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Student of Month</p>
                  </SpotlightCard>
                </div>
              </motion.div>
              <motion.div {...fadeIn} className="relative group cursor-none">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-indigo-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative aspect-video rounded-3xl overflow-hidden glass-morphism flex items-center justify-center border border-white/20">
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="text-center p-8"
                  >
                    <Database size={80} className="mx-auto mb-6 text-primary-500" />
                    <p className="text-lg font-mono text-primary-500 font-bold tracking-tighter uppercase">AI_MODEL_ACTIVE</p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>
        </ScrollReveal>

        {/* Education Section */}
        <ScrollReveal>
          <section id="education">
            <SectionHeading icon={<BookOpen size={24} />} fadeIn={fadeIn}>Learning Timeline</SectionHeading>
            <div className="space-y-12">
              {[
                {
                  title: "B.Tech in Artificial Intelligence & Data Science",
                  org: "M. Kumarasamy College of Engineering",
                  date: "2023 - 2027",
                  details: "Specializing in AI algorithms, Statistical Analysis, and Big Data Engineering."
                },
                {
                  title: "Higher Secondary (CBSE)",
                  org: "Green Park International School",
                  date: "2021 - 2023",
                  details: "Advanced Mathematics and Computer Science foundation."
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
                  <div className="absolute left-[-11px] top-0 w-5 h-5 rounded-full bg-primary-500 border-4 border-white dark:border-slate-950 shadow-lg shadow-primary-500/50" />
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div>
                      <h3 className="text-2xl font-black mb-1">{edu.title}</h3>
                      <p className="text-primary-500 font-bold">{edu.org}</p>
                    </div>
                    <span className="text-sm font-bold px-4 py-1.5 bg-primary-500 text-white rounded-full shadow-lg shadow-primary-500/20">
                      {edu.date}
                    </span>
                  </div>
                  <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed italic">
                    "{edu.details}"
                  </p>
                </motion.div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Skills Section */}
        <ScrollReveal>
          <section id="skills">
            <SectionHeading icon={<Code2 size={24} />} fadeIn={fadeIn}>Expertise Matrix</SectionHeading>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Python", category: "Languages", gradient: 'from-blue-500/10 to-blue-600/10' },
                { name: "Java", category: "Languages", gradient: 'from-orange-500/10 to-red-600/10' },
                { name: "C / C++", category: "Languages", gradient: 'from-indigo-500/10 to-blue-600/10' },
                { name: "SQL", category: "Databases", gradient: 'from-cyan-500/10 to-blue-500/10' },
                { name: "React", category: "Web", gradient: 'from-blue-400/10 to-indigo-500/10' },
                { name: "Power BI", category: "Analytics", gradient: 'from-yellow-400/10 to-amber-500/10' },
                { name: "Pandas", category: "Data", gradient: 'from-purple-500/10 to-pink-600/10' },
                { name: "Scikit-Learn", category: "AI/ML", gradient: 'from-emerald-500/10 to-teal-600/10' },
              ].map((skill, i) => (
                <SpotlightCard key={i}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`p-8 rounded-[2rem] bg-gradient-to-br ${skill.gradient} border border-slate-200 dark:border-slate-800/50 backdrop-blur-sm h-full`}
                  >
                    <span className="text-[10px] font-black text-primary-500 uppercase tracking-widest mb-4 block">
                      {skill.category}
                    </span>
                    <h4 className="text-xl font-black">{skill.name}</h4>
                  </motion.div>
                </SpotlightCard>
              ))}
            </div>

            {/* Extended Data Visuals */}
            <SkillCharts theme={theme} />
          </section>
        </ScrollReveal>

        {/* Projects Section */}
        <ScrollReveal>
          <section id="projects">
            <SectionHeading icon={<Globe size={24} />} fadeIn={fadeIn}>Portfolio Work</SectionHeading>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Wealth Navigator",
                  description: "Built an end-to-end financial dashboard using IBM Cognos for predictive analytics.",
                  tags: ["Cognos", "SQL", "Analytics"],
                  color: "from-blue-500/10 to-indigo-500/10",
                  icon: <BarChart3 size={40} />,
                  github: "https://github.com/GOPIKRISHNAN-S-15/BI-Wealth-Navigator"
                },
                {
                  title: "Web Crawler",
                  description: "Developed a high-performance web crawler in C++ for efficient data collection.",
                  tags: ["C++", "Networking", "Data"],
                  color: "from-emerald-500/10 to-teal-500/10",
                  icon: <Globe size={40} />,
                  github: "https://github.com/GOPIKRISHNAN-S-15/Web-Crawler"
                },
                {
                  title: "Auction System",
                  description: "Implemented a robust auction platform using Java with multi-threading support.",
                  tags: ["Java", "Multi-threading", "SQL"],
                  color: "from-orange-500/10 to-rose-500/10",
                  icon: <LayoutGrid size={40} />,
                  github: "https://github.com/GOPIKRISHNAN-S-15/Auction-management-System"
                }
              ].map((project, i) => (
                <SpotlightCard key={i}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    className={`flex flex-col h-full p-8 rounded-[2.5rem] bg-gradient-to-br ${project.color} border border-white/20 backdrop-blur-xl shadow-xl shadow-slate-200/20 dark:shadow-none`}
                  >
                    <div className="mb-6 p-4 w-fit rounded-2xl bg-white/80 dark:bg-slate-800/80 text-primary-500 shadow-md">
                      {project.icon}
                    </div>
                    <h3 className="text-2xl font-black mb-3">{project.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow leading-relaxed font-medium">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold px-2.5 py-1 bg-white/50 dark:bg-slate-800/50 rounded-lg border border-primary-500/10 uppercase tracking-tighter">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Magnetic>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-black text-primary-500 hover:gap-3 transition-all"
                      >
                        <Github size={18} />
                        Repo
                        <ChevronRight size={16} />
                      </a>
                    </Magnetic>
                  </motion.div>
                </SpotlightCard>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Experience Section */}
        <ScrollReveal>
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
                  desc: "Conducted security audits and implemented penetration testing protocols.",
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
                    className="p-10 rounded-[2.5rem] bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                  >
                    <div>
                      <h3 className="text-3xl font-black tracking-tighter">{intern.role}</h3>
                      <div className="flex items-center gap-3 mt-2">
                        <p className="text-xl font-bold text-slate-500">{intern.company}</p>
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-500/50" />
                        <p className="text-sm font-black text-primary-500 uppercase tracking-widest">{intern.date}</p>
                      </div>
                    </div>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed italic">
                      "{intern.desc}"
                    </p>
                  </motion.div>
                </SpotlightCard>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Certifications Section */}
        <ScrollReveal>
          <section id="certifications" className="pb-20">
            <SectionHeading icon={<Award size={24} />} fadeIn={fadeIn}>Global Validation</SectionHeading>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: "Industrial IoT 4.0", org: "NPTEL Certified", score: "82%" },
                { title: "Ethical Hacking", org: "NPTEL Certified", score: "62%" }
              ].map((cert, i) => (
                <SpotlightCard key={i}>
                  <motion.div {...fadeIn} className="p-10 rounded-[2.5rem] glass-morphism border border-primary-500/30 h-full">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <h3 className="text-2xl font-black mb-1">{cert.title}</h3>
                        <p className="text-primary-500 font-bold uppercase tracking-widest text-xs">{cert.org}</p>
                      </div>
                      <ShieldCheck size={40} className="text-primary-500" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Mastery</span>
                        <span className="text-3xl font-black text-primary-500">{cert.score}</span>
                      </div>
                      <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden border border-white/10 p-1">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: cert.score }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-primary-500 to-indigo-500 rounded-full shadow-lg shadow-primary-500/30"
                        />
                      </div>
                    </div>
                  </motion.div>
                </SpotlightCard>
              ))}
            </div>
          </section>
        </ScrollReveal>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-24 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Magnetic>
            <span className="text-4xl font-black bg-gradient-to-r from-primary-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent tracking-tighter cursor-pointer">
              GS.
            </span>
          </Magnetic>
          <p className="mt-4 text-lg text-slate-500 font-medium font-serif italic">"Building the future, one byte at a time."</p>
          <div className="flex justify-center gap-6 mt-12">
            {[
              { icon: <Github size={20} />, href: personalInfo.github },
              { icon: <Linkedin size={20} />, href: personalInfo.linkedin },
              { icon: <Mail size={20} />, href: `mailto:${personalInfo.email}` }
            ].map((social, i) => (
              <Magnetic key={i}>
                <a
                  href={social.href}
                  target="_blank" rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-primary-500 transition-all"
                >
                  {social.icon}
                </a>
              </Magnetic>
            ))}
          </div>
          <p className="mt-12 text-sm text-slate-400 font-bold uppercase tracking-[0.2em]">© 2026 {personalInfo.name}</p>
        </div>
      </footer>

      {!recruiterMode && <AIAssistant />}
    </div>
  );
};

export default App;
