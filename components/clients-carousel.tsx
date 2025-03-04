"use client"

import { useRef, useEffect } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import Image from "next/image"

// Sample client logos - in a real project, you would replace these with actual client logos
const clients = [
  { id: 1, name: "TechCorp", logo: "/placeholder.svg?height=80&width=180" },
  { id: 2, name: "InnovateTech", logo: "/placeholder.svg?height=80&width=180" },
  { id: 3, name: "FutureSystems", logo: "/placeholder.svg?height=80&width=180" },
  { id: 4, name: "GlobalConnect", logo: "/placeholder.svg?height=80&width=180" },
  { id: 5, name: "SecureNet", logo: "/placeholder.svg?height=80&width=180" },
  { id: 6, name: "DataFlow", logo: "/placeholder.svg?height=80&width=180" },
  { id: 7, name: "CloudNine", logo: "/placeholder.svg?height=80&width=180" },
  { id: 8, name: "QuantumTech", logo: "/placeholder.svg?height=80&width=180" },
  // Duplicate logos to create the continuous loop effect
  { id: 9, name: "TechCorp", logo: "/placeholder.svg?height=80&width=180" },
  { id: 10, name: "InnovateTech", logo: "/placeholder.svg?height=80&width=180" },
  { id: 11, name: "FutureSystems", logo: "/placeholder.svg?height=80&width=180" },
  { id: 12, name: "GlobalConnect", logo: "/placeholder.svg?height=80&width=180" },
  { id: 13, name: "SecureNet", logo: "/placeholder.svg?height=80&width=180" },
  { id: 14, name: "DataFlow", logo: "/placeholder.svg?height=80&width=180" },
  { id: 15, name: "CloudNine", logo: "/placeholder.svg?height=80&width=180" },
  { id: 16, name: "QuantumTech", logo: "/placeholder.svg?height=80&width=180" },
]

export default function ClientsCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  // Start the animation when the component mounts
  useEffect(() => {
    const marqueeAnimation = async () => {
      if (!carouselRef.current) return

      // Get the width of the carousel content
      const carouselWidth = carouselRef.current.scrollWidth
      const viewportWidth = carouselRef.current.offsetWidth

      // Only animate if the content is wider than the viewport
      if (carouselWidth <= viewportWidth) return

      // Set initial position
      await controls.start({
        x: 0,
        transition: { duration: 0 },
      })

      // Start the continuous animation
      // The duration is based on the content width - the longer the content, the slower the scroll
      await controls.start({
        x: -carouselWidth / 2,
        transition: {
          duration: carouselWidth * 0.01, // Adjust this multiplier to control speed
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        },
      })
    }

    marqueeAnimation()

    // When window resizes, restart the animation to adjust for new dimensions
    const handleResize = () => marqueeAnimation()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      controls.stop()
    }
  }, [controls])

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-amber-950 to-slate-950 text-white overflow-hidden">
      <div className="container mx-auto px-4 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Trusted Clients</h2>
          <p className="max-w-2xl mx-auto text-gray-400">
            We're proud to work with industry-leading companies across various sectors
          </p>
        </motion.div>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Gradient fades on the sides */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-amber-950 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-slate-950 to-transparent" />

        {/* The carousel */}
        <motion.div ref={carouselRef} className="flex items-center py-8" animate={controls}>
          {clients.map((client) => (
            <motion.div
              key={client.id}
              className="mx-8 flex-shrink-0 relative group"
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-slate-800/50 p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm h-28 w-48 flex items-center justify-center relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                <Image
                  src={client.logo || "/placeholder.svg"}
                  alt={client.name}
                  width={150}
                  height={60}
                  className="max-h-16 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <motion.div
                className="h-1 w-0 bg-gradient-to-r from-cyan-500 to-purple-500 mt-1 rounded-full mx-auto"
                initial={{ width: 0 }}
                whileHover={{ width: "80%" }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating decorative elements */}
      <div className="relative h-20">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
            style={{
              left: `${15 + i * 15}%`,
              bottom: `${Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </section>
  )
}

