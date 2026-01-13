import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { motion } from 'framer-motion';

const SkillCharts = ({ theme }) => {
    const data = [
        { subject: 'Python', A: 95, fullMark: 100 },
        { subject: 'Data Science', A: 90, fullMark: 100 },
        { subject: 'AI/ML', A: 85, fullMark: 100 },
        { subject: 'SQL', A: 80, fullMark: 100 },
        { subject: 'React', A: 75, fullMark: 100 },
        { subject: 'C++', A: 70, fullMark: 100 },
    ];

    const colors = {
        light: '#0ea5e9',
        dark: '#0ea5e9',
        neon: '#ff00ff',
        cyber: '#afff00'
    };

    const activeColor = colors[theme] || colors.dark;

    return (
        <div className="grid lg:grid-cols-2 gap-10 mt-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="glass-morphism p-8 rounded-[2.5rem] h-[400px]"
            >
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                    Proficiency Matrix
                </h3>
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                        <PolarGrid strokeOpacity={0.1} />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: 'currentColor', fontSize: 12, opacity: 0.6 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                            name="Skills"
                            dataKey="A"
                            stroke={activeColor}
                            fill={activeColor}
                            fillOpacity={0.3}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="glass-morphism p-8 rounded-[2.5rem] h-[400px]"
            >
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                    Tech Stack Usage
                </h3>
                <ResponsiveContainer width="100%" height="80%">
                    <BarChart data={data}>
                        <XAxis dataKey="subject" hide />
                        <YAxis hide domain={[0, 100]} />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '12px', color: '#fff' }}
                            itemStyle={{ color: activeColor }}
                        />
                        <Bar dataKey="A" radius={[10, 10, 10, 10]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={activeColor} fillOpacity={0.4 + (index * 0.1)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-3 mt-4">
                    {data.map((s, i) => (
                        <span key={i} className="text-[10px] font-bold px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full opacity-60">
                            {s.subject}
                        </span>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default SkillCharts;
