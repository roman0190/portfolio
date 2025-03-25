"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";

// These would be replaced with real testimonials
const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Project Manager",
    avatar: "/image/testimonials/avatar1.jpg", // Add avatar images
    content:
      "Roman delivered an exceptional website for our business. His attention to detail and technical expertise made the project a success. The site is not only visually stunning but also performs amazingly well.",
    company: "TechCorp",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Startup Founder",
    avatar: "/image/testimonials/avatar2.jpg", // Add avatar images
    content:
      "Working with Roman was a pleasure. He understood our vision right away and translated it into a beautiful, functional website. The entire process was smooth, and he was always responsive to our feedback.",
    company: "InnovateCo",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Marketing Director",
    avatar: "/image/testimonials/avatar3.jpg", // Add avatar images
    content:
      "Roman's technical skills are top-notch. He built us a dynamic web application that exceeded our expectations. The attention to UX/UI details and performance optimization really sets him apart.",
    company: "GrowthLabs",
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { theme } = useTheme();

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Client{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
              Testimonials
            </span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-teal-400 mx-auto rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Feedback from clients I've had the pleasure to work with.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Decorative quotation mark */}
            <FaQuoteLeft
              className="absolute -top-8 -left-4 md:-left-8 text-4xl md:text-6xl text-gray-200 dark:text-gray-800"
              aria-hidden="true"
            />

            {/* Testimonial carousel */}
            <div className="relative">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0,
                    x:
                      activeIndex === index
                        ? 0
                        : activeIndex > index
                        ? -100
                        : 100,
                  }}
                  transition={{ duration: 0.5 }}
                  className="card-3d p-8 md:p-12 mb-8"
                  style={{ display: activeIndex === index ? "block" : "none" }}
                >
                  <div className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 italic">
                    "{testimonial.content}"
                  </div>

                  <div className="flex items-center">
                    <div className="h-14 w-14 relative rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/image/projects/1.png";
                        }}
                      />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-gray-100">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Testimonial navigation dots */}
            <div className="flex justify-center mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 w-2 md:h-3 md:w-3 rounded-full mx-1.5 transition-all ${
                    activeIndex === index
                      ? "bg-gradient-to-r from-blue-500 to-teal-400 w-6 md:w-8"
                      : "bg-gray-300 dark:bg-gray-700"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
