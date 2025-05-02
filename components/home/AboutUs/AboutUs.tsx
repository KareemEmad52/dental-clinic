"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import styles from './styles.module.css';
import AnimatedButton from '@/components/AnimatedButton/animated-Button'; 

// Variants for the header container (staggered character animation)
const headerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // 0.05s delay between characters
    },
  },
};

// Variants for each character in the header
const headerLetterVariants = {
  hidden: { opacity: 0, x: 50 }, // Start 50px to the right
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// Variants for images (left-to-right slide)
const imageContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // 0.2s delay between images
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, x: -50 }, // Start 50px to the left
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

// Variants for text content (paragraph, features, button)
const contentContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // 0.2s delay between elements
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' }); // Trigger when 20% visible

  const titleText = 'Your Journey to a Healthier Smile Begins Here';
  const titleWords = titleText.split(' ');
  const yourJourneyIndex = titleWords.indexOf('Your'); // Start of "Your Journey"

  return (
    <motion.section
      ref={ref}
      className="container my-20"
    >
      <div className="grid grid-cols-12">
        {/* Image Column */}
        <div className='md:col-span-6 col-span-12'>
            <div className={`${styles.aboutImage}`}>
              <div className={`${styles.aboutImg1}`}>
                <figure className={`${styles.imageAnime}  ${styles.reveal}`} style={{ transform: "translate(0px, 0px)", opacity: "1", visibility: "inherit" }}>
                  <img src="/about-us-img-1.jpg" alt="" style={{ transform: "translate(0px, 0px)" }} />
                </figure>
              </div>

              <div className={`${styles.aboutImg2}`}>
                <figure className={`${styles.imageAnime}  ${styles.reveal}`} style={{ transform: "translate(0px, 0px)", opacity: "1", visibility: "inherit" }}>
                  <img src="/about-us-img-2.jpg" alt="" style={{ transform: "translate(0px, 0px)" }} />
                </figure>
              </div>

              {/* <!-- About Experience Circle Start --> */}
              <div className={`${styles.aboutExperience}`}>
                <figure>
                  <img src="/about-experience-circle.png" alt="" />
                </figure>
              </div>
              {/* <!-- About Experience Circle End --> */}
            </div>
          </div>

        {/* Content Column */}
        <div className="md:col-span-6 col-span-12">
          <div className={`${styles.sectionTitle} w-full`}>
            {/* Subheading */}
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="flex justify-start items-center gap-2 mb-5"
            >
              <Image src="/icon-sub-heading.svg" width={15} height={15} alt="star Icon" />
              <h3 className="capitalize font-poppins text-mainLight font-medium">ABOUT US</h3>
            </motion.div>

            {/* Main Title */}
            <motion.h4
              variants={headerContainerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="capitalize font-poppins text-mainDark text-[30px] lg:text-[44px] font-bold leading-[35px] lg:leading-[55px] mb-10"
            >
              {titleWords.map((word, wordIndex) => (
                <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
                  {word.split('').map((char, charIndex) => (
                    <motion.span
                      key={`${wordIndex}-${charIndex}`}
                      variants={headerLetterVariants}
                      className={
                        wordIndex === yourJourneyIndex || wordIndex === yourJourneyIndex + 1
                          ? 'text-mainLight'
                          : ''
                      }
                      style={{ display: 'inline-block' }}
                    >
                      {char}
                    </motion.span>
                  ))}
                  {wordIndex < titleWords.length - 1 && <span> </span>}
                </span>
              ))}
            </motion.h4>

            {/* Paragraph */}
            <motion.p
              variants={contentVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="text-[#527282] text-[16px] font-poppins lg:pe-8 mb-6"
            >
              The goal of our clinic is to provide friendly, caring dentistry and the highest level of general, cosmetic,
              and specialist dental treatments. With dental practices throughout the world.
            </motion.p>

            {/* Features Grid */}
            <motion.div
              variants={contentContainerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="grid md:grid-cols-2 gap-4 pt-4 mb-10"
            >
              <motion.div variants={contentVariants} className="flex items-center gap-2">
                <Image src="/success-icon-about.svg" width={22} height={22} alt="star Icon" />
                <span className="font-semibold text-mainDark text-[16px] font-poppins">Experienced Team</span>
              </motion.div>
              <motion.div variants={contentVariants} className="flex items-center gap-2">
                <Image src="/success-icon-about.svg" width={22} height={22} alt="star Icon" />
                <span className="font-semibold text-mainDark text-[16px] font-poppins">Comprehensive Services</span>
              </motion.div>
              <motion.div variants={contentVariants} className="flex items-center gap-2">
                <Image src="/success-icon-about.svg" width={22} height={22} alt="star Icon" />
                <span className="font-semibold text-mainDark text-[16px] font-poppins">State-Of-The-Art,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, Technology</span>
              </motion.div>
              <motion.div variants={contentVariants} className="flex items-center gap-2">
                <Image src="/success-icon-about.svg" width={22} height={22} alt="star Icon" />
                <span className="font-semibold text-mainDark text-[16px] font-poppins">Emergency Dental Services</span>
              </motion.div>
            </motion.div>

            {/* Button */}
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="w-fit"
            >
              <AnimatedButton text="Read More About Us" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;