import styles from './styles.module.css'

export default function AnimatedButton({text}: {text: string}) {
  return (
    <div className={`bg-mainLight cursor-pointer hover:bg-transparent transition-all ease-in duration-500 text-white font-semibold rounded-[99px] overflow-hidden  py-[11px] pe-[50px] ps-[15px]
       relative
   ${styles.btn}
   `}>
      <span className="relative z-[2]">{text || "Book Appointment"}</span>
    </div>
  )
}