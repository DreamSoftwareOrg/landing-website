'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Globe, Menu, X } from 'lucide-react';

export default function Navbar() {
    const { t, language, toggleLanguage } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="logo">
                <Link href="/">
                    Dream<span className="accent">Software</span>
                </Link>
            </div>

            <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                <Link href="/#work" onClick={closeMobileMenu}>{t('nav.work')}</Link>
                <Link href="/#services" onClick={closeMobileMenu}>{t('nav.services')}</Link>

                <button
                    onClick={toggleTheme}
                    className="btn-secondary small"
                    style={{ padding: '0.4rem 0.6rem', marginRight: '0.5rem', display: 'inline-flex' }}
                    aria-label="Toggle Theme"
                >
                    {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
                </button>

                <button
                    onClick={toggleLanguage}
                    className="btn-secondary small"
                    style={{ padding: '0.4rem 0.8rem', marginRight: '0.5rem', display: 'inline-flex' }}
                    aria-label="Toggle Language"
                >
                    <Globe size={16} />
                </button>

                <Link href="/#contact" className="btn-primary small" onClick={closeMobileMenu}>
                    {t('nav.quote')}
                </Link>
            </div>

            <div className="menu-toggle" onClick={toggleMobileMenu}>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
        </nav>
    );
}
