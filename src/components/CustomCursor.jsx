// src/components/CustomCursor.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './CustomCursor.css';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorVariant, setCursorVariant] = useState('default');

    // Return null on touch devices, as a custom cursor is not needed
    useEffect(() => {
        if (typeof window !== 'undefined' && 'ontouchstart' in window) {
            return;
        }

        const mouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            // Check if the target is an interactive element
            const target = e.target;
            if (target.closest('a, button, .cursor-hover-target')) {
                setCursorVariant('hover');
            } else {
                setCursorVariant('default');
            }
        };

        window.addEventListener('mousemove', mouseMove);
        return () => {
            window.removeEventListener('mousemove', mouseMove);
        };
    }, []);

    // Return null if it's a touch device
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
      return null;
    }

    const variants = {
        default: {
            x: mousePosition.x - 8, // Center the dot
            y: mousePosition.y - 8,
            scale: 1,
            backgroundColor: '#ff9900',
            mixBlendMode: 'normal',
        },
        hover: {
            x: mousePosition.x - 24, // Center the larger circle
            y: mousePosition.y - 24,
            scale: 1,
            height: 48,
            width: 48,
            backgroundColor: '#ff9900',
            mixBlendMode: 'difference',
        },
    };

    const spring = {
        type: "spring",
        stiffness: 500,
        damping: 28,
    };

    return (
        <>
            {/* The outer ring with the springy delay */}
            <motion.div
                className="cursor-outline"
                variants={variants}
                animate={cursorVariant}
                transition={spring}
            />
            {/* The inner dot that is always precise */}
            <motion.div
                className="cursor-dot"
                style={{
                    x: mousePosition.x,
                    y: mousePosition.y,
                }}
            />
        </>
    );
}