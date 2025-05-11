"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function HeroSection() {
  const [hearts, setHearts] = useState<{ id: number; x: number; size: number; delay: number }[]>([])
  const [showCard, setShowCard] = useState(false)

  useEffect(() => {
    // Generate floating hearts
    const newHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      delay: Math.random() * 5,
    }))
    setHearts(newHearts)
  }, [])

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Floating hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-400/30 z-0"
          style={{ left: `${heart.x}%` }}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{
            y: "-10vh",
            opacity: [0, 1, 0.8, 0],
            x: heart.id % 2 === 0 ? ["0%", "3%", "-2%", "1%"] : ["0%", "-3%", "2%", "-1%"],
          }}
          transition={{
            duration: 15 + heart.size * 5,
            repeat: Number.POSITIVE_INFINITY,
            delay: heart.delay,
            ease: "linear",
          }}
        >
          <Heart size={16 + heart.size * 10} fill="currentColor" />
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-6 relative"
        >
          <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden mx-auto border-4 border-white shadow-lg">
            <Image
              src="/images/mother-son-malaysia.png"
              alt="Sarim and his mother Nuzhat Mehdi in Malaysia"
              width={256}
              height={256}
              className="w-full h-full object-cover"
            />
          </div>
          <motion.div
            className="absolute -bottom-3 -right-3 bg-white rounded-full p-2 shadow-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className="h-6 w-6 text-pink-500" fill="currentColor" />
          </motion.div>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Happy Mother's Day
        </motion.h1>

        <motion.h2
          className="text-2xl sm:text-3xl font-medium text-pink-800 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Nuzhat Mehdi
        </motion.h2>

        <motion.p
          className="max-w-md mx-auto text-lg text-gray-700 mb-8 bg-white/50 backdrop-blur-sm p-4 rounded-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Thank you for your endless love and care, especially when you came all the way to Malaysia for me.
        </motion.p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <Button
            onClick={() => setShowCard(true)}
            className="px-8 py-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-lg"
          >
            Open Your Card
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
