"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position for 3D effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate mouse position relative to window size for parallax effect
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="lg:py-16 relative">
      {/* Animated glow effect in background */}
      <div
        className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/20 rounded-full filter blur-3xl animate-float"
        style={{
          animationDelay: "0s",
          animationDuration: "8s",
        }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-500/10 dark:bg-teal-500/20 rounded-full filter blur-3xl animate-float"
        style={{
          animationDelay: "2s",
          animationDuration: "10s",
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 pt-16">
        {/* Text Content */}
        <motion.div
          className="col-span-1 lg:col-span-7 place-self-center text-center lg:text-left z-10 mt-8 lg:mt-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div
            className="relative"
            style={{
              transform: `perspective(1000px) rotateY(${
                mousePosition.x * 5
              }deg) rotateX(${-mousePosition.y * 5}deg)`,
              transformStyle: "preserve-3d",
              transition: "transform 0.1s ease-out",
            }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 text-3d">
              <span className="text-gray-900 dark:text-white">
                Hello, I&apos;m{" "}
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                Roman
              </span>
            </h1>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-6">
              I&apos;m a{" "}
              <TypeAnimation
                sequence={[
                  "Web Developer",
                  1000,
                  "Frontend Specialist",
                  1000,
                  "UI/UX Enthusiast",
                  1000,
                  "CS Student",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-blue-500 dark:text-blue-400"
              />
            </h2>

            <p className="text-base sm:text-lg mb-6 max-w-xl mx-auto lg:mx-0 text-gray-700 dark:text-gray-300">
              Passionate about creating beautiful, responsive web applications
              with engaging user experiences. I specialize in modern frontend
              technologies and full-stack development solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="transform transition-all"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Link
                  href="#projects"
                  className="button-3d inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 text-white font-medium"
                >
                  View My Work
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="transform transition-all"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Link
                  href="#contact"
                  className="px-6 py-3 rounded-lg bg-transparent border border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 text-gray-800 dark:text-gray-200 font-medium transition-colors"
                >
                  Contact Me
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Image/Avatar */}
        <motion.div
          className="col-span-1 lg:col-span-5 place-self-center mt-8 lg:mt-0 z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div
            className="relative"
            style={{
              transform: `perspective(1000px) rotateY(${
                -mousePosition.x * 10
              }deg) rotateX(${mousePosition.y * 10}deg)`,
              transformStyle: "preserve-3d",
              transition: "transform 0.1s ease-out",
            }}
          >
            <div className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] relative">
              {/* Glowing effect behind avatar */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 blur-xl opacity-30 dark:opacity-40 animate-pulse "></div>

              <Image
                src="/image/dum.webp"
                alt="Roman Howladar"
                width={400}
                height={400}
                className="rounded-full border-4 border-gray-200 dark:border-gray-700  mx-auto max-w-[200px] max-h-[200px] lg:max-w-[400px] lg:max-h-[400px] object-cover"
                priority={true}
                style={{
                  transform: "translateZ(50px)",
                  transformStyle: "preserve-3d",
                }}
              />

              {/* Decorative orbs with 3D positioning */}
              <div
                className="absolute top-5 right-0 w-8 h-8 bg-blue-500 rounded-full"
                style={{
                  transform: "translateZ(30px) translateX(10px)",
                  boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
                }}
              />
              <div
                className="absolute bottom-10 left-0 w-6 h-6 bg-teal-400 rounded-full"
                style={{
                  transform: "translateZ(40px) translateX(-15px)",
                  boxShadow: "0 0 10px rgba(45, 212, 191, 0.5)",
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-80 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          Scroll Down
        </span>
        <div className="w-1 h-6 rounded-full bg-gradient-to-b from-blue-500 to-teal-400">
          <motion.div
            className="w-full h-1/3 bg-white rounded-full"
            animate={{
              y: [0, 15, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
