'use client';

import ScrollReveal from './ScrollReveal';

export default function ServiceCard({ icon, title, desc, delay = 0 }) {
    return (
        <ScrollReveal
            className="service-card glass"
            delay={delay}
        >
            {icon}
            <h3>{title}</h3>
            <p>{desc}</p>
        </ScrollReveal>
    );
}
