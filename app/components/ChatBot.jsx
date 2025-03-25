"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! I'm Roman's personal bot. How can I help you today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { theme } = useTheme();
  const [suggestions, setSuggestions] = useState([
    "Who is Roman?",
    "Skills",
    "Projects",
    "Oi kire",
  ]);
  const [conversationContext, setConversationContext] = useState({
    lastTopic: null,
    topicHistory: [],
    interactionCount: 0,
  });

  const predefinedResponses = {
    // General queries
    hi: "Hello! How can I assist you with Roman's portfolio?",
    hello:
      "Hi there! I'm Roman's AI assistant. What would you like to know about him?",
    hey: "Hey! I'm here to help you learn more about Roman. What are you interested in?",
    "oi kire kire": "Modhu modhu modhu",

    // About Roman
    "who is roman":
      "Roman is a passionate web developer and Computer Science student from Bangladesh. He specializes in creating responsive and interactive web applications with modern technologies.",
    "what does roman do":
      "Roman is a web developer focusing on frontend and full-stack development using technologies like React, Next.js, and Node.js. He's currently studying Computer Science at American International University - Bangladesh.",
    "about roman":
      "Roman Howladar is a dedicated frontend developer with a passion for building beautiful, functional user interfaces. He combines technical expertise with creative problem-solving to deliver exceptional web experiences.",

    // Skills
    skills:
      "Roman is skilled in JavaScript/TypeScript, React, Next.js, TailwindCSS, Node.js, Express, MongoDB, and more. He's particularly strong in creating responsive user interfaces and full-stack applications.",
    "what are roman's skills":
      "Roman is skilled in JavaScript/TypeScript, React, Next.js, TailwindCSS, Node.js, Express, MongoDB, and more. He's particularly strong in creating responsive user interfaces and full-stack applications.",
    "programming languages":
      "Roman primarily works with JavaScript and TypeScript, but also has experience with C#, C++, and Python.",
    "frontend skills":
      "For frontend development, Roman is proficient with React, Next.js, TailwindCSS, Framer Motion, HTML5, and CSS3. He creates responsive and accessible user interfaces with modern design principles.",
    "backend skills":
      "On the backend, Roman works with Node.js, Express, MongoDB, Firebase, and RESTful API design. He's experienced in building scalable server architectures.",
    "tech stack":
      "Roman's preferred tech stack is the MERN stack (MongoDB, Express, React, Node.js) with Next.js and TailwindCSS. He also works with Firebase, Prisma, and various other modern web technologies.",

    // Projects
    projects:
      "Roman has worked on several projects including EduForge (AI writing assistant), FurniFlex (e-commerce platform), PromptIt (AI image generator), and many more. Which project would you like to know more about?",
    "best project":
      "One of Roman's notable projects is EduForge, an AI-powered writing assistant for academic excellence, built with Next.js and the OpenAI API.",
    eduforge:
      "EduForge is an AI writing assistant that helps students improve their academic writing. It was built with Next.js, TailwindCSS, and integrates with the OpenAI API to provide real-time writing suggestions and corrections.",
    furniflex:
      "FurniFlex is a full-featured e-commerce platform for furniture sales. It includes product listings, user authentication, shopping cart functionality, and payment processing. Built with the MERN stack and Stripe for payments.",
    promptit:
      "PromptIt is an AI image generation platform where users can create unique images through text prompts. It leverages the DALL-E API and was built with Next.js, TailwindCSS, and MongoDB for storing user creations.",
    "other projects":
      "Roman has also worked on a task management app, a social media dashboard, and various client websites. Would you like details about any of these?",

    // Contact
    "how to contact":
      "You can reach Roman via email at romanhowladar841@gmail.com or connect with him on LinkedIn, GitHub, or Twitter. Check the Contact section for direct links!",
    email: "You can email Roman at romanhowladar841@gmail.com",
    linkedin:
      "Connect with Roman on LinkedIn at linkedin.com/in/roman-howladar",
    github: "Check out Roman's code repositories at github.com/roman-howladar",
    "social media":
      "Roman is active on LinkedIn, GitHub, and Twitter. Which platform would you like the link for?",
    "oi kire": "Modhu modhu modhu",
    // Fun facts
    "fun fact":
      "Roman not only develops web applications but has also dabbled in game development with Unity!",
    hobbies:
      "Outside of coding, Roman enjoys photography, reading tech blogs, and exploring new web technologies as they emerge.",

    // Education
    education:
      "Roman is pursuing a Bachelor's degree in Computer Science at American International University - Bangladesh. He's expected to graduate in 2025.",
    "learning now":
      "Currently, Roman is expanding his knowledge in TypeScript, Next.js, and serverless architecture.",

    // Fallback for unknown queries
    default:
      "I don't have specific information about that yet. Would you like to know about Roman's projects, skills, or how to contact him instead?",
  };

  const generateContextualResponse = (input, context) => {
    const normalizedInput = input.toLowerCase().trim();
    let response;

    // First check for exact matches
    if (predefinedResponses[normalizedInput]) {
      response = predefinedResponses[normalizedInput];
    } else {
      // Check for partial matches
      let bestMatch = null;
      let bestMatchScore = 0;

      for (const key in predefinedResponses) {
        if (key === "default") continue;

        if (normalizedInput.includes(key)) {
          // Calculate a simple relevance score based on the match length vs input length
          const matchScore = key.length / normalizedInput.length;
          if (matchScore > bestMatchScore) {
            bestMatch = key;
            bestMatchScore = matchScore;
          }
        }
      }

      response = bestMatch
        ? predefinedResponses[bestMatch]
        : predefinedResponses["default"];
    }

    // Consider conversation context for more natural responses
    if (context.interactionCount > 2) {
      if (context.lastTopic && normalizedInput.length < 10) {
        // Short follow-up questions likely refer to previous topic
        if (
          normalizedInput.includes("more") ||
          normalizedInput.includes("tell me") ||
          normalizedInput.includes("what else")
        ) {
          if (context.lastTopic === "skills") {
            return "Roman is continuously learning new technologies. Currently, he's focusing on advanced React patterns, TypeScript best practices, and serverless architectures. Is there a specific technical area you'd like to know about?";
          } else if (context.lastTopic === "projects") {
            return "Roman approaches each project with a focus on user experience and clean code. He uses Git for version control and often implements CI/CD pipelines for his larger projects. Would you like to know his development process?";
          } else if (context.lastTopic === "contact") {
            return "The best way to reach Roman is through email at romanhowladar841@gmail.com. He typically responds within 24 hours during weekdays.";
          }
        }
      }
    }

    return response;
  };

  // Update conversation context based on input
  const findResponse = (input) => {
    let newContext = { ...conversationContext };
    newContext.interactionCount += 1;

    const normalizedInput = input.toLowerCase();
    // Detect topic from input
    if (
      normalizedInput.includes("tech") ||
      normalizedInput.includes("skill") ||
      normalizedInput.includes("programming")
    ) {
      newContext.lastTopic = "skills";
      newContext.topicHistory.push("skills");
    } else if (
      normalizedInput.includes("work") ||
      normalizedInput.includes("project") ||
      normalizedInput.includes("portfolio")
    ) {
      newContext.lastTopic = "projects";
      newContext.topicHistory.push("projects");
    } else if (
      normalizedInput.includes("email") ||
      normalizedInput.includes("contact") ||
      normalizedInput.includes("reach")
    ) {
      newContext.lastTopic = "contact";
      newContext.topicHistory.push("contact");
    } else if (
      normalizedInput.includes("about roman") ||
      normalizedInput.includes("who") ||
      normalizedInput.includes("background")
    ) {
      newContext.lastTopic = "about";
      newContext.topicHistory.push("about");
    }

    setConversationContext(newContext);
    // Generate contextual response based on input and conversation history
    return generateContextualResponse(input, newContext);
  };

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate bot thinking
    setIsTyping(true);

    // Simulate typing speed based on response length
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: findResponse(input),
        sender: "bot",
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
      // Update suggestions based on conversation context
      updateSuggestions(input);
    }, Math.min(700 + Math.random() * 800, 2000)); // Variable response time for more natural feel
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    // Submit form after input state is updated
    setTimeout(() => {
      const e = { preventDefault: () => {} };
      handleSendMessage(e);
    }, 10);
  };

  const updateSuggestions = (lastInput) => {
    const lowercaseInput = lastInput.toLowerCase();
    const topic = conversationContext.lastTopic;

    // Dynamic suggestions based on detected topic and conversation history
    if (topic === "projects" || lowercaseInput.includes("project")) {
      setSuggestions([
        "Tell me about EduForge",
        "Other projects?",
        "Tech stack used?",
        "Development process",
      ]);
    } else if (topic === "skills" || lowercaseInput.includes("skill")) {
      setSuggestions([
        "Frontend skills",
        "Backend skills",
        "Programming languages",
        "Learning now?",
      ]);
    } else if (topic === "contact" || lowercaseInput.includes("contact")) {
      setSuggestions(["Email address", "LinkedIn profile", "GitHub", "Resume"]);
    } else if (topic === "about" || lowercaseInput.includes("who")) {
      setSuggestions(["Education", "Experience", "Fun fact", "Hobbies"]);
    } else {
      // Default or mixed suggestions
      setSuggestions([
        "Who is Roman?",
        conversationContext.interactionCount > 2
          ? "Tell me a fun fact"
          : "Skills",
        conversationContext.interactionCount > 1 ? "Best project?" : "Projects",
        "Contact info",
      ]);
    }
  };

  useEffect(() => {
    // Scroll to bottom when messages update
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Chat bot toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 right-6 md:right-8 z-50 p-4 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow-lg"
      >
        <FaRobot size={20} />
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="fixed bottom-28 right-6 md:right-8 z-50 w-80 md:w-96 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-blue-500 to-teal-400 text-white flex justify-between items-center">
              <div className="flex items-center">
                <FaRobot className="mr-2" />
                <h3 className="font-medium">Roman's Assistant</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Messages area */}
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-3 flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg max-w-[80%] ${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start mb-3">
                  <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            <div className="px-4 py-2 flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Input area */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t border-gray-200 dark:border-gray-700 flex"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about Roman..."
                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-teal-400 text-white p-2 rounded-r-lg focus:outline-none hover:opacity-90"
              >
                <FaPaperPlane />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
