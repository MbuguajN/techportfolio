"use client"

import { useRef, useState } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Server, Database, Network, Cloud, Cpu, HardDrive, Wifi, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function InfrastructureSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])

  // State for interactive infrastructure demo
  const [activeNode, setActiveNode] = useState<string | null>(null)

  // Infrastructure nodes
  const infraNodes = [
    {
      id: "cloud",
      Icon: Cloud,
      label: "Cloud Services",
      x: "50%",
      y: "15%",
      color: "#10b981",
      description: "Scalable cloud infrastructure with AWS, Azure, and Google Cloud",
    },
    {
      id: "server",
      Icon: Server,
      label: "Servers",
      x: "25%",
      y: "40%",
      color: "#10b981",
      description: "High-performance dedicated and virtual servers",
    },
    {
      id: "database",
      Icon: Database,
      label: "Databases",
      x: "75%",
      y: "40%",
      color: "#10b981",
      description: "Optimized SQL and NoSQL database solutions",
    },
    {
      id: "network",
      Icon: Network,
      label: "Network",
      x: "50%",
      y: "65%",
      color: "#10b981",
      description: "Secure and reliable network infrastructure",
    },
    {
      id: "security",
      Icon: Lock,
      label: "Security",
      x: "15%",
      y: "70%",
      color: "#10b981",
      description: "Advanced security protocols and monitoring",
    },
    {
      id: "storage",
      Icon: HardDrive,
      label: "Storage",
      x: "85%",
      y: "70%",
      color: "#10b981",
      description: "Redundant storage solutions with backup systems",
    },
  ]

  // Connection lines between nodes
  const connections = [
    { from: "cloud", to: "server" },
    { from: "cloud", to: "database" },
    { from: "server", to: "network" },
    { from: "database", to: "network" },
    { from: "network", to: "security" },
    { from: "network", to: "storage" },
  ]

  // Features with animated icons
  const features = [
    {
      icon: Network,
      text: "Secure network design and implementation",
      detail: "Enterprise-grade networking with redundant connections",
    },
    {
      icon: Cloud,
      text: "Cloud migration and hybrid infrastructure",
      detail: "Seamless transition to cloud or hybrid environments",
    },
    {
      icon: Database,
      text: "Data storage and backup solutions",
      detail: "Automated backup systems with disaster recovery",
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-purple-950 to-emerald-950 text-white overflow-hidden"
    >
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
                className="mr-4 p-3 rounded-xl bg-emerald-500/20 text-emerald-400"
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(16, 185, 129, 0)",
                    "0 0 20px rgba(16, 185, 129, 0.5)",
                    "0 0 0 rgba(16, 185, 129, 0)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <Server size={32} />
              </motion.div>

              {/* Animated heading with reveal effect */}
              <div className="overflow-hidden">
                <motion.h2
                  className="text-3xl font-bold"
                  initial={{ y: 40 }}
                  animate={isInView ? { y: 0 } : { y: 40 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.span
                    className="inline-block bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    IT Infrastructure
                  </motion.span>{" "}
                  <motion.span
                    className="inline-block"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    Support
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
              Comprehensive infrastructure solutions including network setup, server management, and cloud integration
              to ensure your business operates efficiently and securely.
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
                      className="mr-3 text-emerald-400 bg-emerald-500/10 p-2 rounded-lg"
                      whileHover={{
                        rotate: [0, -10, 10, -10, 0],
                        scale: 1.1,
                        backgroundColor: "rgba(16, 185, 129, 0.2)",
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon size={20} />
                    </motion.div>
                    <span className="font-medium">{item.text}</span>
                  </div>

                  {/* Expandable detail text */}
                  <motion.div
                    className="pl-10 text-sm text-emerald-300/70"
                    initial={{ height: 0, opacity: 0 }}
                    whileHover={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.detail}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Infrastructure metrics */}
            <motion.div
              className="grid grid-cols-2 gap-4 mb-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              {[
                { label: "Uptime", value: "99.99%", icon: Wifi },
                { label: "Response Time", value: "<15min", icon: Cpu },
                { label: "Monitoring", value: "24/7", icon: HardDrive },
                { label: "Security", value: "Enterprise", icon: Lock },
              ].map((metric, i) => (
                <motion.div
                  key={i}
                  className="bg-emerald-900/30 rounded-lg p-3 border border-emerald-500/20"
                  initial={{ scale: 0.9 }}
                  animate={isInView ? { scale: 1 } : { scale: 0.9 }}
                  transition={{ duration: 0.3, delay: 1 + i * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(16, 185, 129, 0.2)",
                    borderColor: "rgba(16, 185, 129, 0.3)",
                  }}
                >
                  <div className="flex items-center">
                    <metric.icon size={16} className="text-emerald-400 mr-2" />
                    <span className="text-xs text-emerald-300">{metric.label}</span>
                  </div>
                  <div className="text-xl font-bold text-white mt-1">{metric.value}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <Button className="bg-emerald-600 hover:bg-emerald-700 group relative overflow-hidden">
                <motion.span
                  className="absolute inset-0 bg-emerald-400/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10">Discover Our Infrastructure Solutions</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Interactive Infrastructure Animation */}
          <div className="relative h-[450px] bg-slate-800/30 rounded-xl border border-emerald-500/20 overflow-hidden">
            {/* Infrastructure diagram */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Background grid */}
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="infraGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#infraGrid)" />
                </svg>
              </div>

              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full">
                {connections.map((connection, i) => {
                  const fromNode = infraNodes.find((node) => node.id === connection.from)
                  const toNode = infraNodes.find((node) => node.id === connection.to)

                  if (!fromNode || !toNode) return null

                  const isActive = activeNode === connection.from || activeNode === connection.to

                  return (
                    <g key={i}>
                      <motion.line
                        x1={fromNode.x}
                        y1={fromNode.y}
                        x2={toNode.x}
                        y2={toNode.y}
                        stroke={isActive ? "rgba(16, 185, 129, 0.8)" : "rgba(16, 185, 129, 0.3)"}
                        strokeWidth={isActive ? 2 : 1}
                        strokeDasharray={isActive ? "none" : "5,5"}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 + i * 0.2 }}
                      />

                      {/* Data packet animation */}
                      {isInView && (
                        <motion.circle
                          r="3"
                          fill="#10b981"
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: [0, 1, 0],
                            pathOffset: [0, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.5,
                            repeatDelay: 1,
                          }}
                          style={{
                            offsetPath: `path("M ${fromNode.x} ${fromNode.y} L ${toNode.x} ${toNode.y}")`,
                            offsetRotate: "0deg",
                          }}
                        />
                      )}
                    </g>
                  )
                })}
              </svg>

              {/* Infrastructure nodes */}
              {infraNodes.map((node, i) => (
                <motion.div
                  key={i}
                  className="absolute cursor-pointer"
                  style={{
                    left: node.x,
                    top: node.y,
                    transform: "translate(-50%, -50%)",
                  }}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
                >
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      activeNode === node.id ? "bg-emerald-500 text-white" : "bg-emerald-500/20 text-emerald-400"
                    }`}
                    animate={
                      activeNode === node.id
                        ? {
                            boxShadow: [
                              "0 0 0 rgba(16, 185, 129, 0)",
                              "0 0 20px rgba(16, 185, 129, 0.7)",
                              "0 0 0 rgba(16, 185, 129, 0)",
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 2, repeat: activeNode === node.id ? Number.POSITIVE_INFINITY : 0 }}
                  >
                    <node.Icon size={24} />
                  </motion.div>

                  {/* Node label */}
                  <motion.div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-xs font-medium text-emerald-300 whitespace-nowrap"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                  >
                    {node.label}
                  </motion.div>

                  {/* Node details popup */}
                  {activeNode === node.id && (
                    <motion.div
                      className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mt-[-10px] bg-slate-800 border border-emerald-500/30 p-3 rounded-lg text-xs w-48 z-10"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="font-bold text-emerald-400 mb-1 flex items-center">
                        <node.Icon size={14} className="mr-1" />
                        {node.label}
                      </div>
                      <p className="text-gray-300">{node.description}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}

              {/* Status indicators */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs text-emerald-400">
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
                  All Systems Operational
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 1.7 }}
                >
                  <span className="text-emerald-300">Click on nodes to explore</span>
                </motion.div>
              </div>

              {/* Server rack visualization */}
              <motion.div
                className="absolute bottom-16 right-4 w-16 h-40 bg-slate-700/70 rounded-md border border-emerald-500/30 overflow-hidden"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                {/* Server units */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-[18%] m-1 bg-slate-600 rounded border border-slate-500 flex items-center justify-center"
                    initial={{ x: -10, opacity: 0 }}
                    animate={isInView ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
                    transition={{ duration: 0.3, delay: 1.3 + i * 0.1 }}
                  >
                    <div className="flex space-x-1 items-center">
                      <motion.div
                        className="w-1 h-1 rounded-full"
                        animate={{
                          backgroundColor: i % 3 === 0 ? ["#10b981", "#10b981"] : ["#10b981", "#f59e0b", "#10b981"],
                          opacity: i % 3 === 0 ? [1, 1] : [1, 0.5, 1],
                        }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

