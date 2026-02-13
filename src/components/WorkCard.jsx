'use client';

import ScrollReveal from './ScrollReveal';

export default function WorkCard({ title, desc, gradientClass, onClick, delay = 0 }) {
    return (
        <ScrollReveal
            className="work-card"
            onClick={onClick}
            delay={delay}
        >
            <div className={`work-image ${gradientClass}`}></div>
            <div className="work-info glass">
                <h3>{title}</h3>
                <p>{desc}</p>
            </div>
        </ScrollReveal>
    );
}
