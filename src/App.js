import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Globe
} from 'lucide-react';

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const personalInfo = {
    name: "Gopikrishnan S",
    role: "Data Science Student | AI & Data Science",
    email: "gopi15062006@gmail.com",
    phone: "+91 9043603313",
    location: "Namakkal, Tamil Nadu, India",
    github: "https://github.com/GOPIKRISHNAN-S-15",
    linkedin: "https://www.linkedin.com/in/gopi15/",
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

  const SectionHeading = ({ children, icon }) => (
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

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-primary-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-morphism border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold bg-gradient-to-r from-primary-500 to-indigo-500 bg-clip-text text-transparent"
            >
              GS.
            </motion.span>

            <div className="hidden md:flex items-center gap-8">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-sm font-medium hover:text-primary-500 transition-colors"
                >
                  {section.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <a
                href="/Resume.pdf"
                download
                className="hidden sm:flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-primary-500/20"
              >
                <Download size={16} />
                Resume
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-primary-500 uppercase bg-primary-500/10 rounded-full">
              Available for Internships
            </span>
            <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight">
              I'm <span className="bg-gradient-to-r from-primary-500 to-indigo-500 bg-clip-text text-transparent">{personalInfo.name}</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg lg:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              {personalInfo.role}. Passionate about building intelligent systems and extracting insights from complex data.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 px-4 py-2 rounded-full">
                <MapPin size={16} />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 px-4 py-2 rounded-full">
                <Mail size={16} />
                <span>{personalInfo.email}</span>
              </div>
            </div>

            <div className="mt-12 flex justify-center gap-6">
              <motion.a
                whileHover={{ y: -5 }}
                href={personalInfo.github}
                className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:text-primary-500 transition-colors"
                target="_blank" rel="noopener noreferrer"
              >
                <Github size={24} />
              </motion.a>
              <motion.a
                whileHover={{ y: -5 }}
                href={personalInfo.linkedin}
                className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:text-primary-500 transition-colors"
                target="_blank" rel="noopener noreferrer"
              >
                <Linkedin size={24} />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-32">
        {/* About Section */}
        <section id="about">
          <SectionHeading icon={<User size={24} />}>Profile</SectionHeading>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeIn} className="space-y-6">
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                I am a dedicated Data Science student with a strong foundation in AI and machine learning.
                My journey in technology is driven by a curiosity to solve real-world problems through data-driven insights.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/50">
                  <h4 className="text-primary-500 font-bold text-2xl mb-1">8.82</h4>
                  <p className="text-sm text-slate-500">Current CGPA</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/50">
                  <h4 className="text-primary-500 font-bold text-2xl mb-1">2x</h4>
                  <p className="text-sm text-slate-500">Student of the Month</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              {...fadeIn}
              className="relative aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-primary-500/20 to-indigo-500/20 flex items-center justify-center border border-primary-500/10"
            >
              <div className="text-center p-8">
                <Database size={64} className="mx-auto mb-4 text-primary-500 opacity-50" />
                <p className="text-sm font-mono text-primary-500/70">Building Intelligent Data Pipelines</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education">
          <SectionHeading icon={<BookOpen size={24} />}>Education</SectionHeading>
          <div className="space-y-8">
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
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800 pb-8 last:pb-0"
              >
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary-500" />
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div>
                    <h3 className="text-xl font-bold">{edu.title}</h3>
                    <p className="text-primary-500 font-medium">{edu.org}</p>
                  </div>
                  <span className="text-sm font-semibold px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">
                    {edu.date}
                  </span>
                </div>
                <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-3xl">
                  {edu.details}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills">
          <SectionHeading icon={<Code2 size={24} />}>Technical Skills</SectionHeading>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "Python", category: "Languages" },
              { name: "Java", category: "Languages" },
              { name: "C / C++", category: "Languages" },
              { name: "SQL", category: "Databases" },
              { name: "Power BI", category: "Visualization" },
              { name: "Tableau", category: "Visualization" },
              { name: "Excel", category: "Tools" },
              { name: "Data Structures", category: "Computer Science" },
            ].map((skill, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-transparent hover:border-primary-500/30 transition-all group"
              >
                <div className="text-xs font-bold text-primary-500 uppercase tracking-wider mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {skill.category}
                </div>
                <h4 className="text-lg font-bold">{skill.name}</h4>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <SectionHeading icon={<Globe size={24} />}>Featured Projects</SectionHeading>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Wealth Navigator",
                description: "IBM Cognos based financial analytics tool providing deep insights into investment patterns and wealth management.",
                tags: ["Cognos", "FinTech", "Analytics"]
              },
              {
                title: "Web Crawler",
                description: "A efficient web crawler implementation using advanced C Data Structures for high-speed indexing.",
                tags: ["C", "Algorithms", "Networking"]
              },
              {
                title: "Auction Management",
                description: "Robust backend system for managing real-time auctions with secure transaction handling in Java.",
                tags: ["Java", "OOP", "Systems"]
              }
            ].map((project, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="flex flex-col h-full p-8 rounded-3xl bg-slate-100 dark:bg-slate-800/50 border border-white/10"
              >
                <div className="mb-6 p-4 w-fit rounded-2xl bg-primary-500/10 text-primary-500">
                  <BarChart3 size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8 flex-grow leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-semibold px-2.5 py-1 bg-primary-500/10 text-primary-500 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Internships Section */}
        <section id="experience">
          <SectionHeading icon={<Briefcase size={24} />}>Experience</SectionHeading>
          <div className="space-y-12">
            {[
              {
                role: "Data Analyst Intern",
                company: "Unified Mentor",
                desc: "Working on real-world datasets to identify patterns and generate actionable business insights."
              },
              {
                role: "Ethical Hacking Intern",
                company: "Kaashiv Infotech",
                desc: "Explored cybersecurity fundamentals and practical network security assessments."
              },
              {
                role: "IT Intern",
                company: "TNPL, Karur",
                desc: "Gained exposure to industrial IT infrastructure and digital transformation workflows."
              }
            ].map((intern, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                className="group relative p-8 rounded-3xl bg-slate-100 dark:bg-slate-800/50 hover:bg-primary-500/5 transition-colors border border-transparent hover:border-primary-500/10"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold group-hover:text-primary-500 transition-colors">{intern.role}</h3>
                    <p className="text-lg font-medium text-slate-500">{intern.company}</p>
                  </div>
                  <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity text-primary-500" />
                </div>
                <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl">
                  {intern.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications">
          <SectionHeading icon={<Award size={24} />}>Certifications</SectionHeading>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              {...fadeIn}
              className="p-8 rounded-3xl glass-morphism border border-primary-500/20"
            >
              <h3 className="text-xl font-bold mb-2">Introduction to Industrial IoT 4.0</h3>
              <p className="text-primary-500 font-medium mb-4">NPTEL (Swayam)</p>
              <div className="flex items-center gap-4">
                <div className="h-2 flex-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-500 w-[82%]" />
                </div>
                <span className="font-bold">82%</span>
              </div>
            </motion.div>

            <motion.div
              {...fadeIn}
              className="p-8 rounded-3xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800"
            >
              <div className="flex items-center gap-4 text-amber-500 mb-4">
                <Award size={32} />
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Student of the Month</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Awarded twice for exceptional academic performance and contribution to the AI & Data Science department.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-indigo-500 bg-clip-text text-transparent">
              GS.
            </span>
            <p className="mt-2 text-sm text-slate-500">© 2026 {personalInfo.name}. All rights reserved.</p>
          </div>

          <div className="flex gap-6">
            <a href={personalInfo.github} className="text-slate-500 hover:text-primary-500 transition-colors">
              <Github size={20} />
            </a>
            <a href={personalInfo.linkedin} className="text-slate-500 hover:text-primary-500 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href={`mailto:${personalInfo.email}`} className="text-slate-500 hover:text-primary-500 transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
