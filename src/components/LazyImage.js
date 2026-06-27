import React, { useEffect, useRef, useState } from 'react';

const LazyImage = ({ src, alt, className = '', style = {}, loading = 'lazy', ...props }) => {
  const imgRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    if (img.complete && img.naturalWidth > 0) {
      setIsLoaded(true);
      return;
    }

    const handleLoad = () => setIsLoaded(true);
    img.addEventListener('load', handleLoad);
    return () => img.removeEventListener('load', handleLoad);
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      style={{ ...style }}
      {...props}
    />
  );
};

export default LazyImage;
