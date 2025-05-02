"use client"
import React from 'react'
import HeroText from './HeroSectionText'
import styles from './styles.module.css'
import AnimatedButton from '@/components/AnimatedButton/animated-Button'
import { motion } from 'framer-motion'

import Image from 'next/image'
import { Separator } from '@/components/ui/separator'


const HeroSection = () => {
  return (
    <section className={`${styles.hero} `}>
      <div className="container">
        <div className='w-full flex flex-col lg:items-center lg:flex-row '>
          <div className='flex-1 flex  items-start flex-col lg:gap-5 '>

            <HeroText />


            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              
              className='w-full flex justify-start mt-[10px]'>
              <p className='lg:max-w-[500px] text-md text-[#527282] '>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7,delay: 0.5 }}
            >
              <div className='mt-[20px]'>
                <AnimatedButton text='Make an Appointment' />
              </div>
            </motion.div>

            <Separator className='my-5 lg:mt-2 lg:mb-0' />
            <div className={`w-full`}>
              <ul className=' w-full flex flex-col justify-center lg:flex-row  lg:justify-start items-center gap-3'>
                <li>Google Rating <span>5.0</span></li>
                <li className='flex '>
                  <Image src="/star-svgrepo-com.svg" width={15} height={15} alt='star' />
                  <Image src="/star-svgrepo-com.svg" width={15} height={15} alt='star' />
                  <Image src="/star-svgrepo-com.svg" width={15} height={15} alt='star' />
                  <Image src="/star-svgrepo-com.svg" width={15} height={15} alt='star' />
                  <Image src="/star-svgrepo-com.svg" width={15} height={15} alt='star' />
                </li>

                <li>based on 492 reviews</li>
              </ul>
            </div>
          </div>
          <div className='w-full lg:w-1/2 flex justify-center items-center'>
            <div className='w-full sm:w-3/4 lg:w-full min-h-s flex justify-center  relative'>
              <figure>
                <Image src="/hero-img.png" width={500} height={500} alt='hero' />
              </figure>
              <div className={` absolute top-0 left-0  translate-x-[20%] translate-y-[70%] lg:translate-x-[100%] lg:translate-y-[70%] `}>
                <img src="/icon-star.svg" className={`${styles.starImage} max-w-[112px] w-20 h-20`} alt='star' />
              </div>
              <div className={` absolute lg:top-[10%] lg:right-[20%] top-[8%] right-[5%]  translate-x-[20%] translate-y-[70%] lg:translate-x-[100%] lg:translate-y-[70%] `}>
                <div className={`${styles.heroIcons} bg-white lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] rounded-full flex justify-center items-center`}>
                  <img src="/icon-hero-theeth-1.svg" className='max-w-[56px] w-[40px] lg:w-full' alt="" />
                </div>
              </div>
              <div className={` absolute lg:top-[50%] lg:left-[10%] top-[50%] left-[5%]`}>
                <div className={`${styles.heroIcons} bg-white lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] rounded-full flex justify-center items-center`}>
                  <img src="/icon-hero-theeth-2.svg" className='max-w-[56px] w-[40px] lg:w-full' alt="" />
                </div>
              </div>
              <div className={` absolute lg:top-70%] lg:right-[25%] top-[70%] right-[5%]  translate-x-[20%] translate-y-[70%] lg:translate-x-[100%] lg:translate-y-[70%] `}>
                <div className={`${styles.heroIcons} bg-white lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] rounded-full flex justify-center items-center`}>
                  <img src="/icon-hero-theeth-3.svg" className='max-w-[56px] w-[40px] lg:w-full' alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection