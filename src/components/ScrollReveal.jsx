'use client';

import { motion } from 'framer-motion';

export default function ScrollReveal({ children, className, delay = 0, onClick }) {
    return (
        <motion.div
            className={className}
            onClick={onClick}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }} // Matching threshold 0.1 rough equivalent
            transition={{ duration: 0.6, ease: "easeOut", delay }}
        >
            {children}
        </motion.div>
    );
}
