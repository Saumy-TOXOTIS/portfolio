import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const socialLinks = [
    { name: 'LinkedIn', icon: <FaLinkedin />, link: 'https://linkedin.com/in/saumy-tiwari-170b33252' },
    { name: 'GitHub', icon: <FaGithub />, link: 'https://github.com/Saumy-TOXOTIS' },
    { name: 'Email', icon: <FaEnvelope />, link: 'mailto:saumytiwari95@gmail.com' }
];

export default function Contact() {
    return (
        <div className="section-content-wrapper pointer-events-none">
            <header className="page-header pointer-events-none">
                <h2 className="fade-in-up">Let's Connect</h2>
                <p className="fade-in-up">I'm always open to new opportunities and collaborations. Find me here:</p>
            </header>

            <main className="pointer-events-none">
                <div className="social-links-container">
                    {socialLinks.map((social) => (
                        <a
                            key={social.name}
                            href={social.link}
                            className="social-icon-link pointer-events-auto"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.name}
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>
            </main>
        </div>
    );
}