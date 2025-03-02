"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import Image from "next/image";
const SolarSystem = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const targetZoomRef = useRef(50); // Target zoom level for smooth interpolation
  const lastTimeRef = useRef(0); // Track the last frame time for smooth animation

  // Create refs for each planet's angle
  const planetAnglesRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    if (!mountRef.current) return;

    // 🔹 Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // 🔥 Load Textures using TextureLoader
    const textureLoader = new THREE.TextureLoader();

    // Load the Sun Texture
    const sunTexture = textureLoader.load("./textures/sun.jpg");

    // 🌍 Planets Data (with texture file paths)
    const planets = [
      {
        name: "Mercury",
        size: 0.4,
        distance: 5,
        texture: "./textures/mercury.jpg", // Replace with the actual texture path
        speed: 0.001, // Slow down
        moons: [],
      },
      {
        name: "Venus",
        size: 0.6,
        distance: 8,
        texture: "./textures/venus.jpg",
        speed: 0.0008, // Slow down
        moons: [],
      },
      {
        name: "Earth",
        size: 0.8,
        distance: 11,
        texture: "./textures/earth.jpg",
        speed: 0.0015, // Slow down
        moons: [{ size: 0.2, distance: 1.5, speed: 0.002 }],
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

    planets.forEach((planet) => {
      // 🔹 Planet Mesh with texture
      const planetTexture = textureLoader.load(planet.texture);
      const planetMaterial = new THREE.MeshBasicMaterial({
        map: planetTexture,
      });
      const geometry = new THREE.SphereGeometry(planet.size, 32, 32);
      const mesh = new THREE.Mesh(geometry, planetMaterial);
      scene.add(mesh);
      planetMeshes.push(mesh);

      // 🔹 Moons (with texture, similar approach)
      moonMeshes[planet.name] = [];
      planet.moons.forEach((moon) => {
        const moonTexture = textureLoader.load("./textures/moon.jpg"); // Replace with moon texture
        const moonMaterial = new THREE.MeshBasicMaterial({ map: moonTexture });
        const moonGeometry = new THREE.SphereGeometry(moon.size, 32, 32);
        const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
        scene.add(moonMesh);
        moonMeshes[planet.name].push(moonMesh);
      });

      // 🔄 Orbit Path (Visible)
      const orbitGeometry = new THREE.RingGeometry(
        planet.distance - 0.1,
        planet.distance + 0.1,
        64
      );
      const orbitMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
      });
      const orbitMesh = new THREE.Mesh(orbitGeometry, orbitMaterial);
      orbitMesh.rotation.x = Math.PI / 2; // Make it flat
      scene.add(orbitMesh);

      // Initialize the planet's angle
      planetAnglesRef.current.set(planet.name, 0);
    });

    // 🔹 Sun with texture
    const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
    const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Add glow effect using a point light
    const sunGlow = new THREE.PointLight(0xffff00, 2, 50); // Yellow glow
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

    // 🔄 Animation Function
    function animate(time: number) {
      requestAnimationFrame(animate);

      // Calculate time difference for smooth animation
      const deltaTime = time - lastTimeRef.current;
      lastTimeRef.current = time;

      // ☀ Sun Rotating
      sun.rotation.y += 0.002;

      // 🔄 Planets Orbiting Sun
      planets.forEach((planet, index) => {
        const mesh = planetMeshes[index];
        const angle = planetAnglesRef.current.get(planet.name)!;
        const updatedAngle = angle + planet.speed * deltaTime; // Update each planet's angle separately

        // Update the planet's angle reference
        planetAnglesRef.current.set(planet.name, updatedAngle);

        mesh.position.x = Math.cos(updatedAngle) * planet.distance;
        mesh.position.z = Math.sin(updatedAngle) * planet.distance;
        mesh.rotation.y += 0.02; // Planet Rotation

        // 🌑 Moons Orbiting Planet
        moonMeshes[planet.name].forEach((moonMesh, moonIndex) => {
          const moonData = planet.moons[moonIndex];
          const moonAngle = updatedAngle * moonData.speed;
          moonMesh.position.x =
            mesh.position.x + Math.cos(moonAngle) * moonData.distance;
          moonMesh.position.z =
            mesh.position.z + Math.sin(moonAngle) * moonData.distance;
        });
      });

      // Smoothly interpolate zoom based on scroll
      camera.position.z += (targetZoomRef.current - camera.position.z) * 0.1; // Smooth interpolation

      renderer.render(scene, camera);
    }
    requestAnimationFrame((time) => {
      lastTimeRef.current = time;
      animate(time);
    });

    // Cleanup Function
    return () => {
      window.removeEventListener("scroll", handleScroll);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      {/* Set background image */}
      <div className="absolute top-0 left-0 w-full h-full z-20 opacity-40">
        <Image
          src="/background.jpg"
          alt="alt"
          layout="fill" // This will make the image fill the entire container
          objectFit="cover" // This ensures the image covers the area without distortion
        />
      </div>

      {/* Your solar system */}
      <div ref={mountRef} className="relative z-10" />
    </div>
  );
};

export default SolarSystem;
