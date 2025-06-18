import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const socialLinks = [
    { name: 'LinkedIn', icon: <FaLinkedin />, link: 'https://linkedin.com/in/saumy-tiwari-170b33252' },
    { name: 'GitHub', icon: <FaGithub />, link: 'https://github.com/Saumy-TOXOTIS' },
    { name: 'Email', icon: <FaEnvelope />, link: 'mailto:saumytiwari95@gmail.com' }
];

// A reusable "magnetic" input field component
const MagneticInput = ({ children }) => {
    const ref = React.useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x, { stiffness: 300, damping: 20 });
    const ySpring = useSpring(y, { stiffness: 300, damping: 20 });
    const transform = useTransform([xSpring, ySpring], ([latestX, latestY]) => `translate(${latestX}px, ${latestY}px)`);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const xPos = clientX - (left + width / 2);
        const yPos = clientY - (top + height / 2);
        x.set(xPos * 0.1); // Reduce the effect for subtlety
        y.set(yPos * 0.1);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform }}
            className="form-group"
        >
            {children}
        </motion.div>
    );
};

export default function Contact() {
    const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        access_key: WEB3FORMS_ACCESS_KEY,
    });

    const [status, setStatus] = useState({
        state: 'idle', // 'idle', 'sending', 'success', 'error'
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ state: 'sending', message: '' });

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await res.json();
            if (result.success) {
                setStatus({ state: 'success', message: 'Message sent! I\'ll get back to you soon.' });
                setFormData({ ...formData, name: '', email: '', message: '' });
                setTimeout(() => setStatus({ state: 'idle', message: '' }), 4000);
            } else {
                setStatus({ state: 'error', message: 'Something went wrong. Please try again.' });
            }
        } catch (error) {
            setStatus({ state: 'error', message: 'An error occurred. Please check your connection.' });
        }
    };

    const getButtonContent = () => {
        switch (status.state) {
            case 'sending':
                return <><CgSpinner className="animate-spin" /> Sending...</>;
            case 'success':
                return <><FaCheckCircle /> Sent!</>;
            case 'error':
                return <><FaExclamationCircle /> Try Again</>;
            default:
                return <><FaPaperPlane /> Send Message</>;
        }
    };

    return (
        <div className="section-content-wrapper pointer-events-none">
            <header className="page-header pointer-events-none">
                <h2 className="fade-in-up">Let's Connect</h2>
                <p className="fade-in-up">Have a project in mind, a question, or just want to connect? Drop me a message.</p>
            </header>

            <main className="contact-form-container">
                <form onSubmit={handleSubmit} className="contact-form">
                    <MagneticInput>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-input"
                            required
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <label htmlFor="name" className="form-label">What should I call you?</label>
                    </MagneticInput>

                    <MagneticInput>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-input"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <label htmlFor="email" className="form-label">Where can I reach you?</label>
                    </MagneticInput>

                    <MagneticInput>
                        <textarea
                            id="message"
                            name="message"
                            className="form-input"
                            rows="5"
                            required
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                        <label htmlFor="message" className="form-label">Your brilliant idea starts here...</label>
                    </MagneticInput>

                    <motion.button
                        type="submit"
                        className={`submit-button state-${status.state}`}
                        disabled={status.state === 'sending'}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {getButtonContent()}
                    </motion.button>
                </form>
                {status.message && (
                    <p className={`status-message state-${status.state}`}>
                        {status.message}
                    </p>
                )}
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