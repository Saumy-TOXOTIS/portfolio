// src/components/SplineBackground.jsx

import Spline from '@splinetool/react-spline';
import React, { useEffect, useRef } from 'react';

export default function SplineBackground({ rotationY, positionX, onReady }) {
    const splineRef = useRef();
    const objectRef = useRef();

    // This effect to hide the Spline logo is fine, leave it as is.
    useEffect(() => {
        const interval = setInterval(() => {
            const splineLogo = document.querySelector('a[href="https://spline.design"]');
            if (splineLogo) {
                splineLogo.style.display = 'none';
                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (objectRef.current) {
            objectRef.current.rotation.y = rotationY;
            objectRef.current.position.x = positionX;
            console.log(`Updated position: x=${positionX}, rotationY=${rotationY}`);
        }
    }, [rotationY, positionX]);

    const handleLoad = (spline) => {
        console.log("Spline scene has loaded.");
        splineRef.current = spline;

        // Log all objects in the scene to see their names
        console.log("Objects available in the scene:", spline.getAllObjects());

        const objectToRotate = spline.findObjectByName('RotationPivot');

        if (objectToRotate) {
            objectRef.current = objectToRotate;
            console.log('✅ Success! Found the Spline object:', objectToRotate.name);
            objectToRotate.position.x = positionX; // Set initial position
            if (onReady) onReady();
        } else {
            // THIS IS THE ERROR YOU ARE SEEING
            console.error('❌ Failed to find "RotationPivot". Check the console log above to see all available object names. Did you remember to click "Update" in the Spline export settings?');
            if (onReady) onReady();
        }
    };

    return (
        <div className="spline-background-fixed">
            <Spline
                scene="https://prod.spline.design/YTty-SKZzSUEurUW/scene.splinecode"
                onLoad={handleLoad}
            />
        </div>
    );
}