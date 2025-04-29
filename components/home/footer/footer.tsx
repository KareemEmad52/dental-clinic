import Image from 'next/image'
import styles from './styles.module.css'

export default function Footer() {
  return <>
    <footer className={`${styles.mainFooter}`}>
      <div className="container py-10">
        <div className="flex flex-col md:flex-row ">
          <div className="w-full md:w-1/4  flex flex-col gap-5 ">
            <img src="/footer-logo.svg" alt="logo" className='w-[70%]' />
            <p className='font-poppins text-white'>The goal our clinic is provide friendly, caring dentistry and highest level of general, cosmetic, and specialist dental treatments.</p>
          </div>
          <div className="w-full md:w-1/4 md:ps-5 font-poppins text-white">
            <div className={`${styles.footerLinks} ${styles.footerQuickLinks}}`}>
              <h3>quick links</h3>
              <ul>
                <li><a href="#">home</a></li>
                <li><a href="#">about us</a></li>
                <li><a href="#">services</a></li>
                <li><a href="#">book apoointment</a></li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-1/4 text-white font-poppins">
            <div className={`${styles.footerLinks} ${styles.footerQuickLinks}}`}>
              <h3>social media</h3>
              <ul>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Youtube</a></li>
                <li><a href="#">Instegram</a></li>
                <li><a href="#">Linkedin</a></li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-1/4 text-white font-poppins">
            <div className={`${styles.footerLinks} ${styles.footerContactLinks}`}>
              <h3>contact us</h3>
              <ul>
                <li><a href="#">info@domain.com</a></li>
                <li><a href="#">+(123) 698-5245</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </>
}