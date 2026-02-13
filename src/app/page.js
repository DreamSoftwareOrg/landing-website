'use client';

import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import WorkCard from '../components/WorkCard';
import ContactForm from '../components/ContactForm';
import ProjectModal from '../components/ProjectModal';
import TiltCard from '../components/TiltCard'; // Adjusted import
import { motion } from 'framer-motion';

export default function Home() {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProject = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const services = [
    { key: 'custom', icon: <i className="fas fa-code"></i> },
    { key: 'mobile', icon: <i className="fas fa-mobile-alt"></i> },
    { key: 'web', icon: <i className="fas fa-layer-group"></i> },
    { key: 'digital', icon: <i className="fas fa-rocket"></i> },
  ];

  const works = [
    { key: 'fintech', gradient: 'gradient-1' },
    { key: 'healthcare', gradient: 'gradient-2' },
    { key: 'ecommerce', gradient: 'gradient-3' },
  ];

  const whyItems = [
    { key: 'fast', icon: <i className="fas fa-bolt"></i> },
    { key: 'secure', icon: <i className="fas fa-shield-alt"></i> },
    { key: 'design', icon: <i className="fas fa-magic"></i> },
    { key: 'scalable', icon: <i className="fas fa-sync"></i> },
  ];

  return (
    <main>
      <Hero />

      <section id="services" className="services">
        <div className="section-header">
          <h2>{t('services.title')}</h2>
          <p>{t('services.subtitle')}</p>
        </div>
        <div className="service-grid">
          {services.map((service, index) => (
            <ServiceCard
              key={service.key}
              icon={service.icon}
              title={t(`services.items.${service.key}.title`)}
              desc={t(`services.items.${service.key}.desc`)}
              delay={index * 0.2}
            />
          ))}
        </div>
      </section>

      <section id="work" className="work">
        <div className="section-header">
          <h2>{t('work.title')}</h2>
          <p>{t('work.subtitle')}</p>
        </div>
        <div className="work-grid">
          {works.map((work, index) => (
            <WorkCard
              key={work.key}
              title={t(`work.items.${work.key}.title`)}
              desc={t(`work.items.${work.key}.desc`)}
              gradientClass={work.gradient}
              onClick={() => openProject({
                title: t(`work.items.${work.key}.title`),
                desc: t(`work.items.${work.key}.desc`),
                gradientClass: work.gradient
              })}
              delay={index * 0.2}
            />
          ))}
        </div>
      </section>

      <section className="why-us">
        <div className="section-header">
          <h2>{t('why.title')}</h2>
          <p>{t('why.subtitle')}</p>
        </div>
        <div className="why-grid">
          {whyItems.map((item, index) => (
            <TiltCard
              key={item.key}
              className="why-card glass"
            >
              <div className="icon-box">{item.icon}</div>
              <h3>{t(`why.items.${item.key}.title`)}</h3>
              <p>{t(`why.items.${item.key}.desc`)}</p>
            </TiltCard>
          ))}
        </div>
      </section>

      <section id="contact" className="footer-cta">
        <h2>{t('cta.title')}</h2>
        <p>{t('cta.subtitle')}</p>
        <ContactForm />
      </section>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />
    </main>
  );
}
