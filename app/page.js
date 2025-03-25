"use client";
import AboutSection from "./components/AboutSection";
import EmailSection from "./components/EmailSection";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import ProjectsSection from "./components/ProjectsSection";
import Footer from "./components/Footer";
import SolarSystem from "./components/SolarSystem";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import CustomCursor from "./components/CustomCursor";
import InstructionRobot from "./components/InstructionRobot";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading for smoother transitions
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      {isLoading ? (
        // Loading animation
        <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-[#121212] z-50">
          <motion.div
            className="w-16 h-16 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-teal-400 border-l-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      ) : (
        <div className="relative">
          <InstructionRobot/>
          <CustomCursor />
          <SolarSystem />
          <Navbar />
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            <HeroSection />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Add decorative 3D background elements */}
              <div className="background-glow absolute top-40 left-20 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/30"></div>
              <div className="background-glow absolute bottom-96 right-20 w-80 h-80 bg-teal-500/20 dark:bg-teal-500/30"></div>

              <section id="about" className="py-16">
                <AboutSection />
              </section>

              <section id="projects" className="py-16">
                <ProjectsSection />
              </section>

              <section id="contact" className="py-16">
                <EmailSection />
              </section>

              <Footer />
            </motion.div>
          </main>
        </div>
      )}
    </LazyMotion>
  );
}
