'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
    const { t } = useLanguage();
    const [displayText, setDisplayText] = useState('');

    const codeText = `const future = await DreamSoftware.build({
  innovation: true,
  performance: 'max',
  design: 'premium'
});`;

    useEffect(() => {
        let i = 0;
        const type = () => {
            if (i < codeText.length) {
                setDisplayText(prev => prev + codeText.charAt(i));
                i++;
                setTimeout(type, 50);
            }
        };

        // Small delay before typing starts
        const timeout = setTimeout(() => {
            setDisplayText('');
            type();
        }, 500);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <section className="hero">
            <div className="hero-content">
                <h1>
                    <span>{t('hero.title_prefix')}</span><br />
                    <span className="gradient-text">{t('hero.title_span')}</span>
                </h1>

                <p
                    className="hero-sub"
                >
                    {t('hero.subtitle')}
                </p>

                <div
                    className="hero-btns"
                >
                    <a href="#contact" className="btn-primary">{t('hero.cta_primary')}</a>
                    <a href="#work" className="btn-secondary">{t('hero.cta_secondary')}</a>
                </div>
            </div>

            <div
                className="hero-visual"
            >
                <div className="glowing-orb orb-1"></div>
                <div className="glowing-orb orb-2"></div>
                <div className="code-card glass">
                    <div className="code-header">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                    </div>
                    <div className="code-body">
                        <pre><code>{displayText}</code></pre>
                    </div>
                </div>
            </div>
        </section>
    );
}
