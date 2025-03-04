"use client"

import { useRef, useState } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Camera, Shield, Eye, Video, CheckCircle } from "lucide-react"
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

          {/* Interactive CCTV Animation */}
          <div className="relative h-[400px] bg-slate-800/30 rounded-xl border border-blue-500/20 overflow-hidden">
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

                <div className="absolute top-3 right-3 text-xs text-blue-400">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                  >
                    {new Date().toLocaleTimeString()}
                  </motion.span>
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
              </motion.div>
            </motion.div>

            {/* Camera movement */}
            <motion.div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 w-12 h-12"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              <motion.div
                className="w-full h-full rounded-full border-2 border-blue-500/30 flex items-center justify-center"
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <Camera size={20} className="text-blue-400" />
              </motion.div>
            </motion.div>

            {/* Status indicators */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs text-blue-400">
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 1.6 }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-500 mr-2"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                System Active
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 1.7 }}
              >
                Motion Detection: Enabled
              </motion.div>
            </div>

            {/* Radar scanning animation */}
            <motion.div
              className="absolute top-4 right-4 w-16 h-16"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 1.8 }}
            >
              <div className="w-full h-full rounded-full border border-blue-500/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/20 rounded-full" />
                <motion.div
                  className="absolute top-1/2 left-1/2 w-[1px] h-[50%] bg-blue-400 origin-bottom"
                  style={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <motion.div
                  className="absolute top-1/2 left-1/2 w-0 h-0 border-t-[40px] border-t-blue-500/20 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent"
                  style={{ rotate: 0, translateX: "-50%", translateY: "-100%" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

