"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";


const HeroSection = () => {
  return (
    <section className="relative pt-16 md:pt-24 pb-10 md:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-1 lg:col-span-7 text-center lg:text-left order-2 lg:order-1 mt-8 lg:mt-0"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-3 md:mb-4 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
                Hello, I&apos;m{" "}
              </span>
              <br className="hidden xs:block" />
              <TypeAnimation
                sequence={[
                  "Roman",
                  1000,
                  "Software Engineer",
                  1000,
                  "Problem Solver",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-gray-800 dark:text-white"
              />
            </h1>
            <p className="text-sm sm:text-base md:text-lg xl:text-xl mb-6 md:mb-8 text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
              Passionate about crafting beautiful, functional web experiences
              with modern technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 text-white font-medium text-center hover:shadow-lg transition-all text-sm sm:text-base"
              >
                Hire Me
              </motion.a>
              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 font-medium text-center transition-all text-sm sm:text-base"
              >
                Download CV
              </motion.a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="col-span-1 lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative w-[180px] h-[180px] xs:w-[220px] xs:h-[220px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] lg:w-[350px] lg:h-[350px] xl:w-[400px] xl:h-[400px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 opacity-90"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[96%] h-[96%] rounded-full overflow-hidden">
                <Image
                  width={1080}
                  height={1080}
                  src="./image/dum.webp"
                  alt="Roman portrait"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-20 left-5 w-40 sm:w-64 h-40 sm:h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 right-5 w-48 sm:w-80 h-48 sm:h-80 bg-teal-500/5 dark:bg-teal-500/10 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default HeroSection;
