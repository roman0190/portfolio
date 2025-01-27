"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EmailSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 font-mono"
    >
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <h5 className="text-xl font-bold text-white my-2">Let{"'"}s Contact</h5>
        <p className="text-white/45 mb-4 max-w-md">
          If you're interested in collaborating with me, I'd love to hear from
          you! You can reach out through LinkedIn or GitHub, or simply send me
          an email using the form in the contact section. I'm always excited to
          connect with fellow developers and explore new opportunities. Looking
          forward to hearing from you soon. Have a fantastic day!
        </p>
        <div className="socials flex flex-row gap-2  text-green-400 ">
          <a
            className="rounded-full border p-2 hover:text-black hover:border-white border-green-400 shadow-lg bg-white"
            href="https://github.com/roman0190"
          >
            Github
          </a>
          <a
            className="rounded-full border p-2 hover:text-black hover:border-white border-green-400 shadow-lg bg-white"
            href="https://www.linkedin.com/in/roman-howladar-4a576123a/"
          >
            LinkedIn
          </a>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
      >
        <form className="flex flex-col">
          <label
            htmlFor="email"
            className="text-white block mt-4 text-sm font-medium"
          >
            Your Email
          </label>
          <motion.input
            name="email"
            type="email"
            id="email"
            required
            placeholder="example@gmail.com"
            className="bg-[#18191E] border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
            whileFocus={{ scale: 1.05 }}
          />

          <label
            htmlFor="subject"
            className="text-white block mt-4 text-sm font-medium"
          >
            Subject
          </label>
          <motion.input
            name="subject"
            type="text"
            id="subject"
            required
            placeholder="Just Saying Hi...."
            className="bg-[#18191E] border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
            whileFocus={{ scale: 1.05 }}
          />

          <label
            htmlFor="message"
            className="text-white block mt-4 text-sm font-medium"
          >
            Message
          </label>
          <motion.textarea
            name="message"
            id="message"
            required
            placeholder="Let's Talk about......"
            className="bg-[#18191E] border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
            whileFocus={{ scale: 1.05 }}
          />

          <motion.button
            type="submit"
            className="text-white font-medium py-2.5 px-5 rounded-lg w-full mt-2 bg-green-500 hover:bg-green-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Email
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default EmailSection;
