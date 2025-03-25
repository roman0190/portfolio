import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const RobotContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RobotBody = styled(motion.div)`
  width: 80px;
  height: 100px;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  border-radius: 20px 20px 10px 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const RobotHead = styled(motion.div)`
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 50%;
  margin-top: -30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const RobotEye = styled.div`
  width: 12px;
  height: 12px;
  background: #333;
  border-radius: 50%;
  margin: 0 5px;
  position: relative;

  &::after {
    content: "";
    width: 4px;
    height: 4px;
    background: white;
    border-radius: 50%;
    position: absolute;
    top: 2px;
    right: 2px;
  }
`;

const RobotMouth = styled(motion.div)`
  width: 30px;
  height: 10px;
  background: #333;
  border-radius: 10px;
  margin-top: 10px;
`;

const RobotArm = styled(motion.div)`
  width: 10px;
  height: 40px;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  border-radius: 5px;
  position: absolute;
  top: 40px;

  &.left {
    left: -8px;
    transform-origin: top center;
  }

  &.right {
    right: -8px;
    transform-origin: top center;
  }
`;

const MessageBubble = styled(motion.div)`
  background: white;
  padding: 15px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 250px;
  margin-bottom: 15px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    right: 20px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid white;
  }
`;

const instructions = [
  "Welcome to my portfolio! 👋",
  "Scroll down to explore my projects!",
  "Click on project cards for more details",
  "Check out my skills section",
  "Feel free to contact me!",
];

const InstructionRobot = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentInstruction, setCurrentInstruction] = useState(0);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    // Show robot after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
      setSpeaking(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Hide robot after 20 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      setSpeaking(false);
    }, 20000);

    return () => clearTimeout(hideTimer);
  }, []);

  useEffect(() => {
    if (speaking) {
      const timer = setInterval(() => {
        setCurrentInstruction((prev) => (prev + 1) % instructions.length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [speaking]);

  const toggleVisibility = () => {
    setSpeaking(!speaking);
  };

  return (
    <RobotContainer
      className="text-blue-400 absolute bottom-0 right-0"
      initial={{ opacity: 0, y: 100 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence>
        {speaking && (
          <MessageBubble
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            key={currentInstruction}
          >
            {instructions[currentInstruction]}
          </MessageBubble>
        )}
      </AnimatePresence>

      <RobotBody onClick={toggleVisibility}>
        <RobotArm
          className="left"
          animate={speaking ? { rotate: [0, -20, 0] } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <RobotHead>
          <RobotEye />
          <RobotEye />
        </RobotHead>
        <RobotMouth
          animate={speaking ? { scaleX: [1, 1.2, 0.8, 1] } : {}}
          transition={{ repeat: Infinity, duration: 0.8 }}
        />
        <RobotArm
          className="right"
          animate={speaking ? { rotate: [0, 20, 0] } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </RobotBody>
    </RobotContainer>
  );
};

export default InstructionRobot;
