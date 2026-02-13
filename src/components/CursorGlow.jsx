'use client';

import { useEffect, useRef } from 'react';

export default function CursorGlow() {
    const cursorRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        let mouseX = 0;
        let mouseY = 0;
        let glowX = 0;
        let glowY = 0;

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const animate = () => {
            // Smooth interpolation could be added here, but direct tracking is often more responsive for this usage
            glowX = mouseX;
            glowY = mouseY;

            if (cursor) {
                cursor.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
            }

            requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        const animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return <div ref={cursorRef} className="cursor-glow"></div>;
}
