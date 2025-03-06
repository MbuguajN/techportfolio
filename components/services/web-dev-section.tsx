"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Code, Globe, Smartphone, Layers, ArrowRight, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WebDevSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])

  // State for interactive code demo
  const [activeTab, setActiveTab] = useState("html")
  const [typingIndex, setTypingIndex] = useState(0)
  const [currentLine, setCurrentLine] = useState(0)

  // Code snippets for the interactive demo
  const codeSnippets = {
    html: `<div class="hero">
  <h1>Welcome to Your Website</h1>
  <p>Beautifully crafted web experiences</p>
  <button class="cta">Get Started</button>
</div>`,
    css: `.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  color: white;
  padding: 4rem 2rem;
  border-radius: 0.5rem;
}

.cta {
  background: white;
  color: #3b82f6;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.cta:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}`,
    js: `// Interactive elements
const cta = document.querySelector('.cta');

cta.addEventListener('click', () => {
  // Show modal or navigate
  console.log('CTA clicked!');
  
  // Animate the button
  cta.classList.add('clicked');
  
  // Remove animation class after transition
  setTimeout(() => {
    cta.classList.remove('clicked');
  }, 300);
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  hero.classList.add('fade-in');
});`,
  }

  // Typing animation effect
  useEffect(() => {
    if (!isInView) return

    const lines = codeSnippets[activeTab].split("\n")
    const currentLineText = lines[currentLine] || ""

    if (typingIndex < currentLineText.length) {
      const timeout = setTimeout(() => {
        setTypingIndex(typingIndex + 1)
      }, 50)
      return () => clearTimeout(timeout)
    } else if (currentLine < lines.length - 1) {
      const timeout = setTimeout(() => {
        setCurrentLine(currentLine + 1)
        setTypingIndex(0)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [isInView, typingIndex, currentLine, activeTab])

  // Reset typing animation when tab changes
  useEffect(() => {
    setTypingIndex(0)
    setCurrentLine(0)
  }, [activeTab])

  // Features with animated icons
  const features = [
    {
      icon: Globe,
      text: "Responsive websites optimized for all devices",
      detail: "Fluid layouts that adapt perfectly from mobile to desktop",
    },
    {
      icon: Smartphone,
      text: "Progressive web apps and mobile applications",
      detail: "Native-like experiences with offline capabilities",
    },
    {
      icon: Layers,
      text: "Custom software solutions with scalable architecture",
      detail: "Future-proof systems built with modern technologies",
    },
  ]

  // Development process steps
  const devSteps = [
    { name: "Discovery", color: "#3b82f6" },
    { name: "Design", color: "#8b5cf6" },
    { name: "Development", color: "#ec4899" },
    { name: "Testing", color: "#10b981" },
    { name: "Deployment", color: "#f59e0b" },
  ]

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-slate-900 to-purple-950 text-white overflow-hidden"
    >
      <motion.div className="container mx-auto px-4" style={{ opacity, y }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Code Editor Animation */}
          <div className="relative h-[450px] order-2 lg:order-1">
            {/* Code editor frame */}
            <motion.div
              className="absolute inset-0 rounded-xl bg-slate-800/70 border border-purple-500/30 overflow-hidden shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
            >
              {/* Editor header with tabs */}
              <div className="h-10 bg-slate-700/80 flex items-center px-4 border-b border-slate-600/50">
                <div className="flex space-x-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1">
                  {["html", "css", "js"].map((tab) => (
                    <motion.button
                      key={tab}
                      className={`px-3 py-1 text-xs rounded-t-md ${
                        activeTab === tab
                          ? "bg-slate-800 text-purple-400 border-t border-l border-r border-purple-500/30"
                          : "bg-slate-700 text-slate-400 hover:bg-slate-600/70"
                      }`}
                      onClick={() => setActiveTab(tab)}
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                    >
                      {tab.toUpperCase()}
                    </motion.button>
                  ))}
                </div>

                <div className="ml-auto text-xs text-slate-400 flex items-center">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-green-500 mr-2"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  Live Preview
                </div>
              </div>

              {/* Line numbers */}
              <div className="absolute left-0 top-10 bottom-0 w-10 bg-slate-700/50 border-r border-slate-600/30 flex flex-col pt-2">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} className="text-xs text-slate-500 h-6 flex items-center justify-center">
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* Code content */}
              <div className="absolute left-10 right-0 top-10 bottom-0 p-2 font-mono text-sm overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    {codeSnippets[activeTab].split("\n").map((line, i) => {
                      // Syntax highlighting simulation
                      let coloredLine = line

                      if (activeTab === "html") {
                        coloredLine = line
                          .replace(/(&lt;|<)(\/?[a-zA-Z0-9]+)(&gt;|>)/g, '<span style="color: #ec4899;">$1$2$3</span>')
                          .replace(/class="[^"]*"/g, '<span style="color: #3b82f6;">$&</span>')
                      } else if (activeTab === "css") {
                        coloredLine = line
                          .replace(/([a-zA-Z-]+):/g, '<span style="color: #ec4899;">$1</span>:')
                          .replace(/#[a-fA-F0-9]{3,6}/g, '<span style="color: #10b981;">$&</span>')
                      } else if (activeTab === "js") {
                        coloredLine = line
                          .replace(
                            /(const|let|var|function|return|if|else|for|while)/g,
                            '<span style="color: #ec4899;">$1</span>',
                          )
                          .replace(/('.*?'|".*?")/g, '<span style="color: #10b981;">$&</span>')
                      }

                      return (
                        <motion.div
                          key={i}
                          className="h-6 flex items-center"
                          initial={{ x: -50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.3, delay: i * 0.03 }}
                        >
                          {i === currentLine ? (
                            <>
                              <span dangerouslySetInnerHTML={{ __html: coloredLine.substring(0, typingIndex) }} />
                              <motion.span
                                className="inline-block w-[2px] h-4 bg-white ml-[1px]"
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                              />
                            </>
                          ) : i < currentLine ? (
                            <span dangerouslySetInnerHTML={{ __html: coloredLine }} />
                          ) : (
                            <span></span>
                          )}
                        </motion.div>
                      )
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Live preview */}
              <motion.div
                className="absolute right-4 bottom-4 w-48 h-48 bg-white rounded-lg shadow-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-full h-full flex flex-col items-center justify-center p-4 text-center">
                  <motion.h3
                    className="text-white text-sm font-bold mb-1"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
                  >
                    Welcome to Your Website
                  </motion.h3>
                  <p className="text-white text-xs mb-3">Beautifully crafted web experiences</p>
                  <motion.button
                    className="bg-white text-blue-500 text-xs py-1 px-3 rounded-full font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>

            {/* Terminal window */}
            <motion.div
              className="absolute left-4 bottom-4 w-64 h-32 bg-slate-900 rounded-lg border border-purple-500/20 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <div className="h-6 bg-slate-800 flex items-center px-3">
                <Terminal size={12} className="text-purple-400 mr-2" />
                <span className="text-xs text-purple-300">terminal</span>
              </div>
              <div className="p-2 font-mono text-xs text-green-400">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1.4 }}
                >
                  $ npm install
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1.8 }}
                >
                  Installing dependencies...
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 2.2 }}
                >
                  ✓ Done in 3.45s
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 2.6 }}
                >
                  $ npm run dev
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 3.0 }}
                >
                  <span className="text-purple-400">Ready on</span> http://localhost:3000
                </motion.div>
                <motion.div
                  className="inline-block w-2 h-4 bg-green-400 ml-[1px] align-middle"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>
            </motion.div>

            {/* Development process visualization */}
            <motion.div
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[90%]"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div className="h-2 bg-slate-700 rounded-full relative">
                {devSteps.map((step, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-0 bottom-0 rounded-full"
                    style={{
                      left: `${i * 25}%`,
                      width: "25%",
                      backgroundColor: step.color,
                      opacity: 0.2,
                    }}
                    whileHover={{ opacity: 0.8 }}
                  >
                    <motion.div
                      className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium"
                      style={{ color: step.color }}
                    >
                      {step.name}
                    </motion.div>

                    <motion.div
                      className="absolute w-4 h-4 rounded-full bg-slate-800 border-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{ borderColor: step.color }}
                      animate={{
                        boxShadow:
                          i === 2
                            ? [
                                `0 0 0 rgba(${Number.parseInt(step.color.slice(1, 3), 16)}, ${Number.parseInt(step.color.slice(3, 5), 16)}, ${Number.parseInt(step.color.slice(5, 7), 16)}, 0)`,
                                `0 0 10px rgba(${Number.parseInt(step.color.slice(1, 3), 16)}, ${Number.parseInt(step.color.slice(3, 5), 16)}, ${Number.parseInt(step.color.slice(5, 7), 16)}, 0.7)`,
                                `0 0 0 rgba(${Number.parseInt(step.color.slice(1, 3), 16)}, ${Number.parseInt(step.color.slice(3, 5), 16)}, ${Number.parseInt(step.color.slice(5, 7), 16)}, 0)`,
                              ]
                            : [],
                      }}
                      transition={{ duration: 2, repeat: i === 2 ? Number.POSITIVE_INFINITY : 0 }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Floating tech elements */}
            {["</div>", "<html>", "function()", "const app", "{style}", "@media"].map((text, i) => (
              <motion.div
                key={i}
                className="absolute text-xs font-mono"
                style={{
                  top: `${20 + i * 15}%`,
                  left: `${(i % 3) * 30 + 10}%`,
                  color: i % 2 === 0 ? "#ec4899" : "#3b82f6",
                  opacity: 0.4,
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.4, 0.7, 0.4],
                  rotate: [0, i % 2 === 0 ? 5 : -5, 0],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.5,
                }}
              >
                {text}
              </motion.div>
            ))}
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
                className="mr-4 p-3 rounded-xl bg-purple-500/20 text-purple-400"
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(139, 92, 246, 0)",
                    "0 0 20px rgba(139, 92, 246, 0.5)",
                    "0 0 0 rgba(139, 92, 246, 0)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <Code size={32} />
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
                    Website & Software Development
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
              Custom web applications and software solutions tailored to your business needs, built with cutting-edge
              technologies and responsive design.
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
                      className="mr-3 text-purple-400 bg-purple-500/10 p-2 rounded-lg"
                      whileHover={{
                        rotate: [0, -10, 10, -10, 0],
                        scale: 1.1,
                        backgroundColor: "rgba(139, 92, 246, 0.2)",
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon size={20} />
                    </motion.div>
                    <span className="font-medium">{item.text}</span>
                  </div>

                  {/* Expandable detail text */}
                  <motion.div
                    className="pl-10 text-sm text-purple-300/70"
                    initial={{ height: 0, opacity: 0 }}
                    whileHover={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.detail}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Technologies list */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <h3 className="text-sm uppercase text-purple-300 mb-3 tracking-wider">Technologies We Use</h3>
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS", "GraphQL", "AWS", "Firebase"].map(
                  (tech, i) => (
                    <motion.span
                      key={i}
                      className="px-3 py-1 bg-purple-900/50 text-purple-200 text-xs rounded-full border border-purple-500/20"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.3, delay: 1.1 + i * 0.1 }}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(139, 92, 246, 0.3)",
                        borderColor: "rgba(139, 92, 246, 0.5)",
                      }}
                    >
                      {tech}
                    </motion.span>
                  ),
                )}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <Button className="bg-purple-600 hover:bg-purple-700 group relative overflow-hidden">
                <motion.span
                  className="absolute inset-0 bg-purple-400/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10 flex items-center">
                  Explore Our Development Services
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
        </div>
      </motion.div>
    </section>
  )
}

