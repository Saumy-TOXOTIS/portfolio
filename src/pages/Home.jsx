import React from 'react';
import { FaUserAlt, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';
import ShinyText from "../components/ShinyText";
import RotatingText from '../components/RotatingText';

function NavButtons({ scrollToSection }) {
    return (
        <div className="home-nav-buttons">
            <button className="home-nav-button" onClick={() => scrollToSection(1)}>
                <FaUserAlt className="button-icon" />
                <div className="text-slider-container">
                    <span className="text-original">About Me</span>
                    <span className="text-hover">About Me</span>
                </div>
            </button>
            <button className="home-nav-button" onClick={() => scrollToSection(2)}>
                <FaProjectDiagram className="button-icon" />
                <div className="text-slider-container">
                    <span className="text-original">Projects</span>
                    <span className="text-hover">Projects</span>
                </div>
            </button>
            <button className="home-nav-button" onClick={() => scrollToSection(3)}>
                <FaEnvelope className="button-icon" />
                <div className="text-slider-container">
                    <span className="text-original">Contact</span>
                    <span className="text-hover">Contact</span>
                </div>
            </button>
        </div>
    );
}

export default function Home({ scrollToSection }) {
    return (
        <div className="home-content">
            <div className="home-content-block">
                {/* Text elements with pointer-events-none */}
                <div className="intro-text pointer-events-none">
                    <div className="name-intro-line">
                        <h1>Myself,</h1><br></br>
                        <div className="rotating-name-container">
                            <RotatingText
                                texts={['Saumy-Tiwari', 'TOXOTIS']}
                                mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                                staggerFrom={"last"}
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "-120%" }}
                                staggerDuration={0.025}
                                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                                rotationInterval={2000}
                            />
                        </div>
                    </div>
                    <div className="intro-description">
                        <span>A </span> {/* Part 1: Text before */}

                        {/* Part 2: The animated part */}
                        <div className="animated-tagline-container">
                            <ShinyText text="Creative Developer" disabled={false} speed={3} className='custom-class' />
                        </div>

                        {/* Part 3: Text after */}
                        <span> dedicated to transforming complex algorithms into beautiful, pixel-perfect interfaces.</span>
                    </div>
                </div>
                {/* Buttons remain interactive */}
                <div className="pointer-events-auto">
                    <NavButtons scrollToSection={scrollToSection} />
                </div>
            </div>
        </div>
    );
}