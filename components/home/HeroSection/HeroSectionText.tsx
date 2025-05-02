"use client";

import React from 'react';
import { motion } from 'framer-motion';

// Animation variants for the container (staggered effect)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03, // Delay between each character's animation
    },
  },
};

// Animation variants for each character
const letterVariants = {
  hidden: { opacity: 0, x: 50 }, // Start 50px to the right and invisible
  visible: {
    opacity: 1,
    x: 0, // Move to original position
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

const HeroText = () => {
  const text = 'Experience Dental Excellence with a Gentle Touch';
  const words = text.split(' ');
  const dentalExcellenceIndex = words.indexOf('Dental'); // Start of "Dental Excellence"

  return (
    <div>
      <motion.h1
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ display: 'inline-block' }}
        className='text-4xl lg:text-[54px] font-bold font-poppins text-mainDark  lg:leading-16'
      >
        {words.map((word, wordIndex) => (
          <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
            {word.split('').map((char, charIndex) => (
              <motion.span
                key={`${wordIndex}-${charIndex}`}
                variants={letterVariants}
                className={wordIndex === dentalExcellenceIndex || wordIndex === dentalExcellenceIndex + 1 ? 'text-mainLight' : ''}
                style={{ display: 'inline-block' }}
              >
                {char}
              </motion.span>
            ))}
            {/* Add space after each word except the last */}
            {wordIndex < words.length - 1 && <span> </span>}
          </span>
        ))}
      </motion.h1>
    </div>
  );
};

export default HeroText;