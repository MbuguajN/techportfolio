"use client"

import { useEffect } from "react"

import { useRef, useState } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Camera, Shield, Eye, Video, CheckCircle, Monitor, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CctvSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])

  // State for interactive camera view
  const [activeZone, setActiveZone] = useState<number | null>(null)
  const [motionDetected, setMotionDetected] = useState(false)

  // Toggle motion detection every 5 seconds
  useEffect(() => {
    if (!isInView) return

    const interval = setInterval(() => {
      setMotionDetected((prev) => !prev)

      // Auto-select a random zone when motion is detected
      if (!motionDetected) {
        const randomZone = Math.floor(Math.random() * securityZones.length) + 1
        setActiveZone(randomZone)

        // Clear the zone after 3 seconds
        setTimeout(() => {
          setActiveZone(null)
        }, 3000)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isInView, motionDetected])

  // Security zones for interactive demo
  const securityZones = [
    { id: 1, x: "20%", y: "30%", label: "Entry Gate" },
    { id: 2, x: "70%", y: "25%", label: "Perimeter" },
    { id: 3, x: "40%", y: "70%", label: "Main Office" },
    { id: 4, x: "80%", y: "60%", label: "Parking" },
  ]

  // Features with animated icons
  const features = [
    {
      icon: Shield,
      text: "Advanced security protocols with motion detection",
      detail: "AI-powered analytics detect suspicious activities in real-time",
    },
    {
      icon: Eye,
      text: "Remote monitoring via mobile and desktop",
      detail: "Access your security feeds from anywhere, anytime",
    },
    {
      icon: Video,
      text: "High-definition video capture and storage",
      detail: "Crystal clear 4K resolution with smart compression technology",
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-slate-950 to-slate-900 text-white overflow-hidden">
      <motion.div className="container mx-auto px-4" style={{ opacity, y }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center mb-4">
              <motion.div
                className="mr-4 p-3 rounded-xl bg-blue-500/20 text-blue-400"
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(59, 130, 246, 0)",
                    "0 0 20px rgba(59, 130, 246, 0.5)",
                    "0 0 0 rgba(59, 130, 246, 0)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <Camera size={32} />
              </motion.div>

              {/* Animated heading with text reveal */}
              <div className="overflow-hidden">
                <motion.h2
                  className="text-3xl font-bold"
                  initial={{ y: 40 }}
                  animate={isInView ? { y: 0 } : { y: 40 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.span
                    className="inline-block"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    CCTV
                  </motion.span>{" "}
                  <motion.span
                    className="inline-block"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    Installation
                  </motion.span>{" "}
                  <motion.span
                    className="inline-block"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    &
                  </motion.span>{" "}
                  <motion.span
                    className="inline-block"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    Maintenance
                  </motion.span>
                </motion.h2>
              </div>
            </div>

            <motion.p
              className="text-lg text-gray-300 mb-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              State-of-the-art surveillance systems with remote monitoring capabilities and regular maintenance services
              to keep your premises secure 24/7.
            </motion.p>

            <div className="space-y-6 mb-8">
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  className="group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center mb-1">
                    <motion.div
                      className="mr-3 text-blue-400 bg-blue-500/10 p-2 rounded-lg"
                      whileHover={{
                        rotate: [0, -10, 10, -10, 0],
                        scale: 1.1,
                        backgroundColor: "rgba(59, 130, 246, 0.2)",
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon size={20} />
                    </motion.div>
                    <span className="font-medium">{item.text}</span>
                  </div>

                  {/* Expandable detail text */}
                  <motion.div
                    className="pl-10 text-sm text-blue-300/70"
                    initial={{ height: 0, opacity: 0 }}
                    whileHover={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.detail}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <Button className="bg-blue-600 hover:bg-blue-700 group relative overflow-hidden">
                <motion.span
                  className="absolute inset-0 bg-blue-400/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10 flex items-center">
                  Learn More About CCTV Solutions
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  >
                    →
                  </motion.span>
                </span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced CCTV Animation */}
          <div className="relative h-[450px] bg-slate-800/30 rounded-xl border border-blue-500/20 overflow-hidden">
            {/* Camera view frame */}
            <motion.div
              className="absolute inset-4 rounded-lg border-2 border-blue-500/30 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Camera feed static */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-slate-900 to-blue-900/30"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Grid overlay */}
                <div className="absolute inset-0 opacity-20">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#smallGrid)" />
                  </svg>
                </div>

                {/* Camera interface elements */}
                <div className="absolute top-3 left-3 text-xs text-blue-400 flex items-center">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-blue-500 mr-2"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    CAM-01 • LIVE
                  </motion.span>
                </div>

                <div className="absolute top-3 right-3 text-xs text-blue-400 flex items-center">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                  >
                    {new Date().toLocaleTimeString()}
                  </motion.span>

                  {motionDetected && (
                    <motion.div
                      className="ml-3 px-2 py-0.5 bg-red-500/20 text-red-400 rounded-sm flex items-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: [1, 1.1, 1] }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                      />
                      MOTION
                    </motion.div>
                  )}
                </div>

                {/* Security zones */}
                {securityZones.map((zone, i) => (
                  <motion.div
                    key={i}
                    className={`absolute cursor-pointer ${activeZone === zone.id ? "z-20" : "z-10"}`}
                    style={{ left: zone.x, top: zone.y }}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 + i * 0.2 }}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setActiveZone(activeZone === zone.id ? null : zone.id)}
                  >
                    <motion.div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activeZone === zone.id ? "bg-blue-500 text-white" : "bg-blue-500/20 text-blue-400"
                      }`}
                      animate={
                        activeZone === zone.id
                          ? {
                              boxShadow: [
                                "0 0 0 rgba(59, 130, 246, 0)",
                                "0 0 20px rgba(59, 130, 246, 0.7)",
                                "0 0 0 rgba(59, 130, 246, 0)",
                              ],
                            }
                          : {}
                      }
                      transition={{ duration: 2, repeat: activeZone === zone.id ? Number.POSITIVE_INFINITY : 0 }}
                    >
                      {activeZone === zone.id ? <CheckCircle size={16} /> : i + 1}
                    </motion.div>

                    {/* Zone label */}
                    <motion.div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-xs bg-blue-900/80 text-blue-200 px-2 py-1 rounded whitespace-nowrap"
                      initial={{ opacity: 0, y: -10 }}
                      animate={activeZone === zone.id ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {zone.label}
                    </motion.div>

                    {/* Detection animation when active */}
                    {activeZone === zone.id && (
                      <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-blue-500/50"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                    )}
                  </motion.div>
                ))}

                {/* Active zone highlight */}
                {activeZone && (
                  <motion.div
                    className="absolute inset-0 bg-blue-500/10 z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Scanning effect */}
                <motion.div
                  className="absolute top-0 bottom-0 w-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
                  style={{ left: "-100%" }}
                  animate={{ left: ["100%", "-100%"] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
                />

                {/* Horizontal scan line */}
                <motion.div
                  className="absolute left-0 right-0 h-[2px] bg-blue-400/50"
                  style={{ top: "0%" }}
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />

                {/* Night vision effect overlay */}
                <motion.div
                  className="absolute inset-0 bg-blue-900/10 mix-blend-screen"
                  animate={{ opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                />

                {/* Simulated video noise */}
                <motion.div
                  className="absolute inset-0 opacity-5"
                  animate={{ opacity: [0.03, 0.06, 0.03] }}
                  transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  {Array.from({ length: 100 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{
                        duration: 0.3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Multiple camera control panel */}
            <motion.div
              className="absolute bottom-4 left-4 right-4 h-16 bg-slate-800/80 rounded-lg border border-blue-500/20 flex items-center justify-between px-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              {/* Camera selection thumbnails */}
              <div className="flex space-x-2">
                {[1, 2, 3, 4].map((cam, i) => (
                  <motion.div
                    key={i}
                    className={`w-12 h-12 rounded border ${i === 0 ? "border-blue-500" : "border-slate-600"} overflow-hidden relative`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                      <span className="text-[8px] text-blue-400">CAM-0{cam}</span>
                    </div>

                    {/* Active camera indicator */}
                    {i === 0 && (
                      <motion.div
                        className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-blue-500"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Camera controls */}
              <div className="flex space-x-3">
                {[
                  { icon: Monitor, label: "View" },
                  { icon: Lock, label: "Lock" },
                  { icon: Camera, label: "Record" },
                ].map((control, i) => (
                  <motion.div key={i} className="flex flex-col items-center" whileHover={{ y: -2 }}>
                    <motion.div
                      className="w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400"
                      whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.3)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <control.icon size={16} />
                    </motion.div>
                    <span className="text-[8px] text-blue-300 mt-1">{control.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Pan-tilt-zoom controls */}
            <motion.div
              className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col space-y-2"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 1.6 }}
            >
              <motion.div
                className="w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400"
                whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.3)", y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M5 12L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </motion.div>
              <motion.div
                className="w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400"
                whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.3)", y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </motion.div>
            </motion.div>

            {/* Camera movement animation */}
            <motion.div
              className="absolute top-4 right-4 w-12 h-12"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 1.8 }}
            >
              <motion.div
                className="w-full h-full rounded-full border border-blue-500/30 relative overflow-hidden"
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 bg-blue-900/20 rounded-full" />
                <motion.div
                  className="absolute top-1/2 left-1/2 w-[1px] h-[50%] bg-blue-400 origin-bottom"
                  style={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

