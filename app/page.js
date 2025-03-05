// app/page.js
"use client";
import AboutSection from "./components/AboutSection";
import EmailSection from "./components/EmailSection";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import ProjectsSection from "./components/ProjectsSection";
import { motion } from "framer-motion";


export default function Home() {
  return (
    <div>
      {/* <SolarSystem /> */}
      <div className="z-50">
        <motion.main className="flex min-h-screen flex-col ">
          <Navbar />
          <div className="container mx-auto mt-24 px-12 py-4">
            <HeroSection />
            <motion.section id="about" layout>
              <AboutSection />
            </motion.section>
            <motion.section id="projects" layout>
              <ProjectsSection />
            </motion.section>
            <motion.section id="contact" layout>
              <EmailSection />
            </motion.section>
          </div>
        </motion.main>
      </div>
    </div>
  );
}
