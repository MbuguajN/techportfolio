"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import { Code, Database, Cpu, Server, Shield, Wifi } from "lucide-react"
import { Button } from "@/components/ui/button"

// Tech words that will cycle through
const techWords = ["Innovation", "Technology", "Security", "Connectivity", "Intelligence", "Solutions"]

// Tech icons that will float around
const techIcons = [
  { Icon: Code, color: "#3b82f6" },
  { Icon: Database, color: "#8b5cf6" },
  { Icon: Cpu, color: "#ec4899" },
  { Icon: Server, color: "#10b981" },
  { Icon: Shield, color: "#f59e0b" },
  { Icon: Wifi, color: "#06b6d4" },
]

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(heroRef)
  const controls = useAnimation()

  // Cycle through tech words
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % techWords.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Start animations when in view
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900"
    >
      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Very slow floating icons */}
      {techIcons.map((icon, i) => {
        const { Icon, color } = icon
        const size = Math.random() * 20 + 15
        const startX = Math.random() * 80 + 10
        const startY = Math.random() * 80 + 10

        return (
          <motion.div
            key={`icon-${i}`}
            className="absolute pointer-events-none"
            style={{
              left: `${startX}%`,
              top: `${startY}%`,
              opacity: 0.2,
            }}
            animate={{
              x: [0, Math.random() * 20 - 10, 0],
              y: [0, Math.random() * 20 - 10, 0],
            }}
            transition={{
              duration: Math.random() * 60 + 80, // Extremely slow animation
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <div
              className="rounded-full p-3 flex items-center justify-center"
              style={{
                backgroundColor: `${color}10`,
                boxShadow: `0 0 20px ${color}22`,
                border: `1px solid ${color}22`,
              }}
            >
              <Icon style={{ color: color }} size={size} />
            </div>
          </motion.div>
        )
      })}

      {/* Content - Centered */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        {/* Professional Animated Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-10"
        >
          <div className="relative w-32 h-32 mx-auto">
            {/* Base shape */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-blue-500/20 shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            />

            {/* Outer ring */}
            <motion.div
              className="absolute inset-0.5 rounded-full border border-blue-400/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              {/* Connection nodes on outer ring */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                const radian = (angle * Math.PI) / 180
                const x = 50 + 42 * Math.cos(radian)
                const y = 50 + 42 * Math.sin(radian)

                return (
                  <motion.div
                    key={`node-${i}`}
                    className="absolute w-1 h-1 rounded-full bg-blue-400"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    animate={{
                      opacity: [0.3, 0.7, 0.3],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.5,
                    }}
                  />
                )
              })}
            </motion.div>

            {/* Middle ring */}
            <motion.div
              className="absolute inset-[4px] rounded-full border border-purple-500/20"
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />

            {/* Inner hexagon */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <motion.path
                  d="M12 2L4 7l8 5 8-5-8-5zM4 12l8 5 8-5M4 17l8 5 8-5"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.8 }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Central core */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center"
              animate={{
                boxShadow: [
                  "0 0 0px rgba(59, 130, 246, 0)",
                  "0 0 10px rgba(59, 130, 246, 0.5)",
                  "0 0 0px rgba(59, 130, 246, 0)",
                ],
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            >
              <motion.div
                className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <span className="text-white text-xs font-bold">T</span>
              </motion.div>
            </motion.div>

            {/* Subtle data pulse */}
            {[1, 2, 3].map((i) => (
              <motion.div
                key={`pulse-${i}`}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/10"
                initial={{ width: 10, height: 10, opacity: 0 }}
                animate={{
                  width: [10, 50],
                  height: [10, 50],
                  opacity: [0, 0.2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 1.3,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* Company Name */}
            <motion.div
              className="absolute -bottom-8 left-0 right-0 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <h3 className="text-sm font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                TRAVERSITY
              </h3>
              <p className="text-[9px] text-gray-400 tracking-widest uppercase">Technologies</p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-6 max-w-3xl"
        >
          {/* Animated badge */}
          <motion.div
            className="inline-block rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 p-px mb-4"
            animate={{
              boxShadow: [
                "0 0 0px rgba(6, 182, 212, 0)",
                "0 0 10px rgba(6, 182, 212, 0.5)",
                "0 0 0px rgba(6, 182, 212, 0)",
              ],
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
          >
            <div className="rounded-full bg-black/50 backdrop-blur-md px-4 py-1.5">
              <span className="text-sm font-medium text-white">Next-Gen Technology Solutions</span>
            </div>
          </motion.div>

          {/* Main heading with TIGHTER spacing */}
          <div className="leading-none">
            <motion.div
              className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Powering Your
            </motion.div>

            <div className="h-[1em] relative text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentWordIndex}
                  className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {techWords[currentWordIndex]}
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div
              className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              Journey
            </motion.div>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.div className="mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <p className="max-w-2xl mx-auto text-lg text-gray-300 sm:text-xl">
            Innovative technology solutions that drive business growth
          </p>
        </motion.div>

        {/* Animated buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0"
            >
              <span>Explore Our Services</span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-950/30">
              <span>Contact Us</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 mx-auto w-full flex justify-center items-center"
        animate={{
          y: [0, 5, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-400 mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        </div>
      </motion.div>

      {/* Subtle corner decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M0 0L100 0L100 20L20 20L20 100L0 100L0 0Z"
            fill="rgba(6, 182, 212, 0.2)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M100 100L0 100L0 80L80 80L80 0L100 0L100 100Z"
            fill="rgba(124, 58, 237, 0.2)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
          />
        </svg>
      </div>
    </section>
  )
}

