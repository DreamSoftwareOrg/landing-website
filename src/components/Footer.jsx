'use client';

import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

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
                        <div className="footer-links" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#aaa', fontSize: '0.9rem' }}>
                            <Phone size={16} />
                            <a href="tel:+9647725924844" target="_blank">
                                <span>+964 772 592 4844</span>
                            </a>,
                            <a href="tel:+9647729416758" target="_blank">
                                <span>+964 772 941 6758</span>
                            </a>
                        </div>
                        <div className="footer-links" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#aaa', fontSize: '0.9rem' }}>
                            <Mail size={16} />
                            <a href="mailto:contact@dreamsoftware.com" target="_blank">
                                <span>contact@dreamsoftware.com</span>
                            </a>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#aaa', fontSize: '0.9rem' }}>
                            <MapPin size={16} />
                            <span>{t('footer.address')}</span>
                        </div>
                    </div>
                </div>

                <div className="footer-links">
                    <Link href="/privacy">{t('footer.privacy')}</Link>
                    <Link href="/terms">{t('footer.terms')}</Link>
                    <a href="https://instagram.com/dreamsoftware" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
                    {/* <a href="https://www.linkedin.com/company/dreamsoftware" target="_blank" rel="noopener noreferrer"><Linkedin size={20} /></a> */}
                </div>
            </div>
        </footer>
    );
}
