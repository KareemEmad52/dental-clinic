"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image'; // Adjust if using a different Image component
import { Separator } from '@/components/ui/separator';
import AnimatedButton from '@/components/AnimatedButton/animated-Button';

// Parent container variants for staggering child animations
const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // 0.2s delay between each child
    },
  },
};

// Child variants for each div (fade-in and slide-up)
const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

const CallToActionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' }); // Trigger when 20% of section is visible

  return (
    <motion.section
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="w-full bg-mainDark py-[25px]"
    >
      <div className="container">
        <div className="grid grid-cols-12 gap-5 lg:gap-0">
          <div className="col-span-12 lg:col-span-8 grid grid-cols-8 gap-5 lg:gap-0">
            <motion.div
              variants={childVariants}
              className="w-full lg:col-span-4 col-span-12"
            >
              <div className="flex justify-between items-center h-full pe-2 xl:pe-18">
                <div className="flex justify-center items-center gap-4">
                  <Image src="/icon-cta-phone.svg" width={33} height={33} alt="star" />
                  <div>
                    <h3 className="text-[20px] capitalize font-poppins font-semibold text-white mb-[10px]">
                      need dental services ?
                    </h3>
                    <p className="font-poppins capitalize text-white">Call on : (+01) 987 828 745</p>
                  </div>
                </div>
                <Separator orientation="vertical" className="bg-[#FFFFFF1F] hidden lg:block" />
              </div>
            </motion.div>
            <motion.div
              variants={childVariants}
              className="w-full lg:col-span-4 col-span-12"
            >
              <div className="flex justify-between items-center h-full pe-18">
                <div className="flex justify-center items-center gap-4">
                  <Image src="/icon-cta-time.svg" width={33} height={33} alt="star" />
                  <div>
                    <h3 className="text-[20px] capitalize font-poppins font-semibold text-white mb-[10px]">
                      opening hours
                    </h3>
                    <p className="font-poppins capitalize text-white">Mon to Sat 9:00AM to 9:00PM</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <motion.div
            variants={childVariants}
            className="lg:col-span-4 col-span-12 flex justify-center items-center"
          >
            <AnimatedButton text="Make an Appointment" />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default CallToActionSection;