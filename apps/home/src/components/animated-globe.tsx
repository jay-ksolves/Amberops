'use client';

import React from 'react';

export function AnimatedGlobe() {
  return (
    <div
      className="globe-container"
      role="img"
      aria-label="An animated 3D globe showing rotating orbits."
    >
      <div className="globe">
        <div className="globe-sphere" />
        <div className="globe-outer-shadow" />
        <div className="globe-worldmap">
          <div className="globe-worldmap-back" />
          <div className="globe-worldmap-front" />
        </div>
        <div className="globe-inner-shadow" />
        {/* Add orbiting dots */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={`orbit-${i}`} className={`orbit orbit-${i + 1}`}>
            <div className="dot" />
          </div>
        ))}
      </div>
    </div>
  );
}
