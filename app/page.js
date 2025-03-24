"use client";
import AboutSection from "./components/AboutSection";
import EmailSection from "./components/EmailSection";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import ProjectsSection from "./components/ProjectsSection";
import { motion, LazyMotion, domAnimation } from "framer-motion";

export default function Home() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="relative">
        <Navbar />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8">
          <HeroSection />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <section id="about" className="py-16">
              <AboutSection />
            </section>

            <section id="projects" className="py-16">
              <ProjectsSection />
            </section>

            <section id="contact" className="py-16">
              <EmailSection />
            </section>
          </motion.div>
        </main>
      </div>
    </LazyMotion>
  );
}
