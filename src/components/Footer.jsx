'use client';

import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { Twitter, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer>
            <div className="footer-content">
                <div className="footer-brand">
                    <h4>
                        <Link href="/">
                            Dream<span className="accent">Software</span>
                        </Link>
                    </h4>
                    <p>{t('footer.rights')}</p>

                    <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#aaa', fontSize: '0.9rem' }}>
                            <MapPin size={16} />
                            <span>123 Innovation Drive, Tech City, TC 90210</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#aaa', fontSize: '0.9rem' }}>
                            <Phone size={16} />
                            <span>+1 (555) 123-4567</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#aaa', fontSize: '0.9rem' }}>
                            <Mail size={16} />
                            <span>contact@dreamsoftware.com</span>
                        </div>
                    </div>
                </div>

                <div className="footer-links">
                    <Link href="/privacy">{t('footer.privacy')}</Link>
                    <Link href="/terms">{t('footer.terms')}</Link>
                    <a href="#" target="_blank" rel="noopener noreferrer"><Twitter size={20} /></a>
                    <a href="#" target="_blank" rel="noopener noreferrer"><Linkedin size={20} /></a>
                </div>
            </div>
        </footer>
    );
}
