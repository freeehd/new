"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Heart, Volume2, VolumeX } from "lucide-react"
import ImageFallback from "@/components/ImageFallback"
import Slideshow from "@/components/Slideshow"
import { Button } from "@/components/ui/button"
import Confetti from "@/components/Confetti"

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(true)

      // Hide confetti after 5 seconds
      setTimeout(() => {
        setShowConfetti(false)
      }, 5000)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Start playing background music when component mounts
    if (audioRef.current) {
      audioRef.current.volume = 0.3
      audioRef.current.play().catch((error) => {
        console.log("Audio autoplay was prevented:", error)
      })
    }
  }, [])

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  const startExperience = () => {
    setShowIntro(false)
  }

  if (showIntro) {
    return (
      <div className="relative h-screen w-full bg-gradient-to-b from-gray-900 to-black overflow-hidden">
        {/* Background Music */}
        <audio ref={audioRef} loop>
          <source src="/music/background-music.mp4" type="audio/mp4" />
          Your browser does not support the audio element.
        </audio>

        {/* Sound Control Button */}
        <button
          onClick={toggleMute}
          className="fixed top-4 right-4 z-50 p-2 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-all"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        {showConfetti && <Confetti />}

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.1),transparent_70%)]"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
          <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-pink-500 to-transparent"></div>
          <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8 relative"
          >
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden mx-auto border-2 border-pink-500/50 shadow-lg shadow-pink-500/20">
              <ImageFallback
                src="/images/mother-son-malaysia.png"
                alt="Sarim and his mother Nuzhat Mehdi"
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div
              className="absolute -bottom-2 -right-2 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full p-2 shadow-lg"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            >
              <Heart className="h-4 w-4 text-white" fill="white" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 gradient-text"
          >
            Happy Mother's Day
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl sm:text-2xl font-medium text-pink-200 mb-8"
          >
            To My Dearest Ammi, Nuzhat Mehdi
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="max-w-md text-gray-300 mb-12"
          >
            A journey through our memories and my heartfelt message to you
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <Button
              onClick={startExperience}
              className="px-8 py-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium shadow-lg hover:shadow-pink-500/20 transition-all hover:-translate-y-1 text-lg"
            >
              Begin Journey
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
          >
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </motion.div>
        </div>
      </div>
    )
  }

  return <Slideshow />
}
