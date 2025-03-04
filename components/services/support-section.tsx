"use client"

import { useRef, useState } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Headset, MessageCircle, Clock, Users, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SupportSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])

  // State for interactive support demo
  const [activeTicket, setActiveTicket] = useState<number | null>(null)

  // Support tickets for interactive demo
  const supportTickets = [
    {
      id: 1,
      title: "Network Connectivity Issue",
      status: "resolved",
      priority: "high",
      time: "2h ago",
      icon: CheckCircle,
      iconColor: "#10b981",
    },
    {
      id: 2,
      title: "Email Configuration",
      status: "in-progress",
      priority: "medium",
      time: "1h ago",
      icon: Clock,
      iconColor: "#f59e0b",
    },
    {
      id: 3,
      title: "Software Installation",
      status: "pending",
      priority: "low",
      time: "30m ago",
      icon: AlertCircle,
      iconColor: "#3b82f6",
    },
    {
      id: 4,
      title: "Hardware Failure",
      status: "critical",
      priority: "urgent",
      time: "5m ago",
      icon: XCircle,
      iconColor: "#ef4444",
    },
  ]

  // Features with animated icons
  const features = [
    {
      icon: Clock,
      text: "24/7 support with rapid response times",
      detail: "Average response time under 15 minutes",
    },
    {
      icon: MessageCircle,
      text: "Multi-channel support via phone, email, and chat",
      detail: "Connect through your preferred communication method",
    },
    {
      icon: Users,
      text: "Dedicated support teams with specialized expertise",
      detail: "Experts in networking, security, and systems administration",
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-emerald-950 to-amber-950 text-white overflow-hidden"
    >
      <motion.div className="container mx-auto px-4" style={{ opacity, y }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Support Dashboard */}
          <div className="relative h-[450px] order-2 lg:order-1">
            {/* Support dashboard frame */}
            <motion.div
              className="absolute inset-0 rounded-xl bg-slate-800/70 border border-amber-500/30 overflow-hidden shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
            >
              {/* Dashboard header */}
              <div className="h-12 bg-slate-700/80 flex items-center px-4 border-b border-slate-600/50">
                <div className="flex items-center">
                  <Headset size={18} className="text-amber-400 mr-2" />
                  <span className="font-medium text-white">Support Dashboard</span>
                </div>

                <div className="ml-auto flex items-center space-x-4 text-xs">
                  <motion.div
                    className="flex items-center text-green-400"
                    animate={{ opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-1" />
                    Online
                  </motion.div>

                  <span className="text-gray-400">{new Date().toLocaleDateString()}</span>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-4 h-[calc(100%-3rem)] flex flex-col">
                {/* Stats row */}
                <motion.div
                  className="grid grid-cols-4 gap-3 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {[
                    { label: "Open Tickets", value: "12", color: "#f59e0b" },
                    { label: "Resolved Today", value: "28", color: "#10b981" },
                    { label: "Avg Response", value: "8m", color: "#3b82f6" },
                    { label: "Satisfaction", value: "98%", color: "#ec4899" },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      className="bg-slate-700/50 rounded-lg p-3 border border-slate-600/30"
                      initial={{ scale: 0.9 }}
                      animate={isInView ? { scale: 1 } : { scale: 0.9 }}
                      transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(245, 158, 11, 0.1)",
                        borderColor: "rgba(245, 158, 11, 0.2)",
                      }}
                    >
                      <div className="text-xs text-gray-400">{stat.label}</div>
                      <div className="text-xl font-bold mt-1" style={{ color: stat.color }}>
                        {stat.value}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Tickets list */}
                <motion.div
                  className="flex-grow bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div className="p-3 border-b border-slate-700/50 flex items-center justify-between text-xs text-gray-400">
                    <span>Recent Support Tickets</span>
                    <span>Click to view details</span>
                  </div>

                  <div className="overflow-y-auto h-[calc(100%-2rem)]">
                    {supportTickets.map((ticket, i) => (
                      <motion.div
                        key={i}
                        className={`p-3 border-b border-slate-700/30 cursor-pointer ${
                          activeTicket === ticket.id ? "bg-amber-900/20" : "hover:bg-slate-700/30"
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
                        onClick={() => setActiveTicket(activeTicket === ticket.id ? null : ticket.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <motion.div
                              className="mr-3 p-1 rounded-full"
                              style={{ backgroundColor: `${ticket.iconColor}20` }}
                              animate={
                                ticket.status === "critical" ? { scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] } : {}
                              }
                              transition={{
                                duration: 1,
                                repeat: ticket.status === "critical" ? Number.POSITIVE_INFINITY : 0,
                              }}
                            >
                              <ticket.icon size={16} style={{ color: ticket.iconColor }} />
                            </motion.div>
                            <div>
                              <div className="font-medium text-sm">{ticket.title}</div>
                              <div className="text-xs text-gray-400 flex items-center mt-1">
                                <span
                                  className={`inline-block w-2 h-2 rounded-full mr-1`}
                                  style={{
                                    backgroundColor:
                                      ticket.status === "resolved"
                                        ? "#10b981"
                                        : ticket.status === "in-progress"
                                          ? "#f59e0b"
                                          : ticket.status === "critical"
                                            ? "#ef4444"
                                            : "#3b82f6",
                                  }}
                                />
                                {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                                <span className="mx-2">•</span>
                                {ticket.time}
                              </div>
                            </div>
                          </div>
                          <div
                            className={`text-xs px-2 py-1 rounded-full ${
                              ticket.priority === "urgent"
                                ? "bg-red-900/30 text-red-400"
                                : ticket.priority === "high"
                                  ? "bg-amber-900/30 text-amber-400"
                                  : ticket.priority === "medium"
                                    ? "bg-blue-900/30 text-blue-400"
                                    : "bg-green-900/30 text-green-400"
                            }`}
                          >
                            {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                          </div>
                        </div>

                        {/* Expanded ticket details */}
                        {activeTicket === ticket.id && (
                          <motion.div
                            className="mt-3 pt-3 border-t border-slate-700/30 text-xs text-gray-300"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="mb-2">
                              <span className="text-gray-400">Assigned to:</span> Technical Support Team
                            </div>
                            <div className="mb-2">
                              <span className="text-gray-400">Description:</span> User reported issues with{" "}
                              {ticket.title.toLowerCase()}. Our team is{" "}
                              {ticket.status === "resolved"
                                ? "has successfully resolved the issue."
                                : ticket.status === "in-progress"
                                  ? "actively working on a solution."
                                  : ticket.status === "pending"
                                    ? "scheduled to address this soon."
                                    : "treating this as a critical priority."}
                            </div>
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="text-gray-400">Ticket ID:</span> #
                                {ticket.id.toString().padStart(6, "0")}
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs border-amber-500/50 text-amber-400 hover:bg-amber-950/30"
                              >
                                View Full Details
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Support agents visualization */}
            <motion.div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex space-x-3"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              {[1, 2, 3].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center"
                  initial={{ y: 20 }}
                  animate={isInView ? { y: 0 } : { y: 20 }}
                  transition={{ duration: 0.3, delay: 1.3 + i * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Users size={18} className="text-amber-400" />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Content */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center mb-4">
              <motion.div
                className="mr-4 p-3 rounded-xl bg-amber-500/20 text-amber-400"
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(245, 158, 11, 0)",
                    "0 0 20px rgba(245, 158, 11, 0.5)",
                    "0 0 0 rgba(245, 158, 11, 0)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <Headset size={32} />
              </motion.div>

              {/* Animated heading with typing effect */}
              <div className="overflow-hidden">
                <motion.h2
                  className="text-3xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.span
                    className="inline-block"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "auto" } : { width: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                  >
                    IT Technical Support Outsourcing
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
              Dedicated technical support teams available 24/7 to resolve any IT issues efficiently, allowing your
              business to focus on what matters most.
            </motion.p>

            <div className="space-y-6 mb-8">
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  className="group"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center mb-1">
                    <motion.div
                      className="mr-3 text-amber-400 bg-amber-500/10 p-2 rounded-lg"
                      whileHover={{
                        rotate: [0, -10, 10, -10, 0],
                        scale: 1.1,
                        backgroundColor: "rgba(245, 158, 11, 0.2)",
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon size={20} />
                    </motion.div>
                    <span className="font-medium">{item.text}</span>
                  </div>

                  {/* Expandable detail text */}
                  <motion.div
                    className="pl-10 text-sm text-amber-300/70"
                    initial={{ height: 0, opacity: 0 }}
                    whileHover={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.detail}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Support tiers */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <h3 className="text-sm uppercase text-amber-300 mb-3 tracking-wider">Support Tiers</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { name: "Basic", features: ["Email Support", "Business Hours", "Next-Day Response"] },
                  { name: "Business", features: ["Email & Phone", "Extended Hours", "4-Hour Response"] },
                  { name: "Enterprise", features: ["All Channels", "24/7 Support", "15-Min Response"] },
                ].map((tier, i) => (
                  <motion.div
                    key={i}
                    className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-3"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.3, delay: 1.1 + i * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(245, 158, 11, 0.2)",
                      borderColor: "rgba(245, 158, 11, 0.3)",
                    }}
                  >
                    <div className="font-bold text-amber-400 mb-2">{tier.name}</div>
                    <ul className="text-xs space-y-1">
                      {tier.features.map((feature, j) => (
                        <li key={j} className="flex items-center">
                          <CheckCircle size={12} className="text-amber-400 mr-1" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <Button className="bg-amber-600 hover:bg-amber-700 group relative overflow-hidden">
                <motion.span
                  className="absolute inset-0 bg-amber-400/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10">Learn About Our Support Services</span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

