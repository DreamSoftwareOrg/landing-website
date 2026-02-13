'use client';

import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function ContactForm() {
    const { t } = useLanguage();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            message: e.target.message.value
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Message sent successfully!');
                e.target.reset();
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to send message.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            alert('An error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
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
