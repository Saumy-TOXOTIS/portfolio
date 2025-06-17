import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import SplineBackground from './components/SplineBackground';
import Loader from './components/Loader';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const mainRef = useRef(null);
  const [isSplineReady, setIsSplineReady] = useState(false);
  const RIGHT_POSITION = 500; // The X position on the right (for Home/Projects)
  const LEFT_POSITION = -500; // The X position on the left (for About/Contact)
  const MIDDLE_POSITION = 0;
  const [positionX, setPositionX] = useState(RIGHT_POSITION); // Start on the right for Home section

  const scrollToSection = (index) => {
    gsap.to(window, {
      scrollTo: { y: `#section-${index}`, offsetY: 70 },
      duration: 1.5,
      ease: 'power2.inOut',
    });
  };

  // Initialize animations after Spline is ready
  useEffect(() => {
    if (!isSplineReady) return;

    const sections = gsap.utils.toArray(".section-container");
    const fullRotation = Math.PI / 2; // 90 degrees in radians
    const totalDefinedSections = 3;

    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: mainRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: self => {
          const progress = self.progress;
          const totalSections = sections.length - 1;
          const clampedProgress = Math.min(progress, (totalDefinedSections / totalSections));
          const sectionIndex = Math.floor(clampedProgress * totalSections);
          const sectionProgress = (clampedProgress * totalSections) - sectionIndex;

          // --- 1. ROTATION LOGIC (Clockwise first) ---
          let baseRotation = 0;
          for (let i = 0; i < sectionIndex; i++) {
            // Home->About (i=0) is clockwise (+1)
            // About->Projects (i=1) is anticlockwise (-1)
            const direction = i % 2 === 0 ? 1 : -1;
            baseRotation += direction * fullRotation;
          }
          const currentSectionDirection = sectionIndex % 2 === 0 ? 1 : -1;
          const currentSectionRotation = currentSectionDirection * sectionProgress * fullRotation;
          setRotationY(baseRotation + currentSectionRotation);

          // 2. POSITION LOGIC (Improved)
          let startX, endX;

          if (sectionIndex === 0) {
            // Home -> About
            startX = RIGHT_POSITION;
            endX = LEFT_POSITION;
          } else if (sectionIndex === 1) {
            // About -> Projects
            startX = LEFT_POSITION;
            endX = RIGHT_POSITION;
          } else if (sectionIndex === 2) {
            // Projects -> Contact (The special case)
            startX = RIGHT_POSITION;
            endX = MIDDLE_POSITION;
          } else {
            // ANY section AFTERWARD (i.e., when scrolling within the Contact section)
            // Force the object to stay in the middle.
            startX = MIDDLE_POSITION;
            endX = MIDDLE_POSITION;
          }

          // This one line now correctly handles all cases
          setPositionX(gsap.utils.interpolate(startX, endX, sectionProgress));
        }
      });

      // Section entrance animations (no changes here)
      sections.forEach((section, i) => {
        gsap.fromTo(section,
          { autoAlpha: 0, y: 100 },
          {
            autoAlpha: 1, y: 0, duration: 1,
            scrollTrigger: {
              trigger: section,
              start: "top center+=100",
              toggleActions: "play none none reverse",
              onEnter: () => setActiveIndex(i),
              onEnterBack: () => setActiveIndex(i),
            }
          }
        );
      });
    }, mainRef);

    return () => ctx?.revert();
  }, [isSplineReady]);

  return (
    <>
      {!isSplineReady && <Loader />}
      <SplineBackground
        rotationY={rotationY}
        positionX={positionX}
        onReady={() => setIsSplineReady(true)}
      />

      <div id="main" ref={mainRef} className="vertical">
        <div id="section-0" className="section-container">
          <Home scrollToSection={scrollToSection} />
        </div>
        <div id="section-1" className="section-container" style={{ justifyContent: 'flex-end' }}>
          <About />
        </div>
        <div id="section-2" className="section-container" style={{ justifyContent: 'flex-start' }}>
          <Projects />
        </div>
        <div id="section-3" className="section-container">
          <Contact />
        </div>
      </div>
    </>
  );
}