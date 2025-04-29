"use client"

import { useEffect, useRef, useState } from "react"
import { Separator } from "./ui/separator"

interface StatItem {
  value: number
  suffix: string
  label: string
  description: string
}

export default function DentalStatsCounter() {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0])
  const sectionRef = useRef<HTMLDivElement>(null)

  const stats: StatItem[] = [
    {
      value: 75,
      suffix: "+",
      label: "Insurance Covered",
      description: "Our team loves dental trivia. Did you know that tooth enamel.",
    },
    {
      value: 2000,
      suffix: "",
      label: "Realized Projects",
      description: "Our team loves dental trivia. Did you know that tooth enamel.",
    },
    {
      value: 22000,
      suffix: "",
      label: "Happy Customers",
      description: "Our team loves dental trivia. Did you know that tooth enamel.",
    },
    {
      value: 18,
      suffix: "+",
      label: "Experience Doctors",
      description: "Our team loves dental trivia. Did you know that tooth enamel.",
    },
  ]

  // Format numbers with K for thousands
  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K"
    }
    return num.toString()
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }, // Trigger when at least 10% of the element is visible
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 3000 // 2 seconds for the animation
    const frameDuration = 1000 / 60 // 60fps
    const totalFrames = Math.round(duration / frameDuration)

    let frame = 0
    const countUp = () => {
      frame++
      const progress = frame / totalFrames
      const easedProgress = easeOutQuad(progress)

      const newCounts = stats.map((stat, index) => {
        return Math.floor(easedProgress * stat.value)
      })

      setCounts(newCounts)

      if (frame < totalFrames) {
        requestAnimationFrame(countUp)
      } else {
        // Ensure we end with the exact target values
        setCounts(stats.map((stat) => stat.value))
      }
    }

    requestAnimationFrame(countUp)
  }, [isVisible])

  // Easing function for smoother animation
  const easeOutQuad = (t: number): number => {
    return t * (2 - t)
  }

  return (
    <section ref={sectionRef} className="w-full py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto font-poppins px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center md:text-left">
              <h3 className="text-4xl md:text-5xl font-bold text-[#0e384c] mb-2">
                {isVisible ? formatNumber(counts[index]) : "0"}
                {stat.suffix}
              </h3>
              <p className="text-lg font-medium text-[#0e384c] mb-4">{stat.label}</p>
              {/* <div className="w-16 h-0.5 bg-gray-200 mb-4 mx-auto md:mx-0"></div> */}
              <Separator className="my-2 h-[0.5px]!" />
              <p className="text-gray-600">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

