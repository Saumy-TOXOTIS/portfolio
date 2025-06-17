import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

import "./Carousel.css";

const DEFAULT_ITEMS = [
    {
        title: "DSA Graph Visualizer",
        description: "An interactive educational tool for visualizing complex graph algorithms. Build graphs, run 10+ algorithms from Dijkstra's to Bellman-Ford, and see them animate step-by-step. Built with React and Vite.",
        id: 1,
        link: "https://github.com/Saumy-TOXOTIS/dsa-graph-visualiser",
        live_link: "https://dsa-graph-visualiser.onrender.com/",
    },
    {
        title: "C++ Execution Visualizer",
        description: "A Visualization Framework Library that compiles C++ algorithms to WebAssembly and renders their step-by-step execution in a React frontend. Write standard C++ logic and see it come to life in your browser.",
        id: 2,
        link: "https://github.com/Saumy-TOXOTIS/cpp-visualizer",
        live_link: "",
    },
    {
        title: "Train Track Defect Detection",
        description: "A machine learning model designed to improve railway safety by automatically detecting defects on train tracks from image data. Utilizes computer vision techniques to identify cracks and anomalies.",
        id: 3,
        link: "https://github.com/your-username/track-defect-detection",
        live_link: "",
    },
    {
        title: "Handwritten Digit Recognition",
        description: "A machine learning model trained on the MNIST dataset to recognize and classify handwritten digits from 0 to 9. A foundational project demonstrating core concepts of neural networks and computer vision.",
        id: 4,
        link: "https://github.com/Saumy-TOXOTIS/Machine-Learning-Digit-Recognition-Project",
        live_link: "",
    },
    {
        title: "High-Performance BigInt Library",
        description: "A C++ library designed for operations on extremely large numbers (up to 10^13 digits). Features advanced functions like Karatsuba multiplication, Miller-Rabin primality testing, and Pollard-Rho factorization.",
        id: 5,
        link: "https://github.com/Saumy-TOXOTIS/BigInt-Library-Featuring-Large-Number-Operations",
        live_link: "",
    },
    {
        title: "Full-Stack Blogging Platform",
        description: "A complete social blogging platform with user authentication, post management, and real-time chat functionality, enabling seamless interaction and content sharing between users.",
        id: 6,
        link: "https://github.com/Saumy-TOXOTIS/blog-fullstack",
        live_link: "https://blog-fullstack-frontend-uurb.onrender.com/dashboard",
    },
    {
        title: "3D Interactive Portfolio",
        description: "The very website you are on! Built with React, GSAP for animations, and Spline for 3D modeling to create an engaging, scroll-driven user experience.",
        id: 7,
        link: "https://github.com/Saumy-TOXOTIS/portfolio",
        live_link: "",
    },
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

export default function Carousel({
    items = DEFAULT_ITEMS,
    baseWidth = 300,
    autoplay = false,
    autoplayDelay = 3000,
    pauseOnHover = false,
    loop = false,
    round = false,
}) {
    const containerPadding = 16;
    const itemWidth = baseWidth - containerPadding * 2;
    const trackItemOffset = itemWidth + GAP;

    const carouselItems = loop ? [...items, items[0]] : items;
    const [currentIndex, setCurrentIndex] = useState(0);
    const x = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isResetting, setIsResetting] = useState(false);

    const containerRef = useRef(null);
    useEffect(() => {
        if (pauseOnHover && containerRef.current) {
            const container = containerRef.current;
            const handleMouseEnter = () => setIsHovered(true);
            const handleMouseLeave = () => setIsHovered(false);
            container.addEventListener("mouseenter", handleMouseEnter);
            container.addEventListener("mouseleave", handleMouseLeave);
            return () => {
                container.removeEventListener("mouseenter", handleMouseEnter);
                container.removeEventListener("mouseleave", handleMouseLeave);
            };
        }
    }, [pauseOnHover]);

    useEffect(() => {
        if (autoplay && (!pauseOnHover || !isHovered)) {
            const timer = setInterval(() => {
                setCurrentIndex((prev) => {
                    if (prev === items.length - 1 && loop) {
                        return prev + 1;
                    }
                    if (prev === carouselItems.length - 1) {
                        return loop ? 0 : prev;
                    }
                    return prev + 1;
                });
            }, autoplayDelay);
            return () => clearInterval(timer);
        }
    }, [
        autoplay,
        autoplayDelay,
        isHovered,
        loop,
        items.length,
        carouselItems.length,
        pauseOnHover,
    ]);

    const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

    const handleAnimationComplete = () => {
        if (loop && currentIndex === carouselItems.length - 1) {
            setIsResetting(true);
            x.set(0);
            setCurrentIndex(0);
            setTimeout(() => setIsResetting(false), 50);
        }
    };

    const handleDragEnd = (_, info) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;
        if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
            if (loop && currentIndex === items.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else {
                setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
            }
        } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
            if (loop && currentIndex === 0) {
                setCurrentIndex(items.length - 1);
            } else {
                setCurrentIndex((prev) => Math.max(prev - 1, 0));
            }
        }
    };

    const dragProps = loop
        ? {}
        : {
            dragConstraints: {
                left: -trackItemOffset * (carouselItems.length - 1),
                right: 0,
            },
        };

    return (
        <div
            ref={containerRef}
            className={`carousel-container ${round ? "round" : ""}`}
            style={{
                width: `${baseWidth}px`,
                ...(round && { height: `${baseWidth}px`, borderRadius: "50%" }),
            }}
        >
            <motion.div
                className="carousel-track"
                drag="x"
                {...dragProps}
                style={{
                    width: itemWidth,
                    gap: `${GAP}px`,
                    perspective: 1000,
                    perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
                    x,
                }}
                onDragEnd={handleDragEnd}
                animate={{ x: -(currentIndex * trackItemOffset) }}
                transition={effectiveTransition}
                onAnimationComplete={handleAnimationComplete}
            >
                {carouselItems.map((item, index) => {
                    const range = [
                        -(index + 1) * trackItemOffset,
                        -index * trackItemOffset,
                        -(index - 1) * trackItemOffset,
                    ];
                    const outputRange = [90, 0, -90];
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const rotateY = useTransform(x, range, outputRange, { clamp: false });
                    return (
                        <motion.div
                            key={index}
                            className={`carousel-item ${round ? "round" : ""}`}
                            style={{
                                width: itemWidth,
                                height: round ? itemWidth : "100%",
                                rotateY: rotateY,
                                ...(round && { borderRadius: "50%" }),
                            }}
                            transition={effectiveTransition}
                        >
                            <div className={`carousel-item-header ${round ? "round" : ""}`}>
                                <span className="carousel-icon-container">
                                    {item.icon}
                                </span>
                            </div>
                            <div className="carousel-item-content">
                                <div className="carousel-item-title">{item.title}</div>
                                <p className="carousel-item-description">{item.description}</p>
                                <div className='project-links'>
                                    {/* MODIFICATION: GitHub button */}
                                    {item.link && (
                                        <a href={item.link} target="_blank" rel="noopener noreferrer" className='project-button'>
                                            <div className="button-text-slider">
                                                <span className="text-original">Github</span>
                                                <span className="text-hover">GitHub</span>
                                            </div>
                                        </a>
                                    )}

                                    {/* MODIFICATION: Live Demo button */}
                                    {item.live_link && (
                                        <a href={item.live_link} target="_blank" rel="noopener noreferrer" className="project-button live">
                                            <div className="button-text-slider">
                                                <span className="text-original">Live Demo</span>
                                                <span className="text-hover">Live Demo</span>
                                            </div>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
            <div className={`carousel-indicators-container ${round ? "round" : ""}`}>
                <div className="carousel-indicators">
                    {items.map((_, index) => (
                        <motion.div
                            key={index}
                            className={`carousel-indicator ${currentIndex % items.length === index ? "active" : "inactive"
                                }`}
                            animate={{
                                scale: currentIndex % items.length === index ? 1.2 : 1,
                            }}
                            onClick={() => setCurrentIndex(index)}
                            transition={{ duration: 0.15 }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
