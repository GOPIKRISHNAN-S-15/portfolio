import React from 'react';
import { motion } from 'framer-motion';

const Skeleton = ({ className = "" }) => {
    return (
        <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className={`bg-slate-200 dark:bg-slate-800 rounded-2xl ${className}`}
        />
    );
};

export const SectionSkeleton = () => (
    <div className="space-y-8 py-20">
        <div className="flex items-center gap-4">
            <Skeleton className="w-12 h-12 rounded-xl" />
            <Skeleton className="w-48 h-8" />
        </div>
        <div className="grid lg:grid-cols-2 gap-10">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
        </div>
    </div>
);

export default Skeleton;
