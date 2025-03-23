"use client";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

// Styled cursor dot
const CursorDot = styled.div`
  position: fixed;
  width: 12px;
  height: 12px;
  background-color: #8888ff;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  left: 0;
  top: 0;
  will-change: transform;
  mix-blend-mode: difference; /* This inverts colors of elements below */
`;

const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  // Track actual and current position separately for interpolation
  const actualPosition = useRef({ x: -100, y: -100 });
  const currentPosition = useRef({ x: -100, y: -100 });
  const requestRef = useRef(null);

  // Animation loop using requestAnimationFrame for smoother movement
  const animateCursor = () => {
    // Interpolation for smooth movement - adjust for desired smoothness
    const easing = 0.15;

    // Calculate distance between actual and current positions
    currentPosition.current.x +=
      (actualPosition.current.x - currentPosition.current.x) * easing;
    currentPosition.current.y +=
      (actualPosition.current.y - currentPosition.current.y) * easing;

    if (cursorDotRef.current) {
      // Apply transform directly to DOM element for better performance
      // Make cursor MUCH larger on hover (3x bigger)
      cursorDotRef.current.style.transform = `translate(calc(${
        currentPosition.current.x
      }px - 50%), calc(${currentPosition.current.y}px - 50%)) scale(${
        clicked ? 0.8 : linkHovered ? 3 : 1
      })`;

      // Change cursor color when hovering over interactive elements
      if (linkHovered) {
        cursorDotRef.current.style.backgroundColor = "#ffffff"; // White for better contrast when inverted
      } else {
        cursorDotRef.current.style.backgroundColor = "#8888ff"; // Default color
      }
    }

    requestRef.current = requestAnimationFrame(animateCursor);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Update the actual position when mouse moves
      actualPosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleLinkHoverIn = () => setLinkHovered(true);
    const handleLinkHoverOut = () => setLinkHovered(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Select all interactive elements that should trigger hover effect
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input[type="button"], input[type="submit"], .interactive'
    );

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleLinkHoverIn);
      element.addEventListener("mouseleave", handleLinkHoverOut);
    });

    // Start animation loop
    requestRef.current = requestAnimationFrame(animateCursor);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);

      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleLinkHoverIn);
        element.removeEventListener("mouseleave", handleLinkHoverOut);
      });

      // Cancel animation loop on cleanup
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  useEffect(() => {
    // Handle dynamically added links after initial render
    const handleLinkHoverIn = () => setLinkHovered(true);
    const handleLinkHoverOut = () => setLinkHovered(false);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          const interactiveElements = document.querySelectorAll(
            'a, button, [role="button"], input[type="button"], input[type="submit"], .interactive'
          );
          interactiveElements.forEach((element) => {
            element.addEventListener("mouseenter", handleLinkHoverIn);
            element.addEventListener("mouseleave", handleLinkHoverOut);
          });
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return <CursorDot ref={cursorDotRef} />;
};

export default CustomCursor;
