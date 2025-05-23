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
// Import new components
import AchievementsSection from "./components/AchievementsSection";
import Timeline from "./components/Timeline";
import ChatBot from "./components/ChatBot";

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
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-teal-400 border-l-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      ) : (
        <div className="relative">
          {/* <InstructionRobot /> */}
          <CustomCursor />
          <ChatBot />
          <SolarSystem />
          <Navbar />
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 relative z-20">
            <HeroSection />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Add decorative 3D background elements with responsive positioning */}
              <div className="background-glow hidden sm:block absolute top-20 sm:top-40 left-5 sm:left-20 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-blue-500/20 dark:bg-blue-500/30 rounded-full blur-3xl"></div>
              <div className="background-glow hidden sm:block absolute bottom-40 sm:bottom-96 right-5 sm:right-20 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-teal-500/20 dark:bg-teal-500/30 rounded-full blur-3xl"></div>

              <section id="about" className="py-8 sm:py-12 md:py-16">
                <AboutSection />
              </section>

              {/* Add Achievements section */}
              <section className="py-8 sm:py-12 md:py-16">
                <AchievementsSection />
              </section>

              {/* Add Timeline section */}
              <section className="py-8 sm:py-12 md:py-16">
                <Timeline />
              </section>

              <section id="projects" className="py-8 sm:py-12 md:py-16">
                <ProjectsSection />
              </section>

              <section id="contact" className="py-8 sm:py-12 md:py-16">
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
