import React, { useState } from 'react';

// Use a remote Unsplash themed image for pharmacy/health as primary fallback.
// If that also fails, fall back to an inline SVG so there's always something to show.
const DEFAULT_REMOTE = 'https://source.unsplash.com/800x600/?pharmacy,medicine,health';
const INLINE_SVG_PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect fill='#f3f4f6' width='100%' height='100%'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#6b7280' font-family='Arial' font-size='20'>Imagen no disponible</text></svg>`
  );

const ImageWithFallback = ({ src, alt = '', className = '', style = {} }) => {
  // Prefer provided src; otherwise use themed remote image
  const [currentSrc, setCurrentSrc] = useState(src || DEFAULT_REMOTE);
  const [triedRemote, setTriedRemote] = useState(Boolean(src));

  const handleError = () => {
    // If the current source wasn't the themed remote, try it once
    if (!triedRemote && currentSrc !== DEFAULT_REMOTE) {
      setTriedRemote(true);
      setCurrentSrc(DEFAULT_REMOTE);
      return;
    }

    // Otherwise fall back to inline SVG to avoid infinite loops
    if (currentSrc !== INLINE_SVG_PLACEHOLDER) {
      setCurrentSrc(INLINE_SVG_PLACEHOLDER);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      style={style}
      onError={handleError}
      loading="lazy"
    />
  );
};

export default ImageWithFallback;
