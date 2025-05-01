import Image from 'next/image'
import styles from './styles.module.css'
import AnimatedButton from '../AnimatedButton/animated-Button'
import { Separator } from '../ui/separator'
import { ArrowRight, CalendarCheck2, Hospital, UsersRound } from 'lucide-react'
import DentalStatsCounter from '../home-counter-section'
import Footer from './footer/footer'
import { auth } from '@/lib/auth'


export default async function HomePage() {
  const session = await auth()
  console.log(session);
  return (
    <>
      <section className={`${styles.hero} `}>
        <div className="container">
          <div className='w-full flex flex-col lg:items-center lg:flex-row '>
            <div className='flex-1 flex  items-start flex-col lg:gap-5 '>
              <h1 className='text-4xl lg:text-[54px] font-bold font-poppins text-mainDark  lg:leading-16'>
                Experience <span className='text-mainLight'> Dental  Excellence </span> with a Gentle Touch
              </h1>

              <div className='w-full flex justify-start mt-[20px]'>
                <p className='lg:max-w-[500px] text-md text-[#527282] '>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal</p>
              </div>

              <div className='mt-[20px]'>
                <AnimatedButton text='Make an Appointment' />
              </div>
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

      <section className='w-full bg-mainDark py-[25px]'>
        <div className="container">
          <div className='grid grid-cols-12 gap-5 lg:gap-0'>
            <div className='col-span-12 lg:col-span-8 grid grid-cols-8 gap-5 lg:gap-0'>
              <div className='w-full lg:col-span-4  col-span-12'>
                <div className='flex justify-between items-center h-full pe-2 xl:pe-18'>
                  <div className='flex justify-center items-center gap-4'>
                    <Image src="/icon-cta-phone.svg" width={33} height={33} alt='star' />
                    <div>
                      <h3 className='text-[20px] capitalize font-poppins font-semibold text-white mb-[10px]'>need dental services ?</h3>
                      <p className='font-poppins capitalize text-white'>Call on : (+01) 987 828 745</p>
                    </div>
                  </div>
                  <Separator orientation='vertical' className='bg-[#FFFFFF1F] hidden lg:block' />
                </div>
              </div>
              <div className='w-full lg:col-span-4  col-span-12 '>
                <div className='flex justify-between items-center h-full pe-18'>
                  <div className='flex justify-center items-center gap-4'>
                    <Image src="/icon-cta-time.svg" width={33} height={33} alt='star' />
                    <div>
                      <h3 className='text-[20px] capitalize font-poppins font-semibold text-white mb-[10px]'>opening hours</h3>
                      <p className='font-poppins capitalize text-white'>Mon to Sat 9:00AM to 9:00PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='lg:col-span-4 col-span-12 flex justify-center items-center'>
              <AnimatedButton text='Make an Appointment' />
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className='container my-20'>
        <div className='grid grid-cols-12 '>
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
          <div className='md:col-span-6 col-span-12 '>
            <div className={`${styles.sectionTitle} w-full`} >
              <div className='flex justify-start items-center gap-2 mb-5'>
                <Image src="/icon-sub-heading.svg" width={15} height={15} alt='star Icon' />
                <h3 className='capitalize font-poppins text-mainLight font-medium '>ABOUT US </h3>
              </div>
              <h4 className='capitalize font-poppins text-mainDark text-[30px] lg:text-[44px] font-bold leading-[35px] lg:leading-[55px] mb-10'><span className='text-mainLight'> Your Journey</span> to a Healthier Smile Begins Here</h4>
              <p className='text-[#527282] text-[16px] font-poppins lg:pe-8 mb-6'>The goal of our clinic is to provide friendly, caring dentistry and the highest level of general, cosmetic, and specialist dental treatments. With dental practices throughout the world.</p>
              <div className="grid md:grid-cols-2 gap-4 pt-4 mb-10">
                <div className="flex items-center gap-2 ">
                  <Image src="/success-icon-about.svg" width={22} height={22} alt='star Icon' />
                  <span className="font-semibold text-mainDark text-[16px] font-poppins">Experienced Team</span>
                </div>
                <div className="flex items-center gap-2 ">
                  <Image src="/success-icon-about.svg" width={22} height={22} alt='star Icon' />
                  <span className="font-semibold text-mainDark text-[16px] font-poppins">Comprehensive Services</span>
                </div>
                <div className="flex items-center gap-2 ">
                  <Image src="/success-icon-about.svg" width={22} height={22} alt='star Icon' />
                  <span className="font-semibold text-mainDark text-[16px] font-poppins">State-Of-The-Art Technology</span>
                </div>
                <div className="flex items-center gap-2 ">
                  <Image src="/success-icon-about.svg" width={22} height={22} alt='star Icon' />
                  <span className="font-semibold text-mainDark text-[16px] font-poppins">Emergency Dental Services</span>
                </div>
              </div>

              <div className='w-fit'>
                <AnimatedButton text='Read More About Us' />
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* Service Section */}
      <section className={`bg-[#eff8ff]`}>
        <div className='container py-18'>
          <div className='w-full flex justify-center items-center gap-2 mb-5'>
            <Image src="/icon-sub-heading.svg" width={15} height={15} alt='star Icon' />
            <h3 className='capitalize font-poppins text-mainLight font-medium '>OUR SERVICES </h3>
          </div>
          <h4 className='capitalize text-center font-poppins text-mainDark text-[30px] lg:text-[44px] font-bold leading-[35px] lg:leading-[55px] mb-6'><span className='text-mainLight'>Hight Quality</span>  Services for You.</h4>
          <p className='text-[#527282] text-[16px] font-poppins text-center'>We are committed to sustainability. eco-friendly initiatives.</p>
          <div className='grid grid-cols-4 gap-3 my-6'>
            <div className={`  col-span-4 md:col-span-1`}>
              <div className={`${styles.servicesCard} flex flex-col bg-white p-[30px] rounded-2xl shadow group`}>
                <div className='z-10'>
                  <Image src='/icon-services-1.svg' width={60} height={60} className={`transition-all duration-500 ease-in-out ${styles.serviceCardImage}`} alt='theeth icom' />
                  <h2 className='font-poppins text-[20px] mt-5 mb-3 capitalize font-semibold group-hover:text-white transition-all duration-500 ease-in-out '>general dental care</h2>
                  <p className='font-poppins text-[#527282]  group-hover:text-white transition-all duration-500 ease-in-out '>We are excited to meet you and provide the best dental care for your family.</p>
                  <p className='mt-5  cursor-pointer  group-hover:text-white group-hover:bg-mainDark transition-all duration-500 ease-in-out flex justify-start items-center gap-2 '>Read more <ArrowRight className='w-4 h-4' /></p>                  </div>
              </div>
            </div>
            <div className={`  col-span-4 md:col-span-1`}>
              <div className={`${styles.servicesCard} flex flex-col bg-white p-[30px] rounded-2xl shadow group`}>
                <div className='z-10'>
                  <Image src='/icon-services-2.svg' width={60} height={60} className={`transition-all duration-500 ease-in-out ${styles.serviceCardImage}`} alt='theeth icom' />
                  <h2 className='font-poppins text-[20px] mt-5 mb-3 capitalize font-semibold group-hover:text-white transition-all duration-500 ease-in-out '>general dental care</h2>
                  <p className='font-poppins text-[#527282]  group-hover:text-white transition-all duration-500 ease-in-out '>We are excited to meet you and provide the best dental care for your family.</p>
                  <p className='mt-5 cursor-pointer  group-hover:text-white group-hover:bg-mainDark transition-all duration-500 ease-in-out flex justify-start items-center gap-2 '>Read more <ArrowRight className='w-4 h-4' /></p>                  </div>
              </div>
            </div>
            <div className={`  col-span-4 md:col-span-1`}>
              <div className={`${styles.servicesCard} flex flex-col bg-white p-[30px] rounded-2xl shadow group`}>
                <div className='z-10'>
                  <Image src='/icon-services-3.svg' width={60} height={60} className={`transition-all duration-500 ease-in-out ${styles.serviceCardImage}`} alt='theeth icom' />
                  <h2 className='font-poppins text-[20px] mt-5 mb-3 capitalize font-semibold group-hover:text-white transition-all duration-500 ease-in-out '>general dental care</h2>
                  <p className='font-poppins text-[#527282]  group-hover:text-white transition-all duration-500 ease-in-out '>We are excited to meet you and provide the best dental care for your family.</p>
                  <p className='mt-5  cursor-pointer  group-hover:text-white group-hover:bg-mainDark transition-all duration-500 ease-in-out flex justify-start items-center gap-2 '>Read more <ArrowRight className='w-4 h-4' /></p>                  </div>
              </div>
            </div>
            <div className={`  col-span-4 md:col-span-1`}>
              <div className={`${styles.servicesCard} flex flex-col bg-white p-[30px] rounded-2xl shadow group`}>
                <div className='z-10'>
                  <Image src='/icon-services-4.svg' width={60} height={60} className={`transition-all duration-500 ease-in-out ${styles.serviceCardImage}`} alt='theeth icom' />
                  <h2 className='font-poppins text-[20px] mt-5 mb-3 capitalize font-semibold group-hover:text-white transition-all duration-500 ease-in-out '>general dental care</h2>
                  <p className='font-poppins text-[#527282]  group-hover:text-white transition-all duration-500 ease-in-out '>We are excited to meet you and provide the best dental care for your family.</p>
                  <p className='mt-5 cursor-pointer  group-hover:text-white group-hover:bg-mainDark transition-all duration-500 ease-in-out flex justify-start items-center gap-2 '>Read more <ArrowRight className='w-4 h-4' /></p>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full flex justify-center items-center'>
            <p className='max-w-[500px]  p-5 mt-5 text-[#527282] text-[16px] font-poppins text-center'>We believe in using the latest technology and techniques to ensure the best outcomes for our patients.</p>
          </div>


          <div className='w-full flex justify-center items-center'>
            <AnimatedButton text='View All Services' />
          </div>
        </div>
      </section>

      {/* Clinic Visit Section */}
      <section className='w-[98%] mx-auto my-12'>
        <div className={` ${styles.clinicSection}`}>
          <div className={`${styles.visitClinicContent}`}>
            <div className="mb-[40px]">
              <div className={`${styles.visitClinicHeading}flex justify-center items-center gap-2 mb-5`}>
                <Image src="/icon-sub-heading.svg" className={`${styles.visitImage}`} width={15} height={15} alt='star Icon' />
                <h3 className={`font-poppins font-normal uppercase text-white tracking-[2.8px]`} >visit clinic</h3>
              </div>
              <h2 className="font-poppins text-xl max-w-3/4 mx-auto lg:max-w-full lg:text-[44px] text-white font-bold">Comprehensive Dental Care For All Ages</h2>
              <div className='w-fit mx-auto mt-8'>
                <AnimatedButton text='Make an Appointment' />
              </div>
            </div>
          </div>
        </div>
      </section>


      <DentalStatsCounter />


      {/* Why Choose Us Section */}
      <section className='bg-[#eff8ff]'>
        <div className='container py-18'>
          <div className='w-full flex justify-center items-center gap-2 mb-5'>
            <Image src="/icon-sub-heading.svg" width={15} height={15} alt='star Icon' />
            <h3 className='capitalize font-poppins text-mainLight font-medium tracking-[2.8px]'>WHY CHOOSE US </h3>
          </div>
          <h4 className='capitalize text-center font-poppins text-mainDark text-[30px] lg:text-[44px] font-bold leading-[35px] lg:leading-[55px] mb-6'><span className='text-mainLight'>Diagnosis of</span>  Dental Diseases</h4>
          <p className='text-[#527282] text-[16px] font-poppins text-center'>We are committed to sustainability. eco-friendly initiatives.</p>
          {/* grid */}
          <div className='grid grid-cols-3 mt-5 gap-5 '>
            <div className='col-span-3 md:col-span-1 my-auto '>
              <div className='flex flex-col gap-12 justify-center '>
                <div className='flex justify-center items-center gap-3 '>
                  <div className=''>
                    <h3 className='capitalize text-[20px] font-poppins text-mainDark font-semibold text-right'>experienced doctor</h3>
                    <p className='text-[#527282] font-poppins text-right'>The goal of our clinic is to provide friendly, caring dentistry and the.</p>
                  </div>
                  <Image src="/icon-why-us-1.svg" alt='Why us icon' width={50} height={50} />
                </div>
                <div className='flex justify-center items-center gap-3 '>
                  <div className=''>
                    <h3 className='capitalize text-[20px] font-poppins text-mainDark font-semibold text-right'>personalized care</h3>
                    <p className='text-[#527282] font-poppins text-right'>The goal of our clinic is to provide friendly, caring dentistry and the.</p>
                  </div>
                  <Image src="/icon-why-us-2.svg" alt='Why us icon' width={50} height={50} />
                </div>
                <div className='flex justify-center items-center gap-3 '>
                  <div className=''>
                    <h3 className='capitalize text-[20px] font-poppins text-mainDark font-semibold text-right'>flexible payment options</h3>
                    <p className='text-[#527282] font-poppins text-right'>The goal of our clinic is to provide friendly, caring dentistry and the.</p>
                  </div>
                  <Image src="/icon-why-us-3.svg" alt='Why us icon' width={50} height={50} />
                </div>
              </div>
            </div>
            <div className='col-span-3 md:col-span-1  flex justify-center items-center'>
              <Image src='/why-choose-us-img.png' alt='why us image' width={350} height={350} />
            </div>
            <div className='col-span-3 md:col-span-1 my-auto '>
              <div className='flex flex-col gap-12 justify-center '>
                <div className='flex justify-center items-center gap-3 '>
                  <Image src="/icon-why-us-4.svg" alt='Why us icon' width={50} height={50} />
                  <div className=''>
                    <h3 className='capitalize text-[20px] font-poppins text-mainDark font-semibold text-left'>emergency services</h3>
                    <p className='text-[#527282] font-poppins text-left'>The goal of our clinic is to provide friendly, caring dentistry and the.</p>
                  </div>
                </div>
                <div className='flex justify-center items-center gap-3 '>
                  <Image src="/icon-why-us-5.svg" alt='Why us icon' width={50} height={50} />
                  <div className=''>
                    <h3 className='capitalize text-[20px] font-poppins text-mainDark font-semibold text-left'>positive patient reviews</h3>
                    <p className='text-[#527282] font-poppins text-left'>The goal of our clinic is to provide friendly, caring dentistry and the.</p>
                  </div>
                </div>
                <div className='flex justify-center items-center gap-3 '>
                  <Image src="/icon-why-us-6.svg" alt='Why us icon' width={50} height={50} />
                  <div className=''>
                    <h3 className='capitalize text-[20px] font-poppins text-mainDark font-semibold text-left'>latest technology</h3>
                    <p className='text-[#527282] font-poppins text-left'>The goal of our clinic is to provide friendly, caring dentistry and the.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* How It Works */}
      <section className='container py-16'>
        <div className='flex flex-col md:flex-row justify-center items-center'>
          {/* Image */}
          <div className='w-full md:w-1/2 rounded-2xl flex justify-center items-center'>
            <figure className={`${styles.imageAnime}  ${styles.reveal} w-[88%] mx-auto`} style={{ transform: "translate(0px, 0px)", opacity: "1", visibility: "inherit" }}>
              <Image src='/how-it-work-img.jpg' style={{ transform: "translate(0px, 0px)" }} className='rounded-2xl w-full' alt='how it works image' width={600} height={600} />
            </figure>
          </div>
          {/* Content */}
          <div className='w-full md:w-1/2 mt-5 md:mt-0'>
            <div className='flex md:justify-start justify-center items-center gap-2 mb-5 '>
              <Image src="/icon-sub-heading.svg" width={15} height={15} alt='star Icon' />
              <h3 className='capitalize font-poppins text-mainLight font-medium tracking-[2.8px]'>HOW IT WORKS </h3>
            </div>
            <h4 className="capitalize font-poppins text-mainDark text-[30px] lg:text-[44px] font-bold leading-[35px] lg:leading-[55px] mb-10 text-center md:text-left">
              <span className="text-mainLight">What We Do</span> for Your
              <br />
              Teeth
            </h4>
            <p className='text-[#527282] text-[16px] font-poppins lg:pe-8 mb-6 text-center md:text-left'>The goal of our clinic is to provide friendly, caring dentistry and the highest level of general, cosmetic, and specialist dental treatments. With dental practices throughout the world.</p>
            <div className='flex items-center gap-4'>
              <CalendarCheck2 className='w-10 h-10 text-mainLight' />
              <div>
                <h4 className='font-poppins text-2xl font-semibold text-mainDark'>Book an Appointment</h4>
                <p className='text-[#527282]'>Book an appointment with our dental clinic.</p>
              </div>
            </div>
            <div className='flex items-center gap-4 mt-5'>
              <Hospital className='w-14 h-14 text-mainLight' />
              <div>
                <h4 className='font-poppins text-2xl font-semibold text-mainDark'>What conditions can manual therapy treat?</h4>
                <p className='text-[#527282]'>The goal of our clinic is to provide friendly, caring dentistry and the highest level of general, cosmetic, ents.</p>
              </div>
            </div>
            <div className='flex items-center gap-4 mt-5'>
              <UsersRound className='w-14 h-14 text-mainLight' />
              <div>
                <h4 className='font-poppins text-2xl font-semibold text-mainDark'>Expert care</h4>
                <p className='text-[#527282]'>The goal of our clinic is to provide friendly, caring dentistry and the highest level of general, cosmetic, ents.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Our Team */}
      <section className={`${styles.ourTeam} `}>
        <div className='container py-16'>
          <div className='w-full flex justify-center items-center gap-2 mb-3'>
            <Image src="/icon-sub-heading.svg" width={15} height={15} alt='star Icon' />
            <h3 className='capitalize font-poppins text-mainLight font-medium tracking-[2.8px]'>OUR TEAM </h3>
          </div>
          <h4 className='capitalize text-center font-poppins text-mainDark text-[30px] lg:text-[44px] font-bold leading-[35px] lg:leading-[55px] mb-2'><span className='text-mainLight'>Our Friendly </span> Dentists Team</h4>
          <p className='text-[#527282] text-[16px] font-poppins text-center'>We are committed to sustainability. eco-friendly initiatives.</p>
          {/* Grid  */}
          <div className='grid grid-cols-4 gap-3 mt-5'>

            <div className='col-span-4 md:col-span-2 xl:col-span-1 '>
              <div className='relative overflow-hidden z-0 group rounded-3xl'>
                <figure className={`${styles.imageAnime}  ${styles.reveal} w-full h-full group-hover:scale-[1.1] transition-all duration-500 ease-in-out `} style={{ transform: "translate(0px, 0px)", opacity: "1", visibility: "inherit" }}>
                  <Image
                    src='/team-1.jpg'
                    className='rounded-3xl w-full  origin-center aspect-square'
                    alt='team member image'
                    width={250}
                    height={350}
                  />
                </figure>

                <div className='w-1/2 md:w-[58%] mx-auto flex justify-between items-center  absolute -bottom-10 left-1/2 -translate-x-1/2  group-hover:bottom-3 transition-all duration-500 ease-in-out'>
                  <div className='w-[38px] h-[38px] bg-mainDark flex justify-center items-center rounded-[6px] text-white hover:bg-mainLight transition-all duration-500 ease-in-out  cursor-pointer'>
                    <Image src='/our-team-icon-1.svg' className={`${styles.ourTeamSocialIcon}`} width={25} height={25} alt='social icon' />
                  </div>
                  <div className='w-[38px] h-[38px] bg-mainDark flex justify-center items-center rounded-[6px] text-white hover:bg-mainLight transition-all duration-500 ease-in-out  cursor-pointer'>
                    <Image src='/our-team-icon-2.svg' className={`${styles.ourTeamSocialIcon}`} width={25} height={25} alt='social icon' />
                  </div>
                  <div className='w-[38px] h-[38px] bg-mainDark flex justify-center items-center rounded-[6px] text-white hover:bg-mainLight transition-all duration-500 ease-in-out  cursor-pointer'>
                    <Image src='/our-team-icon-3.svg' className={`${styles.ourTeamSocialIcon}`} width={25} height={25} alt='social icon' />
                  </div>
                  <div className='w-[38px] h-[38px] bg-mainDark flex justify-center items-center rounded-[6px] text-white hover:bg-mainLight transition-all duration-500 ease-in-out  cursor-pointer'>
                    <Image src='/our-team-icon-4.svg' className={`${styles.ourTeamSocialIcon}`} width={25} height={25} alt='social icon' />
                  </div>
                </div>


              </div>
              <div>
                <h3 className='text-[20px] capitalize text-mainDark text-center font-bold'>dr. johan joe</h3>
                <p className='text-[#527282] text-[16px] font-poppins text-center'>lead dentist</p>
              </div>
            </div>


            <div className='col-span-4 md:col-span-2 xl:col-span-1 '>
              <div className='relative overflow-hidden z-0 group rounded-3xl'>
                <figure className={`${styles.imageAnime}  ${styles.reveal} w-full group-hover:scale-[1.1] transition-all duration-500 ease-in-out`} style={{ transform: "translate(0px, 0px)", opacity: "1", visibility: "inherit" }}>
                  <Image src='/team-2.jpg' style={{ transform: "translate(0px, 0px)" }} className='rounded-3xl w-full' alt='how it works image' width={250} height={350} />
                </figure>

                <div className='w-1/2 md:w-[58%] mx-auto flex justify-between items-center  absolute -bottom-10 left-1/2 -translate-x-1/2  group-hover:bottom-3 transition-all duration-500 ease-in-out'>
                  <div className='w-[38px] h-[38px] bg-mainDark flex justify-center items-center rounded-[6px] text-white hover:bg-mainLight transition-all duration-500 ease-in-out  cursor-pointer'>
                    <Image src='/our-team-icon-1.svg' className={`${styles.ourTeamSocialIcon}`} width={25} height={25} alt='social icon' />
                  </div>
                  <div className='w-[38px] h-[38px] bg-mainDark flex justify-center items-center rounded-[6px] text-white hover:bg-mainLight transition-all duration-500 ease-in-out  cursor-pointer'>
                    <Image src='/our-team-icon-2.svg' className={`${styles.ourTeamSocialIcon}`} width={25} height={25} alt='social icon' />
                  </div>
                  <div className='w-[38px] h-[38px] bg-mainDark flex justify-center items-center rounded-[6px] text-white hover:bg-mainLight transition-all duration-500 ease-in-out  cursor-pointer'>
                    <Image src='/our-team-icon-3.svg' className={`${styles.ourTeamSocialIcon}`} width={25} height={25} alt='social icon' />
                  </div>
                  <div className='w-[38px] h-[38px] bg-mainDark flex justify-center items-center rounded-[6px] text-white hover:bg-mainLight transition-all duration-500 ease-in-out  cursor-pointer'>
                    <Image src='/our-team-icon-4.svg' className={`${styles.ourTeamSocialIcon}`} width={25} height={25} alt='social icon' />
                  </div>
                </div>


              </div>
              <div>
                <h3 className='text-[20px] capitalize text-mainDark text-center font-bold'>dr. mike johnson</h3>
                <p className='text-[#527282] text-[16px] font-poppins text-center'>senior dantist</p>
              </div>
            </div>

            <div className='col-span-4 md:col-span-2 xl:col-span-1 '>
              <div className='relative overflow-hidden z-0 group rounded-3xl'>
                <figure className={`${styles.imageAnime}  ${styles.reveal} w-full group-hover:scale-[1.1] transition-all duration-500 ease-in-out`} style={{ transform: "translate(0px, 0px)", opacity: "1", visibility: "inherit" }}>
                  <Image src='/team-3.jpg' style={{ transform: "translate(0px, 0px)" }} className='rounded-3xl w-full' alt='how it works image' width={250} height={350} />
                </figure>

                <div className='w-1/2 md:w-[58%] mx-auto flex justify-between items-center  absolute -bottom-10 left-1/2 -translate-x-1/2  group-hover:bottom-3 transition-all duration-500 ease-in-out'>
                  <div className='w-[38px] h-[38px] bg-mainDark flex justify-center items-center rounded-[6px] text-white hover:bg-mainLight transition-all duration-500 ease-in-out  cursor-pointer'>
                    <Image src='/our-team-icon-1.svg' className={`${styles.ourTeamSocialIcon}`} width={25} height={25} alt='social icon' />
                  </div>
                  <div className='w-[38px] h-[38px] bg-mainDark flex justify-center items-center rounded-[6px] text-white hover:bg-mainLight transition-all duration-500 ease-in-out  cursor-pointer'>
                    <Image src='/our-team-icon-2.svg' className={`${styles.ourTeamSocialIcon}`} width={25} height={25} alt='social icon' />
                  </div>
                  <div className='w-[38px] h-[38px] bg-mainDark flex justify-center items-center rounded-[6px] text-white hover:bg-mainLight transition-all duration-500 ease-in-out  cursor-pointer'>
                    <Image src='/our-team-icon-3.svg' className={`${styles.ourTeamSocialIcon}`} width={25} height={25} alt='social icon' />
                  </div>
                  <div className='w-[38px] h-[38px] bg-mainDark flex justify-center items-center rounded-[6px] text-white hover:bg-mainLight transition-all duration-500 ease-in-out  cursor-pointer'>
                    <Image src='/our-team-icon-4.svg' className={`${styles.ourTeamSocialIcon}`} width={25} height={25} alt='social icon' />
                  </div>
                </div>


              </div>
              <div>
                <h3 className='text-[20px] capitalize text-mainDark text-center font-bold'>dr. alison banson</h3>
                <p className='text-[#527282] text-[16px] font-poppins text-center'>orthodontist</p>
              </div>
            </div>

            <div className='col-span-4 md:col-span-2 xl:col-span-1 '>
              <div className='relative overflow-hidden z-0 group rounded-3xl'>
                <figure className={`${styles.imageAnime}  ${styles.reveal}  w-full group-hover:scale-[1.1] transition-all duration-500 ease-in-out`} style={{ transform: "translate(0px, 0px)", opacity: "1", visibility: "inherit" }}>
                  <Image src='/team-4.jpg' style={{ transform: "translate(0px, 0px)" }} className='rounded-3xl w-full' alt='how it works image' width={250} height={350} />
                </figure>

                <div className='w-1/2 md:w-[58%] mx-auto flex justify-between items-center  absolute -bottom-10 left-1/2 -translate-x-1/2  group-hover:bottom-3 transition-all duration-500 ease-in-out'>
                  <div className='w-[38px] h-[38px] bg-mainDark flex justify-center items-center rounded-[6px] text-white hover:bg-mainLight transition-all duration-500 ease-in-out  cursor-pointer'>
                    <Image src='/our-team-icon-1.svg' className={`${styles.ourTeamSocialIcon}`} width={25} height={25} alt='social icon' />
                  </div>
                  <div className='w-[38px] h-[38px] bg-mainDark flex justify-center items-center rounded-[6px] text-white hover:bg-mainLight transition-all duration-500 ease-in-out  cursor-pointer'>
                    <Image src='/our-team-icon-2.svg' className={`${styles.ourTeamSocialIcon}`} width={25} height={25} alt='social icon' />
                  </div>
                  <div className='w-[38px] h-[38px] bg-mainDark flex justify-center items-center rounded-[6px] text-white hover:bg-mainLight transition-all duration-500 ease-in-out  cursor-pointer'>
                    <Image src='/our-team-icon-3.svg' className={`${styles.ourTeamSocialIcon}`} width={25} height={25} alt='social icon' />
                  </div>
                  <div className='w-[38px] h-[38px] bg-mainDark flex justify-center items-center rounded-[6px] text-white hover:bg-mainLight transition-all duration-500 ease-in-out  cursor-pointer'>
                    <Image src='/our-team-icon-4.svg' className={`${styles.ourTeamSocialIcon}`} width={25} height={25} alt='social icon' />
                  </div>
                </div>


              </div>
              <div>
                <h3 className='text-[20px] capitalize text-mainDark text-center font-bold'>dr.christopher case</h3>
                <p className='text-[#527282] text-[16px] font-poppins text-center'>periodontist</p>
              </div>
            </div>


          </div>
        </div>
      </section>


      {/* Location Section */}
      <section className='container py-16'>
        <div className='flex flex-col md:flex-row justify-center items-center gap-10'>
          <div className='w-full md:w-1/2'>
            <div className={`${styles.contactGoogleMap}`}>
              <div className={`${styles.googleMapIframe}`}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96737.10562045308!2d-74.08535042841811!3d40.739265258395164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1703158537552!5m2!1sen!2sin" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
          </div>
          <div className='w-full md:w-1/2'>
            <div className='flex md:justify-start justify-center items-center gap-2 mb-3 '>
              <Image src="/icon-sub-heading.svg" width={15} height={15} alt='star Icon' />
              <h3 className='capitalize font-poppins text-mainLight font-medium tracking-[2.8px]'>CONTACT NOW </h3>
            </div>
            <h4 className="capitalize font-poppins text-mainDark text-[30px] lg:text-[44px] font-bold leading-[35px] lg:leading-[55px] mb-10 text-center md:text-left">
              <span className="text-mainLight">Get Free</span>  Professional Consultation
            </h4>

            <div className={`${styles.contactNowInfo}`}>
              <div className={`${styles.contactInfoList} wow fadeInUp`}>
                <div className={`${styles.iconBox}`}>
                  <img src="/icon-location.svg" alt="" />
                </div>

                <div className={`${styles.contactInfoContent}`}>
                  <p>24/11 Robert Road , New York , USA</p>
                </div>
              </div>

              <div className={`${styles.contactInfoList} wow fadeInUp`}>
                <div className={`${styles.iconBox}`}>
                  <img src="/icon-phone.svg" alt="" />
                </div>

                <div className={`${styles.contactInfoContent}`}>
                  <p>+(123) 698-5245</p>
                </div>
              </div>

              <div className={`${styles.contactInfoList} wow fadeInUp`} >
                <div className={`${styles.iconBox}`}>
                  <img src="/icon-mail.svg" alt="" />
                </div>

                <div className={`${styles.contactInfoContent}`}>
                  <p>info@domain.com</p>
                </div>
              </div>

              <div className={`${styles.contactInfoList} wow fadeInUp`}>
                <div className={`${styles.iconBox}`}>
                  <img src="/icon-clock.svg" alt="" />
                </div>

                <div className={`${styles.contactInfoContent}`}>
                  <p>Mon to Sat 9:00AM to 9:00PM</p>
                </div>
              </div>
            </div>


            <div className='w-fit'>
              <AnimatedButton text='Make An Appointment' />
            </div>

          </div>
        </div>
      </section>


      <Footer />

    </>
  )
}