// src/pages/About.jsx
import React from 'react';
// Import your icons as before
import { FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaPython, FaCube } from 'react-icons/fa';
import { TbBrandBlender } from "react-icons/tb";
import { SiJavascript, SiUnrealengine, SiMongodb, SiExpress, SiMysql } from 'react-icons/si';
import { TbBrandCpp, TbLetterC } from 'react-icons/tb';
import { VscSymbolMisc } from 'react-icons/vsc';
import PixelTransition from '../components/PixelTransition';

// Your skills array remains the same
const skills = [
    { name: 'C', icon: <TbLetterC color="#A8B9CC" /> },
    { name: 'C++', icon: <TbBrandCpp color="#00599C" /> },
    { name: 'Python', icon: <FaPython color="#3776AB" /> },
    { name: 'Machine Learning', icon: <VscSymbolMisc color="#8B5CF6" /> },
    { name: 'SQL', icon: <SiMysql color="#4479A1" /> },
    { name: 'HTML5', icon: <FaHtml5 color="#E34F26" /> },
    { name: 'CSS3', icon: <FaCss3Alt color="#1572B6" /> },
    { name: 'JavaScript', icon: <SiJavascript color="#F7DF1E" /> },
    { name: 'React', icon: <FaReact color="#61DAFB" /> },
    { name: 'Node.js', icon: <FaNodeJs color="#339933" /> },
    { name: 'Express.js', icon: <SiExpress color="#000000" /> },
    { name: 'MongoDB', icon: <SiMongodb color="#47A248" /> },
    { name: 'Spline', icon: <FaCube color="#FF8D00" /> },
    { name: 'Blender', icon: <TbBrandBlender color="#F5792A" /> },
    { name: 'Unreal Engine 5', icon: <SiUnrealengine color="#FFFFFF" /> },
];

function SkillsSection() {
    return (
        <section className="skills-section">
            <h3>My Tech Stack</h3>
            <div className="skills-grid">
                {skills.map((skill) => (
                    <div key={skill.name} className="skill-card">
                        <div className="skill-icon">{skill.icon}</div>
                        <p>{skill.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default function About() {
    const myProfilePic = '/profile.jpg';

    return (
        <div className="section-content-wrapper right-aligned-content">
            <header className="page-header">
                <h2>About Me</h2>
                <p>Discover the story, skills, and passion behind my work.</p>
            </header>

            <div className="about-me-content">
                <div className="about-me-text">
                    <h3>Hello, I'm Saumy Tiwari</h3>
                    <p>
                        From a young age, I've been fascinated by how things work, which led me to the world of web development. I thrive on turning complex problems into beautiful, intuitive, and functional user interfaces.
                    </p>
                    <p>
                        My expertise lies in the React ecosystem, and I'm passionate about building scalable and maintainable applications. This 3D portfolio is a testament to my love for combining technical skills with creative expression.
                    </p>
                </div>
                <div className="profile-pic-container">
                    <PixelTransition
                        firstContent={
                            <img
                                src={myProfilePic}
                                alt="default pixel transition content, a cat!"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        }
                        secondContent={
                            <div
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    display: "grid",
                                    placeItems: "center",
                                    backgroundColor: "#111"
                                }}
                            >
                                <p style={{ fontWeight: 900, fontSize: "3rem", color: "#ffffff" }}>Hii!</p>
                            </div>
                        }
                        gridSize={12}
                        pixelColor='#ffffff'
                        animationStepDuration={0.4}
                        className="custom-pixel-card"
                    />
                </div>
            </div>

            <div className="skills-section-wrapper">
                <SkillsSection />
            </div>
        </div>
    );
}