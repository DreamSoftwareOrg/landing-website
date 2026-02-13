'use client';

import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function ContactForm() {
    const { t } = useLanguage();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Placeholder for actual submission logic
        // In a real Next.js app, this would likely hit an API route

        // Simulating delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        alert('Message sent successfully! (Simulation)');
        e.target.reset();
        setIsSubmitting(false);
    };

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="text"
                    name="name"
                    placeholder={t('contact.name')}
                    className="form-input"
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="email"
                    name="email"
                    placeholder={t('contact.email')}
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <input
                    type="tel"
                    name="phone"
                    placeholder={t('contact.phone')}
                    className="form-input"
                    required
                />
            </div>
            <div className="form-group">
                <textarea
                    name="message"
                    placeholder={t('contact.message')}
                    className="form-input"
                    rows="4"
                ></textarea>
            </div>
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
                {isSubmitting ? t('contact.sending') : t('cta.button')}
            </button>
        </form>
    );
}
