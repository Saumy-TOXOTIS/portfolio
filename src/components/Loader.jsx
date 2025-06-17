// src/components/Loader.jsx

import React from 'react';

export default function Loader() {
    return (
        <div className="loader-container">
            <div className="loader-content">
                <div className="spinner"></div>
                <h1>Initializing 3D Experience...</h1>
                <p>Please wait, awesome things are loading!</p>
            </div>
        </div>
    );
}