import React from 'react';
import Carousel from '../components/Carousel';

export default function Projects() {
    return (
        <div className="section-content-wrapper left-aligned-content">
            <header className="page-header">
                <h2 className="fade-in-up">My Creations</h2>
                <p className="fade-in-up">A collection of projects where I've turned ideas into reality.</p>
            </header>

            <main>
                <div className="projects-grid">
                    <div style={{ height: '600px', position: 'relative' }}>
                        <Carousel
                            baseWidth={300}
                            autoplay={true}
                            autoplayDelay={3000}
                            pauseOnHover={true}
                            loop={true}
                            round={false}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}