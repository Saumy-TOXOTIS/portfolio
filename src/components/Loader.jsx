// src/components/Loader.jsx
import React from 'react';

export default function Loader() {
    return (
        <div className="loader-container">
            <div className="loader-grid">
                {[...Array(16)].map((_, i) => (
                    <div key={i} className="grid-cell" style={{ '--delay': i * 0.05 }}></div>
                ))}
            </div>
            <div className="loader-text">
                <span className="loader-title">LOADING</span>
                <span className="loader-subtitle">Initializing 3D Experience</span>
            </div>
            <div className="scanline"></div>
        </div>
    );
}