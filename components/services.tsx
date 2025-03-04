"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Camera, Code, Server, Headset } from "lucide-react"

const services = [
  {
    title: "CCTV Installation & Maintenance",
    description:
      "State-of-the-art surveillance systems with remote monitoring capabilities and regular maintenance services.",
    icon: Camera,
    color: "from-blue-500 to-cyan-400",
    animation: "cctv",
  },
  {
    title: "Website & Software Development",
    description: "Custom web applications and software solutions tailored to your business needs.",
    icon: Code,
    color: "from-purple-500 to-pink-400",
    animation: "code",
  },
  {
    title: "IT Infrastructure Support",
    description:
      "Comprehensive infrastructure solutions including network setup, server management, and cloud integration.",
    icon: Server,
    color: "from-green-500 to-emerald-400",
    animation: "server",
  },
  {
    title: "IT Technical Support Outsourcing",
    description: "Dedicated technical support teams available 24/7 to resolve any IT issues efficiently.",
    icon: Headset,
    color: "from-orange-500 to-amber-400",
    animation: "support",
  },
]

export default function Services() {
  return (
    <section className="py-20 bg-slate-950 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="max-w-2xl mx-auto text-gray-400">
            Comprehensive technology solutions to power your business growth
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      className="bg-slate-900 rounded-xl p-6 h-full flex flex-col"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
    >
      <div className="mb-6 relative">
        <div className={`h-16 w-16 rounded-lg bg-gradient-to-r ${service.color} p-3 flex items-center justify-center`}>
          <service.icon className="h-8 w-8 text-white" />
        </div>

        {service.animation === "cctv" && <CCTVAnimation isInView={isInView} />}

        {service.animation === "code" && <CodeAnimation isInView={isInView} />}

        {service.animation === "server" && <ServerAnimation isInView={isInView} />}

        {service.animation === "support" && <SupportAnimation isInView={isInView} />}
      </div>

      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
      <p className="text-gray-400 flex-grow">{service.description}</p>

      <motion.button className="mt-4 text-sm font-medium text-cyan-400 flex items-center" whileHover={{ x: 5 }}>
        Learn more
        <svg
          className="w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
    </motion.div>
  )
}

function CCTVAnimation({ isInView }) {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {isInView && (
        <>
          <motion.div
            className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan-500/20"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 2, opacity: [0, 0.5, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute top-8 left-8 w-0 h-0 border-l-[40px] border-l-transparent border-t-[80px] border-t-cyan-500/20 -rotate-45"
            animate={{
              rotate: ["-45deg", "45deg", "135deg", "225deg", "-45deg"],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </>
      )}
    </div>
  )
}

function CodeAnimation({ isInView }) {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {isInView && (
        <>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute top-8 left-20 h-1 bg-purple-500/40 rounded"
              initial={{ width: 0, y: i * 6 }}
              animate={{ width: [0, 40, 0], x: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
                repeatType: "reverse",
              }}
            />
          ))}
        </>
      )}
    </div>
  )
}

function ServerAnimation({ isInView }) {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {isInView && (
        <>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute top-4 left-20 w-2 h-2 rounded-full bg-green-500"
              initial={{ y: i * 6, opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                x: [0, 20, 40],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
              }}
            />
          ))}
        </>
      )}
    </div>
  )
}

function SupportAnimation({ isInView }) {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {isInView && (
        <>
          <motion.div
            className="absolute top-4 left-20 w-6 h-6 rounded-full border border-orange-500/50"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
          <motion.div
            className="absolute top-4 left-20 w-12 h-12 rounded-full border border-orange-500/30"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: 0.3,
            }}
          />
        </>
      )}
    </div>
  )
}

