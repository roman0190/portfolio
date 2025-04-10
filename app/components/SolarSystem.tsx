"use client";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { useTheme } from "../contexts/ThemeContext";

const SolarSystem = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const targetZoomRef = useRef(50); // Target zoom level for smooth interpolation
  const lastTimeRef = useRef(0); // Track the last frame time for smooth animation
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const { theme } = useTheme();

  // For performance optimization
  const [isVisible, setIsVisible] = useState(true);

  // Create refs for each planet's angle
  const planetAnglesRef = useRef<Map<string, number>>(new Map());

  // Check if component is in viewport
  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (mountRef.current) {
      observer.observe(mountRef.current);
    }

    return () => {
      if (mountRef.current) observer.unobserve(mountRef.current);
    };
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    // 🔹 Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Use a higher pixel ratio for better quality, but cap it for performance
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    rendererRef.current = renderer;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(pixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // 🔥 Load Textures using TextureLoader with better memory management
    const textureLoader = new THREE.TextureLoader();

    // Set texture loading options for performance
    textureLoader.setCrossOrigin("anonymous");

    // Load the Sun Texture
    const sunTexture = textureLoader.load("./textures/sun.jpg");
    sunTexture.generateMipmaps = false;
    sunTexture.minFilter = THREE.LinearFilter;

    // 🌍 Planets Data (with texture file paths) - Optimized for performance
    const planets = [
      {
        name: "Mercury",
        size: 0.4,
        distance: 5,
        texture: "./textures/mercury.jpg",
        speed: 0.0001, // Slow down for better visualization
        moons: [],
      },
      {
        name: "Venus",
        size: 0.6,
        distance: 8,
        texture: "./textures/venus.jpg",
        speed: 0.00008, // Slow down
        moons: [],
      },
      {
        name: "Earth",
        size: 0.8,
        distance: 11,
        texture: "./textures/earth.jpg",
        speed: 0.00015, // Slow down
        moons: [{ size: 0.2, distance: 1.5, speed: 0.0002 }],
      },
      {
        name: "Mars",
        size: 0.6,
        distance: 15,
        texture: "./textures/mars.jpg",
        speed: 0.001, // Slow down
        moons: [{ size: 0.15, distance: 1, speed: 0.002 }],
      },
      {
        name: "Jupiter",
        size: 1.5,
        distance: 20,
        texture: "./textures/jupiter.jpg",
        speed: 0.0012, // Slow down
        moons: [{ size: 0.3, distance: 2, speed: 0.003 }],
      },
      {
        name: "Saturn",
        size: 1.3,
        distance: 25,
        texture: "./textures/saturn.jpg",
        speed: 0.0014, // Slow down
        moons: [{ size: 0.25, distance: 1.8, speed: 0.003 }],
      },
      {
        name: "Uranus",
        size: 1.1,
        distance: 30,
        texture: "./textures/uranus.jpg",
        speed: 0.001, // Slow down
        moons: [],
      },
      {
        name: "Neptune",
        size: 1.0,
        distance: 35,
        texture: "./textures/neptune.jpg",
        speed: 0.0011, // Slow down
        moons: [{ size: 0.2, distance: 1.5, speed: 0.003 }],
      },
    ];

    const planetMeshes: THREE.Mesh[] = [];
    const moonMeshes: { [key: string]: THREE.Mesh[] } = {};

    // Create low-poly geometry for better performance
    const lowPolyPlanetGeometry = new THREE.SphereGeometry(1, 16, 16); // Lower segment count
    const lowPolyMoonGeometry = new THREE.SphereGeometry(1, 12, 12);

    planets.forEach((planet) => {
      // 🔹 Planet Mesh with texture - Use lower poly geometry
      const planetTexture = textureLoader.load(planet.texture);
      planetTexture.generateMipmaps = false;
      planetTexture.minFilter = THREE.LinearFilter;

      const planetMaterial = new THREE.MeshBasicMaterial({
        map: planetTexture,
      });

      // Reuse the geometry for better performance
      const mesh = new THREE.Mesh(
        lowPolyPlanetGeometry
          .clone()
          .scale(planet.size, planet.size, planet.size),
        planetMaterial
      );
      scene.add(mesh);
      planetMeshes.push(mesh);

      // 🔹 Moons (with texture, similar approach) - Use lower poly geometry
      moonMeshes[planet.name] = [];
      planet.moons.forEach((moon) => {
        const moonTexture = textureLoader.load("./textures/moon.jpg");
        moonTexture.generateMipmaps = false;
        moonTexture.minFilter = THREE.LinearFilter;

        const moonMaterial = new THREE.MeshBasicMaterial({ map: moonTexture });
        const moonMesh = new THREE.Mesh(
          lowPolyMoonGeometry.clone().scale(moon.size, moon.size, moon.size),
          moonMaterial
        );
        scene.add(moonMesh);
        moonMeshes[planet.name].push(moonMesh);
      });

      // 🔄 Orbit Path (Visible) - Use less segments for better performance
      const orbitGeometry = new THREE.RingGeometry(
        planet.distance - 0.1,
        planet.distance + 0.1,
        32
      );
      const orbitMaterial = new THREE.MeshBasicMaterial({
        color: theme === "dark" ? 0x444444 : 0xaaaaaa,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.3,
      });
      const orbitMesh = new THREE.Mesh(orbitGeometry, orbitMaterial);
      orbitMesh.rotation.x = Math.PI / 2; // Make it flat
      scene.add(orbitMesh);

      // Initialize the planet's angle
      planetAnglesRef.current.set(planet.name, 0);
    });

    // 🔹 Sun with texture
    const sunGeometry = new THREE.SphereGeometry(2, 24, 24); // Slightly lower poly
    const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Add glow effect using a point light - adjust based on theme
    const sunGlow = new THREE.PointLight(
      theme === "dark" ? 0xffaa00 : 0xffff00,
      2,
      50
    );
    sunGlow.position.set(0, 0, 0);
    scene.add(sunGlow);

    // 🔹 Camera Setup
    camera.position.set(0, 4, 0);

    // Smoothly interpolate zoom based on scroll
    const handleScroll = () => {
      const scrollFactor = window.scrollY / window.innerHeight;
      targetZoomRef.current = 50 - scrollFactor * 5; // Adjust zoom level (50 is default, 40 is max zoom range)
    };

    window.addEventListener("scroll", handleScroll);

    // Handle resize for responsive design
    const handleResize = () => {
      if (!rendererRef.current) return;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // 🔄 Animation Function with performance optimization
    function animate(time: number) {
      if (!isVisible) return; // Don't animate when not visible

      requestAnimationFrame(animate);

      // Calculate time difference for smooth animation
      const deltaTime = Math.min(time - lastTimeRef.current, 100); // Cap for performance
      lastTimeRef.current = time;

      // ☀ Sun Rotating
      sun.rotation.y += 0.0002 * deltaTime;

      // 🔄 Planets Orbiting Sun - only animate visible objects
      planets.forEach((planet, index) => {
        const mesh = planetMeshes[index];
        const angle = planetAnglesRef.current.get(planet.name)!;
        const updatedAngle = angle + planet.speed * deltaTime; // Update each planet's angle separately

        // Update the planet's angle reference
        planetAnglesRef.current.set(planet.name, updatedAngle);

        mesh.position.x = Math.cos(updatedAngle) * planet.distance;
        mesh.position.z = Math.sin(updatedAngle) * planet.distance;
        mesh.rotation.y += 0.002 * deltaTime; // Planet Rotation

        // 🌑 Moons Orbiting Planet
        moonMeshes[planet.name].forEach((moonMesh, moonIndex) => {
          const moonData = planet.moons[moonIndex];
          const moonAngle = updatedAngle * moonData.speed * deltaTime;
          moonMesh.position.x =
            mesh.position.x + Math.cos(moonAngle) * moonData.distance;
          moonMesh.position.z =
            mesh.position.z + Math.sin(moonAngle) * moonData.distance;
        });
      });

      // Smoothly interpolate zoom based on scroll
      camera.position.z += (targetZoomRef.current - camera.position.z) * 0.05; // Smooth interpolation

      renderer.render(scene, camera);
    }

    requestAnimationFrame((time) => {
      lastTimeRef.current = time;
      animate(time);
    });

    // Cleanup Function
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      // Proper Three.js cleanup to prevent memory leaks
      if (rendererRef.current && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }

      // Dispose of geometries and materials
      planets.forEach((_, index) => {
        const mesh = planetMeshes[index];
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });

      sun.geometry.dispose();
      (sun.material as THREE.Material).dispose();
    };
  }, [theme, isVisible]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      {/* Your solar system */}
      <div ref={mountRef} className="relative z-10" />
    </div>
  );
};

export default SolarSystem;
