"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import styles from './styles.module.css'; 
import { ArrowRight } from 'lucide-react';
import AnimatedButton from '@/components/AnimatedButton/animated-Button';

const ServicesSection = () => {
  // Create a ref for the section to track visibility
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' }); // Trigger when section is 100px into view

  // Variants for the container (stagger children animations)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger each child animation by 0.2s
      },
    },
  };

  // Variants for individual elements (e.g., headings, cards, button)
  const itemVariants = {
    hidden: { opacity: 0, y: 50 }, // Start below and invisible
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  // Variants for service cards with a slight scale effect
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.section
      className="bg-[#eff8ff]"
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="container py-18">
        {/* Sub-heading */}
        <motion.div
          className="w-full flex justify-center items-center gap-2 mb-5"
          variants={itemVariants}
        >
          <Image src="/icon-sub-heading.svg" width={15} height={15} alt="star Icon" />
          <h3 className="capitalize font-poppins text-mainLight font-medium">
            OUR SERVICES
          </h3>
        </motion.div>

        {/* Main heading */}
        <motion.h4
          className="capitalize text-center font-poppins text-mainDark text-[30px] lg:text-[44px] font-bold leading-[35px] lg:leading-[55px] mb-6"
          variants={itemVariants}
        >
          <span className="text-mainLight">High Quality</span> Services for You.
        </motion.h4>

        {/* Description */}
        <motion.p
          className="text-[#527282] text-[16px] font-poppins text-center"
          variants={itemVariants}
        >
          We are committed to sustainability. eco-friendly initiatives.
        </motion.p>

        {/* Service Cards Grid */}
        <motion.div
          className="grid grid-cols-4 gap-3 my-6"
          variants={containerVariants}
        >
          {[
            '/icon-services-1.svg',
            '/icon-services-2.svg',
            '/icon-services-3.svg',
            '/icon-services-4.svg',
          ].map((icon, index) => (
            <motion.div
              key={index}
              className="col-span-4 md:col-span-1"
              variants={cardVariants}
            >
              <div
                className={`${styles.servicesCard} flex flex-col bg-white p-[30px] rounded-2xl shadow group`}
              >
                <div className="z-10">
                  <Image
                    src={icon}
                    width={60}
                    height={60}
                    className={`transition-all duration-500 ease-in-out ${styles.serviceCardImage}`}
                    alt="teeth icon"
                  />
                  <h2 className="font-poppins text-[20px] mt-5 mb-3 capitalize font-semibold group-hover:text-white transition-all duration-500 ease-in-out">
                    general dental care
                  </h2>
                  <p className="font-poppins text-[#527282] group-hover:text-white transition-all duration-500 ease-in-out">
                    We are excited to meet you and provide the best dental care for your family.
                  </p>
                  <p className="mt-5 cursor-pointer group-hover:text-white group-hover:bg-mainDark transition-all duration-500 ease-in-out flex justify-start items-center gap-2">
                    Read more <ArrowRight className="w-4 h-4" />
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Description */}
        <motion.div
          className="w-full flex justify-center items-center"
          variants={itemVariants}
        >
          <p className="max-w-[500px] p-5 mt-5 text-[#527282] text-[

16px] font-poppins text-center">
            We believe in using the latest technology and techniques to ensure the best outcomes for our patients.
          </p>
        </motion.div>

        {/* Animated Button */}
        <motion.div
          className="w-full flex justify-center items-center"
          variants={itemVariants}
        >
          <AnimatedButton text="View All Services" />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ServicesSection;