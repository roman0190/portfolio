"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="font-mono mt-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="grid grid-cols-1 sm:grid-cols-12 items-center gap-8 px-6"
      >
        {/* Rotating Image Section */}
        <div className="col-span-5 place-self-center">
          <motion.div
            className="relative rounded-full bg-gray-700/20 w-[250px] h-[250px] lg:w-[350px] lg:h-[350px] sm:w-[200px] sm:h-[200px] overflow-hidden"
            animate={{ rotate: [0, 10] }}
            transition={{ duration: 10, repeat: 1, ease: "linear" }}
          >
            {/* Glowing Border */}
            <div className="absolute inset-0 rounded-full border-4 border-gradient-to-r from-blue-500 to-green-500 opacity-70 animate-pulse"></div>

            {/* Profile Image */}
            <Image
              src="./image/dum.webp"  // Ensure image path is correct
              alt="Profile Image"
              className="absolute inset-0 w-full h-full object-cover rounded-full"
              width={500}
              height={500}
              priority // Make it load faster
              sizes="(max-width: 640px) 200px, (max-width: 1024px) 250px, 350px" // Responsively load different sizes
            />
          </motion.div>
        </div>

        {/* Text Section */}
        <div className="col-span-7 text-center sm:text-left">
          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
              Hello, I&#39;m
            </span>
            <br />
            <TypeAnimation
              sequence={[
                "Roman Howladar",
                3000,
                "Full-stack Developer",
                2000,
                "React Native Developer",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="block text-gradient"
            />
          </h1>
          <p className="text-white/70 text-base sm:text-lg lg:text-xl mb-6 leading-relaxed">
            Hey, I&#39;m Roman. I specialize in full-stack development using
            technologies like NestJS, Next.js, Firebase, and pgSQL. I am
            passionate about coding, constantly learning, and ready to take on
            exciting projects. Explore more about me in the About section.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform">
              <a href="mailto:romanhowladar841@gmail.com">Hire Me</a>
            </button>
            <button className="relative px-8 py-3 bg-gradient-to-r from-gray-600 via-blue-600 to-green-600 text-white font-semibold rounded-full overflow-hidden">
              <a
                href="/file/Roman_Howladar_Internship_Resume.pdf"
                download
                className="relative z-10"
              >
                Download CV
              </a>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-blue-500 to-green-500 opacity-50 blur-lg"></div>
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
