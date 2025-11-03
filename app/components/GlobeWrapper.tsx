
"use client";

import React, { useRef } from 'react';
import Globe, { GlobeProps, GlobeMethods } from 'react-globe.gl';

interface GlobeWrapperProps extends GlobeProps {
  onRefChange: (ref: GlobeMethods | null) => void;
}

const GlobeWrapper: React.FC<GlobeWrapperProps> = ({ onRefChange, onGlobeReady, ...props }) => {
  const globeInstanceRef = useRef<GlobeMethods>(null);

  // This wrapper combines the logic
  const handleGlobeReady = () => {
    // Pass the ref up to the parent
    if (onRefChange) {
      onRefChange(globeInstanceRef.current);
    }
    // Then call the original onGlobeReady from the parent
    if (onGlobeReady) {
      onGlobeReady();
    }
  };

  return <Globe {...props} ref={globeInstanceRef} onGlobeReady={handleGlobeReady} />;
};

export default GlobeWrapper;
