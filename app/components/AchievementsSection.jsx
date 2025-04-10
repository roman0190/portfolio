"use client";
import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaCode, FaLaptopCode, FaCoffee, FaSmile } from "react-icons/fa";

const achievementsList = [
  {
    metric: "Projects",
    value: 10, // Update with your actual number
    icon: <FaLaptopCode className="text-2xl md:text-3xl" />,
    description: "Completed Projects",
  },
  {
    metric: "Lines of Code",
    value: 100000, // Update with your estimate
    icon: <FaCode className="text-2xl md:text-3xl" />,
    description: "and counting...",
  },
  {
    metric: "Coffees",
    value: 500, // Fun metric
    icon: <FaCoffee className="text-2xl md:text-3xl" />,
    description: "consumed during coding",
  },
  {
    metric: "Happy Clients",
    value: 8, // Update with your actual number
    icon: <FaSmile className="text-2xl md:text-3xl" />,
    description: "satisfied with the work",
  },
];

const Achievement = ({ metric, value, icon, description }) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      // Animate the counter
      let start = 0;
      const duration = 2000; // 2 seconds animation
      const increment = value / (duration / 16); // 60fps approx

      const timer = setInterval(() => {
        start += increment;
        if (start > value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      // Animate the container
      controls.start({ opacity: 1, y: 0 });

      return () => clearInterval(timer);
    }
  }, [inView, value, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ duration: 0.6 }}
      className="card-3d p-6 flex flex-col items-center justify-center hover:-translate-y-2 transition-transform duration-300"
    >
      <motion.div
        className="text-blue-500 dark:text-blue-400 mb-3"
        animate={{ scale: inView ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 1, times: [0, 0.5, 1] }}
      >
        {icon}
      </motion.div>
      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
        {count.toLocaleString()}+
      </h3>
      <p className="text-gray-800 dark:text-gray-200 font-medium">{metric}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-1">
        {description}
      </p>
    </motion.div>
  );
};

const AchievementsSection = () => {
  return (
    <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
              Achievements
            </span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-teal-400 mx-auto rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Some numbers that reflect my journey as a developer and the
            experiences I've gained.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievementsList.map((achievement, index) => (
            <Achievement
              key={index}
              metric={achievement.metric}
              value={achievement.value}
              icon={achievement.icon}
              description={achievement.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
