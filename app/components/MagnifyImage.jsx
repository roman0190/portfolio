"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const MagnifyImage = ({ src, alt, sizes }) => {
  const [magnify, setMagnify] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef(null);
  const magnificationLevel = 1.8; // How much to magnify the image

  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;

    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setPosition({ x, y });
  };

  return (
    <div
      ref={imageContainerRef}
      className="relative w-full h-full rounded-full overflow-hidden cursor-pointer select-none"
      onMouseEnter={() => setMagnify(true)}
      onMouseLeave={() => setMagnify(false)}
      onMouseMove={handleMouseMove}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-200"
        style={{
          transformOrigin: `${position.x}% ${position.y}%`,
          transform: magnify ? `scale(${magnificationLevel})` : "scale(1)",
        }}
        priority
      />
    </div>
  );
};

export default MagnifyImage;
