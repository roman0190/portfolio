"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaClock } from "react-icons/fa";

const blogPosts = [
  {
    id: 1,
    title: "Getting Started with React Hooks",
    excerpt:
      "A beginner-friendly guide to React Hooks and how they can simplify your code.",
    coverImage: "/image/blog/placeholder1.jpg", // Add placeholder images
    date: "May 15, 2024",
    readTime: "5 min read",
    slug: "/blog/react-hooks",
  },
  {
    id: 2,
    title: "Building Responsive Layouts with Tailwind CSS",
    excerpt:
      "Learn how to create beautiful and responsive layouts quickly using Tailwind CSS utility classes.",
    coverImage: "/image/blog/placeholder2.jpg", // Add placeholder images
    date: "April 22, 2024",
    readTime: "7 min read",
    slug: "/blog/tailwind-layouts",
  },
  {
    id: 3,
    title: "Next.js vs. Create React App: Making the Right Choice",
    excerpt:
      "Comparing the two popular React frameworks to help you decide which one fits your project.",
    coverImage: "/image/blog/placeholder3.jpg", // Add placeholder images
    date: "April 8, 2024",
    readTime: "6 min read",
    slug: "/blog/nextjs-vs-cra",
  },
];

const BlogCard = ({ post, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card-3d overflow-hidden h-full flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            // Fallback image if the real one fails to load
            e.currentTarget.src = "/image/projects/1.png";
          }}
        />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <span>{post.date}</span>
          <span className="mx-2">•</span>
          <span className="flex items-center">
            <FaClock className="mr-1" />
            {post.readTime}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          {post.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
          {post.excerpt}
        </p>
        <Link
          href={post.slug}
          className="inline-flex items-center font-medium text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"
        >
          Read More <FaArrowRight className="ml-2" size={12} />
        </Link>
      </div>
    </motion.div>
  );
};

const BlogSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Latest{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
              Articles
            </span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-teal-400 mx-auto rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Sharing my thoughts, learnings, and insights about web development
            and technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/blog"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 text-white font-medium hover:shadow-lg transition-shadow duration-300"
          >
            View All Articles
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
