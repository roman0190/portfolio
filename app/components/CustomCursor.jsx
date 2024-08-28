// components/CustomCursor.jsx
'use client'
import React, { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const cursorRef = useRef(null);
  const targetPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      targetPosition.current = { x: e.clientX, y: e.clientY };
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const updateCursorPosition = () => {
      if (cursorRef.current) {
        const { x, y } = position;
        const { x: targetX, y: targetY } = targetPosition.current;
        
        setPosition({
          x: x + (targetX - x) * 0.1,
          y: y + (targetY - y) * 0.1
        });
      }
      requestAnimationFrame(updateCursorPosition);
    };

    updateCursorPosition();
  }, [position]);

  useEffect(() => {
    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);

    const clickableElements = document.querySelectorAll('a, button');
    
    clickableElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      clickableElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  if (typeof window === 'undefined') {
    return null; // Ensure this component is only rendered on the client side
  }

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${hovered ? 'hovered' : ''}`}
      style={{
        left: `${position.x-30}px`,
        top: `${position.y+70}px`,
        position: 'fixed',
        pointerEvents: 'none', // Ensure no interference with clicks
      }}
    >
      <span className="click-text">{hovered ? 'click' : ''}</span>
    </div>
  );
};

export default CustomCursor;