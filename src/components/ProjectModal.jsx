'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';

export default function ProjectModal({ isOpen, onClose, project }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!project) return null;

    return (
        <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <X size={24} />
                </button>
                <div className="modal-body">
                    <div className={`modal-image ${project.gradientClass || ''}`}></div>
                    <div className="modal-text">
                        <div className="modal-tags">
                            <span className="modal-tag">Strategy</span>
                            <span className="modal-tag">Design</span>
                            <span className="modal-tag">Development</span>
                        </div>
                        <h2>{project.title}</h2>
                        <h4>Services Provided</h4>
                        <p>{project.desc}</p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                            ea commodo consequat.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
