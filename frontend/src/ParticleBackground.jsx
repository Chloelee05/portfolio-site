import React, { useCallback, useMemo, useRef, useEffect } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const particleOptions = {
  fullScreen: { enable: true, zIndex: -1 },
  background: { color: { value: '#FFD1DC' } },
  particles: {
    number: { value: 200, density: { enable: true, area: 1200 } },
    color: { value: '#ffffff' },
    shape: { type: 'circle' },
    opacity: { value: 0.6, random: { enable: true, minimumValue: 0.3 }, animation: { enable: true, speed: 0.5, minimumValue: 0.3, sync: false } },
    size: { value: { min: 1, max: 3 }, random: true, animation: { enable: true, speed: 3, minimumValue: 1, sync: false } },
    move: { enable: true, speed: 0.8, direction: 'none', outModes: { default: 'bounce' } },
    links: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 }
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: 'connect' },
      onClick: { enable: false }
    },
    modes: {
      connect: { distance: 200, links: { opacity: 0.6, width: 1 } }
    }
  },
  detectRetina: true
};

export default function ParticleBackground() {
  const containerRef = useRef(null);
  const particlesContainer = useRef(null);

  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(container => {
    particlesContainer.current = container;
  }, []);

  const options = useMemo(() => particleOptions, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !particlesContainer.current) return;

    let fadeInterval;
    const handleMouseLeave = () => {
      let opacity = options.interactivity.modes.connect.links.opacity;
      clearInterval(fadeInterval);
      fadeInterval = setInterval(() => {
        opacity = Math.max(0, opacity - 0.05);
        particlesContainer.current.options.interactivity.modes.connect.links.opacity = opacity;
        if (opacity <= 0) {
          clearInterval(fadeInterval);
          particlesContainer.current.refresh();      // ← now only fires once at the end
        }
      }, 100);
    };

    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mouseleave', handleMouseLeave);
      clearInterval(fadeInterval);
    };
  }, [options]);

  return (
    <div ref={containerRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',  }}>
      <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={options} />
    </div>
  );
}