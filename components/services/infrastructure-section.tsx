"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Server,
  Database,
  HardDrive,
  Cloud,
  Network,
  Shield,
  Cpu,
  ArrowRight,
  AlertTriangle,
  RefreshCw,
} from "lucide-react"
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

  // State for interactive infrastructure visualization
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [terminalText, setTerminalText] = useState("")
  const [securityScan, setSecurityScan] = useState(false)
  const [alertMessage, setAlertMessage] = useState<string | null>(null)

  // Terminal commands and responses
  const terminalCommands = {
    help: "Available commands: status, scan, optimize, clear, exit",
    status: "All systems operational. CPU: 24%, Memory: 38%, Network: 142Mbps",
    scan: "Initiating security scan...",
    optimize: "Performance optimization complete. System efficiency increased by 12%",
    clear: "",
    exit: "",
  }

  // Simulated terminal typing effect
  useEffect(() => {
    if (!terminalOpen) return

    setTerminalText("> System ready. Type 'help' for available commands.\n> ")
  }, [terminalOpen])

  // Handle terminal commands
  const handleCommand = (cmd: string) => {
    const response = terminalCommands[cmd.toLowerCase()] || `Command not recognized: ${cmd}`

    if (cmd.toLowerCase() === "scan") {
      setSecurityScan(true)
      setTimeout(() => {
        setTerminalText(
          (prev) => `${prev}${response}\n> Scanning system components...\n> No vulnerabilities detected.\n> `,
        )
        setSecurityScan(false)
      }, 3000)
    } else if (cmd.toLowerCase() === "clear") {
      setTerminalText("> ")
    } else if (cmd.toLowerCase() === "exit") {
      setTerminalOpen(false)
    } else {
      setTerminalText((prev) => `${prev}${response}\n> `)
    }
  }

  // Simulate random system alerts
  useEffect(() => {
    if (!isInView) return

    const interval = setInterval(() => {
      if (Math.random() < 0.3 && !alertMessage) {
        const alerts = [
          "Firewall update available",
          "Backup completed successfully",
          "Network traffic spike detected",
          "Server resources optimized",
        ]

        const randomAlert = alerts[Math.floor(Math.random() * alerts.length)]
        setAlertMessage(randomAlert)

        // Clear alert after 4 seconds
        setTimeout(() => {
          setAlertMessage(null)
        }, 4000)
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [isInView, alertMessage])

  // Features with animated icons
  const features = [
    {
      icon: Network,
      text: "Network design, implementation and management",
      detail: "Optimized network architecture for maximum performance and reliability",
    },
    {
      icon: Server,
      text: "Server infrastructure and virtualization",
      detail: "Scalable server solutions with redundancy and failover capabilities",
    },
    {
      icon: Cloud,
      text: "Cloud integration and hybrid solutions",
      detail: "Seamless integration between on-premise and cloud environments",
    },
    {
      icon: Shield,
      text: "Security and compliance",
      detail: "Comprehensive security measures to protect your critical infrastructure",
    },
  ]

  // Generate random data points for the visualization
  const generateDataPoints = (count: number) => {
    return Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 1,
      delay: Math.random() * 5,
    }))
  }

  const dataPoints = generateDataPoints(50)

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-purple-950 to-slate-900 text-white overflow-hidden"
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
                className="mr-4 p-3 rounded-xl bg-cyan-500/20 text-cyan-400"
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(6, 182, 212, 0)",
                    "0 0 20px rgba(6, 182, 212, 0.5)",
                    "0 0 0 rgba(6, 182, 212, 0)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <HardDrive size={32} />
              </motion.div>

              <div className="overflow-hidden">
                <motion.h2
                  className="text-3xl font-bold"
                  initial={{ y: 40 }}
                  animate={isInView ? { y: 0 } : { y: 40 }}
                  transition={{ duration: 0.6 }}
                >
                  IT Infrastructure Support
                </motion.h2>
              </div>
            </div>

            <motion.p
              className="text-lg text-gray-300 mb-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Comprehensive IT infrastructure solutions to keep your business running smoothly with minimal downtime and
              maximum efficiency.
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
                      className="mr-3 text-cyan-400 bg-cyan-500/10 p-2 rounded-lg"
                      whileHover={{
                        rotate: [0, -10, 10, -10, 0],
                        scale: 1.1,
                        backgroundColor: "rgba(6, 182, 212, 0.2)",
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon size={20} />
                    </motion.div>
                    <span className="font-medium">{item.text}</span>
                  </div>

                  {/* Expandable detail text */}
                  <motion.div
                    className="pl-10 text-sm text-cyan-300/70"
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
              <Button className="bg-cyan-600 hover:bg-cyan-700 group relative overflow-hidden">
                <motion.span
                  className="absolute inset-0 bg-cyan-400/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10 flex items-center">
                  Explore Infrastructure Solutions
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <ArrowRight size={16} />
                  </motion.div>
                </span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Futuristic Infrastructure Visualization */}
          <div className="relative h-[450px]">
            <motion.div
              className="absolute inset-0 rounded-xl bg-slate-900 border border-cyan-500/30 overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
            >
              {/* Digital rain background effect */}
              <div className="absolute inset-0 opacity-10">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-0 text-cyan-400 font-mono text-xs whitespace-pre"
                    style={{ left: `${i * 5}%` }}
                    initial={{ y: -100 }}
                    animate={{ y: ["0%", "100%"] }}
                    transition={{
                      duration: 10 + Math.random() * 20,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                      delay: Math.random() * 5,
                    }}
                  >
                    {Array.from({ length: 30 }).map((_, j) => (
                      <div
                        key={j}
                        style={{
                          opacity: Math.random() * 0.8 + 0.2,
                          transform: `scale(${Math.random() * 0.5 + 0.5})`,
                        }}
                      >
                        {Math.random() > 0.5 ? "1" : "0"}
                      </div>
                    ))}
                  </motion.div>
                ))}
              </div>

              {/* Hexagonal grid background */}
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern
                      id="hexagons"
                      width="50"
                      height="43.4"
                      patternUnits="userSpaceOnUse"
                      patternTransform="scale(2)"
                    >
                      <path
                        d="M25,0 L50,14.4 L50,43.4 L25,57.8 L0,43.4 L0,14.4 Z"
                        fill="none"
                        stroke="rgba(6, 182, 212, 0.5)"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#hexagons)" />
                </svg>
              </div>

              {/* 3D Server Rack Visualization */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] perspective-[1000px]">
                <motion.div
                  className="relative w-full h-full transform-style-3d"
                  initial={{ rotateX: 15, rotateY: -15 }}
                  animate={{ rotateX: [15, 20, 15], rotateY: [-15, -10, -15] }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  {/* Server rack */}
                  <div className="absolute inset-0 bg-slate-800/50 border border-cyan-500/30 rounded-lg overflow-hidden transform-style-3d">
                    {/* Server units */}
                    {Array.from({ length: 6 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute left-0 right-0 h-[15%] bg-slate-700/80 border-y border-slate-600/50 flex items-center px-4"
                        style={{ top: `${i * 16.6}%` }}
                        whileHover={{ x: 10, backgroundColor: "rgba(6, 182, 212, 0.1)" }}
                        onClick={() => setActiveNode(activeNode === `server-${i}` ? null : `server-${i}`)}
                      >
                        <div className="flex items-center space-x-3">
                          <Server size={16} className="text-cyan-400" />
                          <span className="text-xs text-cyan-300">Server {i + 1}</span>
                        </div>

                        <div className="ml-auto flex items-center space-x-2">
                          {/* Status indicators */}
                          <motion.div
                            className="w-2 h-2 rounded-full bg-cyan-500"
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                          />

                          <motion.div
                            className="w-2 h-2 rounded-full bg-green-500"
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 + 0.5 }}
                          />

                          {/* Server details popup */}
                          <AnimatePresence>
                            {activeNode === `server-${i}` && (
                              <motion.div
                                className="absolute right-4 -top-20 w-48 bg-slate-800 border border-cyan-500/30 rounded p-2 z-10"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="text-xs text-cyan-300 font-medium mb-1">Server {i + 1} Status</div>
                                <div className="grid grid-cols-2 gap-1 text-[10px]">
                                  <div className="text-slate-400">CPU:</div>
                                  <div className="text-cyan-400">{Math.floor(Math.random() * 40 + 10)}%</div>
                                  <div className="text-slate-400">Memory:</div>
                                  <div className="text-cyan-400">{Math.floor(Math.random() * 50 + 20)}%</div>
                                  <div className="text-slate-400">Disk:</div>
                                  <div className="text-cyan-400">{Math.floor(Math.random() * 30 + 40)}%</div>
                                  <div className="text-slate-400">Uptime:</div>
                                  <div className="text-cyan-400">{Math.floor(Math.random() * 30 + 1)} days</div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    ))}

                    {/* Front panel lights */}
                    <div className="absolute top-2 right-2 flex flex-col space-y-1">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            backgroundColor: i === 0 ? "#10b981" : i === 1 ? "#06b6d4" : "#f59e0b",
                          }}
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.6,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Network connections */}
                  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    {/* Horizontal connection lines */}
                    {Array.from({ length: 6 }).map((_, i) => (
                      <g key={i}>
                        <line
                          x1="100%"
                          y1={`${i * 16.6 + 8.3}%`}
                          x2="120%"
                          y2={`${i * 16.6 + 8.3}%`}
                          stroke="#06b6d4"
                          strokeWidth="1"
                          strokeOpacity="0.5"
                          strokeDasharray="4 2"
                        />

                        {/* Data flow animation */}
                        <motion.circle
                          cx="100%"
                          cy={`${i * 16.6 + 8.3}%`}
                          r="1.5"
                          fill="#06b6d4"
                          initial={{ cx: "100%" }}
                          animate={{ cx: "120%" }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                            delay: i * 0.3,
                          }}
                        />
                      </g>
                    ))}
                  </svg>
                </motion.div>
              </div>

              {/* Floating data particles */}
              {dataPoints.map((point, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-cyan-400"
                  style={{
                    width: `${point.size}px`,
                    height: `${point.size}px`,
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                    opacity: 0.6,
                  }}
                  animate={{
                    x: [0, Math.random() * 40 - 20],
                    y: [0, Math.random() * 40 - 20],
                    opacity: [0.6, 0.2, 0.6],
                  }}
                  transition={{
                    duration: point.speed * 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: point.delay,
                    repeatType: "reverse",
                  }}
                />
              ))}

              {/* Holographic control panel */}
              <motion.div
                className="absolute bottom-4 left-4 right-4 h-32 bg-slate-800/40 backdrop-blur-sm border border-cyan-500/30 rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                {/* Control panel header */}
                <div className="h-8 bg-slate-700/60 border-b border-cyan-500/20 flex items-center px-3 justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                    <span className="text-xs text-cyan-300 font-medium">Infrastructure Control</span>
                  </div>

                  <div className="flex space-x-2">
                    {["System", "Network", "Security", "Terminal"].map((tab, i) => (
                      <motion.button
                        key={i}
                        className={`text-[10px] px-2 py-0.5 rounded ${
                          (tab === "Terminal" && terminalOpen) || (tab === "Security" && securityScan)
                            ? "bg-cyan-500/20 text-cyan-300"
                            : "text-slate-400 hover:text-cyan-300"
                        }`}
                        whileHover={{ y: -1 }}
                        whileTap={{ y: 0 }}
                        onClick={() => {
                          if (tab === "Terminal") setTerminalOpen(!terminalOpen)
                          if (tab === "Security") setSecurityScan(!securityScan)
                        }}
                      >
                        {tab}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Terminal interface */}
                <AnimatePresence>
                  {terminalOpen && (
                    <motion.div
                      className="absolute inset-0 top-8 bg-slate-900/90 font-mono text-xs p-2 text-cyan-300 overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="h-full overflow-auto">
                        <div className="whitespace-pre-wrap">{terminalText}</div>

                        <div className="flex items-center mt-1">
                          <input
                            type="text"
                            className="bg-transparent border-none outline-none text-cyan-300 w-full"
                            placeholder="Enter command..."
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                const cmd = e.currentTarget.value
                                setTerminalText((prev) => `${prev}${cmd}\n`)
                                handleCommand(cmd)
                                e.currentTarget.value = ""
                              }
                            }}
                          />
                          <motion.span
                            className="inline-block w-2 h-4 bg-cyan-400 ml-1"
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Security scan interface */}
                <AnimatePresence>
                  {securityScan && (
                    <motion.div
                      className="absolute inset-0 top-8 bg-slate-900/90 p-2 overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex flex-col h-full items-center justify-center">
                        <motion.div
                          className="w-16 h-16 rounded-full border-2 border-cyan-500/50 flex items-center justify-center relative"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-500"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          />
                          <Shield size={24} className="text-cyan-400" />
                        </motion.div>

                        <div className="text-xs text-cyan-300 mt-2 text-center">
                          <div>Security Scan in Progress</div>
                          <div className="text-[10px] text-cyan-400/70 mt-1">Scanning system components...</div>
                        </div>

                        <div className="w-48 h-1 bg-slate-700 rounded-full mt-3 overflow-hidden">
                          <motion.div
                            className="h-full bg-cyan-500"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 3, ease: "easeInOut" }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Default system status display */}
                {!terminalOpen && !securityScan && (
                  <div className="p-3 h-[calc(100%-2rem)] grid grid-cols-2 gap-3">
                    {/* System metrics */}
                    <div className="space-y-2">
                      {["CPU", "Memory", "Storage", "Network"].map((metric, i) => (
                        <div key={i} className="flex flex-col">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] text-slate-400">{metric}</span>
                            <span className="text-[10px] text-cyan-400">{Math.floor(Math.random() * 50 + 20)}%</span>
                          </div>
                          <div className="h-1 bg-slate-700/60 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-cyan-500"
                              style={{ width: `${Math.random() * 50 + 20}%` }}
                              animate={{ width: [`${Math.random() * 10 + 20}%`, `${Math.random() * 20 + 40}%`] }}
                              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Quick actions */}
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { name: "Scan", icon: Shield, color: "cyan" },
                        { name: "Optimize", icon: RefreshCw, color: "green" },
                        { name: "Backup", icon: Database, color: "purple" },
                        { name: "Monitor", icon: Cpu, color: "amber" },
                      ].map((action, i) => (
                        <motion.button
                          key={i}
                          className={`flex flex-col items-center justify-center p-2 rounded border border-${action.color}-500/20 bg-${action.color}-500/10`}
                          whileHover={{ scale: 1.05, backgroundColor: `rgba(6, 182, 212, 0.2)` }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <action.icon size={16} className={`text-${action.color}-400 mb-1`} />
                          <span className="text-[10px] text-slate-300">{action.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* System alert notification */}
              <AnimatePresence>
                {alertMessage && (
                  <motion.div
                    className="absolute top-4 right-4 bg-slate-800/90 border border-cyan-500/30 rounded-lg p-2 flex items-center space-x-2"
                    initial={{ opacity: 0, y: -20, x: 20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: -20, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <AlertTriangle size={16} className="text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-xs text-cyan-300 font-medium">System Alert</div>
                      <div className="text-[10px] text-slate-400">{alertMessage}</div>
                    </div>
                    <button
                      className="w-5 h-5 rounded-full hover:bg-slate-700 flex items-center justify-center"
                      onClick={() => setAlertMessage(null)}
                    >
                      <span className="text-xs text-slate-400">×</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Scanning effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"
                style={{ top: "-100%" }}
                animate={{ top: ["100%", "-100%"] }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />

              {/* Pulse effect */}
              <motion.div
                className="absolute inset-0 bg-cyan-500/5 rounded-xl"
                animate={{
                  scale: [1, 1.02, 1],
                  opacity: [0, 0.3, 0],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

