"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, Heart } from "lucide-react"
import ImageFallback from "@/components/ImageFallback"
import MessageSlide from "@/components/MessageSlide"

interface Slide {
  id: number
  type: "intro" | "photo" | "quote" | "message" | "final"
  content: {
    title?: string
    text?: string
    image?: string
    year?: string
    location?: string
    background?: string
    messageSection?: number
  }
}

export default function Slideshow() {
  const slides: Slide[] = [
    {
      id: 1,
      type: "intro",
      content: {
        title: "The Beginning",
        text: "From the moment you brought me into this world on April 7, 2000, in Rawalpindi...",
        image: "/images/mother-baby-1.png",
        year: "2000",
      },
    },
    {
      id: 2,
      type: "photo",
      content: {
        title: "Early Days",
        text: "You were just 28 when you had me, but even then, you carried the wisdom and courage of a woman who could move mountains.",
        image: "/images/mother-baby-2.png",
        year: "2000",
      },
    },
    {
      id: 3,
      type: "photo",
      content: {
        title: "Our Family",
        text: "Raising Samana, Fatima, and me with unwavering resilience while Abbu served in Northern Waziristan and on UN missions, often far from home.",
        image: "/images/mother-family.png",
        year: "2005",
      },
    },
    {
      id: 4,
      type: "quote",
      content: {
        text: "You weren't just a mother; you were our anchor, our protector, and our biggest cheerleader.",
        background: "/images/mother-cooking.png",
      },
    },
    {
      id: 5,
      type: "photo",
      content: {
        title: "Growing Together",
        text: "Every moment with you has been a blessing. Your guidance has shaped me into who I am today.",
        image: "/images/mother-son-car.png",
        year: "2016",
      },
    },
    {
      id: 6,
      type: "photo",
      content: {
        title: "Life Lessons",
        text: "You turned every challenge into a lesson, every fear into courage, and every ordinary day into a memory filled with warmth.",
        image: "/images/mother-son-5.png",
        year: "2015",
      },
    },
    {
      id: 7,
      type: "photo",
      content: {
        title: "Celebrations",
        text: "You've always made every occasion special, bringing joy and laughter to our lives.",
        image: "/images/mother-son-event.png",
        year: "2019",
      },
    },
    {
      id: 8,
      type: "photo",
      content: {
        title: "Playful Moments",
        text: "Your playful spirit and sense of humor have taught me to find joy even in difficult times.",
        image: "/images/mother-son-4.png",
        year: "2018",
      },
    },
    {
      id: 9,
      type: "photo",
      content: {
        title: "Your Care",
        text: "When you came to Malaysia to take care of me, it showed the depths of your love and sacrifice.",
        image: "/images/mother-son-malaysia.png",
        year: "2020",
        location: "Kuala Lumpur, Malaysia",
      },
    },
    {
      id: 10,
      type: "photo",
      content: {
        title: "Golden Moments",
        text: "The warmth of your presence is like the golden sunset we shared in this moment.",
        image: "/images/mother-son-garden.png",
        year: "2022",
      },
    },
    {
      id: 11,
      type: "quote",
      content: {
        text: "You are the definition of a brave woman—a warrior in a shalwar kameez, a hero without a cape.",
        background: "/images/mother-son-3.png",
      },
    },
    {
      id: 12,
      type: "photo",
      content: {
        title: "Recent Times",
        text: "Every year with you is a blessing. Your love continues to be my greatest strength.",
        image: "/images/mother-son-2.png",
        year: "2023",
      },
    },
    {
      id: 13,
      type: "message",
      content: {
        title: "My Message to You",
        messageSection: 1,
      },
    },
    {
      id: 14,
      type: "message",
      content: {
        messageSection: 2,
      },
    },
    {
      id: 15,
      type: "message",
      content: {
        messageSection: 3,
      },
    },
    {
      id: 16,
      type: "final",
      content: {
        title: "Happy Mother's Day",
        text: "May Allah bless you with endless happiness, good health, and the same fierce love you've given us all these years.",
        image: "/images/mother-son-1.png",
      },
    },
  ]

  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  useEffect(() => {
    // Start playing background music when component mounts
    if (audioRef.current) {
      audioRef.current.volume = 0.3
      audioRef.current.play().catch((error) => {
        console.log("Audio autoplay was prevented:", error)
      })
    }
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY)
  }

  const handleTouchEnd = () => {
    if (!isScrolling) {
      if (touchStart - touchEnd > 50) {
        // Swipe up
        nextSlide()
      }

      if (touchStart - touchEnd < -50) {
        // Swipe down
        prevSlide()
      }
    }
    setTouchStart(0)
    setTouchEnd(0)
  }

  const handleWheel = (e: WheelEvent) => {
    if (isScrolling) return

    setIsScrolling(true)
    if (e.deltaY > 0) {
      nextSlide()
    } else {
      prevSlide()
    }

    setTimeout(() => {
      setIsScrolling(false)
    }, 1000)
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener("wheel", handleWheel)
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel)
      }
    }
  }, [isScrolling])

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1)
      setCurrentSlide((prev) => prev + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1)
      setCurrentSlide((prev) => prev - 1)
    }
  }

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1)
    setCurrentSlide(index)
  }

  const variants = {
    enter: (direction: number) => {
      return {
        y: direction > 0 ? "100%" : "-100%",
        opacity: 0,
      }
    },
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        y: direction < 0 ? "100%" : "-100%",
        opacity: 0,
      }
    },
  }

  const progressWidth = `${((currentSlide + 1) / slides.length) * 100}%`

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen overflow-hidden bg-gray-900 text-white"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Music */}
      <audio ref={audioRef} loop>
        <source src="/music/background-music.mp4" type="audio/mp4" />
        Your browser does not support the audio element.
      </audio>

      <div className="progress-bar" style={{ width: progressWidth }}></div>

      <div className="navigation-dots">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`nav-dot ${currentSlide === index ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>

      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            y: { type: "tween", duration: 0.8, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.5 },
          }}
          className="slide"
        >
          {slides[currentSlide].type === "intro" && (
            <div className="slide-content">
              {slides[currentSlide].content.image && (
                <div className="absolute inset-0 z-0">
                  <ImageFallback
                    src={slides[currentSlide].content.image || "/placeholder.svg"}
                    alt="Background"
                    fill
                    className="object-cover opacity-20"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80"></div>
                </div>
              )}

              <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8"
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
                    {slides[currentSlide].content.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-gray-300">{slides[currentSlide].content.text}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="relative mx-auto w-64 h-64 md:w-80 md:h-80 mb-8"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 blur-xl opacity-30 animate-pulse"></div>
                  <div className="relative h-full w-full rounded-full overflow-hidden border-2 border-pink-500/30 shadow-lg shadow-pink-500/20">
                    <ImageFallback
                      src={slides[currentSlide].content.image || "/placeholder.svg"}
                      alt="Mother and child"
                      fill
                      className="object-cover image-reveal"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-sm text-gray-400"
                >
                  {slides[currentSlide].content.year && <span>{slides[currentSlide].content.year}</span>}
                </motion.div>
              </div>

              <div className="scroll-indicator">
                <ChevronDown className="w-6 h-6 text-white/50" />
              </div>
            </div>
          )}

          {slides[currentSlide].type === "photo" && (
            <div className="slide-content">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto h-full">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col justify-center px-4"
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 gradient-text">
                    {slides[currentSlide].content.title}
                  </h2>
                  <p className="text-lg md:text-xl text-gray-300 mb-6">{slides[currentSlide].content.text}</p>
                  <div className="flex items-center text-sm text-gray-400">
                    {slides[currentSlide].content.year && (
                      <span className="mr-4">{slides[currentSlide].content.year}</span>
                    )}
                    {slides[currentSlide].content.location && (
                      <span className="flex items-center">
                        <Heart size={12} className="mr-1 text-pink-500" />
                        {slides[currentSlide].content.location}
                      </span>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-center px-4"
                >
                  <div className="relative w-full h-[70vh] md:h-[80vh] max-h-[500px] md:max-h-[600px]">
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-500/20 blur-xl"></div>
                    <div className="relative h-full w-full rounded-lg overflow-hidden border border-white/10 shadow-lg">
                      <ImageFallback
                        src={slides[currentSlide].content.image || "/placeholder.svg"}
                        alt={slides[currentSlide].content.title || "Photo"}
                        fill
                        className="object-cover image-reveal"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="scroll-indicator">
                <ChevronDown className="w-6 h-6 text-white/50" />
              </div>
            </div>
          )}

          {slides[currentSlide].type === "quote" && (
            <div className="slide-content">
              {slides[currentSlide].content.background && (
                <div className="absolute inset-0 z-0">
                  <ImageFallback
                    src={slides[currentSlide].content.background || "/placeholder.svg"}
                    alt="Background"
                    fill
                    className="object-cover opacity-20"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80"></div>
                </div>
              )}

              <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-6xl text-pink-500 mb-6">"</div>
                  <p className="text-2xl md:text-4xl font-medium text-white mb-6 leading-relaxed">
                    {slides[currentSlide].content.text}
                  </p>
                  <div className="text-6xl text-pink-500">"</div>
                </motion.div>
              </div>

              <div className="scroll-indicator">
                <ChevronDown className="w-6 h-6 text-white/50" />
              </div>
            </div>
          )}

          {slides[currentSlide].type === "message" && (
            <MessageSlide section={slides[currentSlide].content.messageSection || 1} />
          )}

          {slides[currentSlide].type === "final" && (
            <div className="slide-content">
              {slides[currentSlide].content.image && (
                <div className="absolute inset-0 z-0">
                  <ImageFallback
                    src={slides[currentSlide].content.image || "/placeholder.svg"}
                    alt="Background"
                    fill
                    className="object-cover opacity-30"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80"></div>
                </div>
              )}

              <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
                    {slides[currentSlide].content.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-gray-300 mb-12">{slides[currentSlide].content.text}</p>

                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mx-auto border-2 border-pink-500/50 shadow-lg shadow-pink-500/20 mb-6">
                      <ImageFallback
                        src={slides[currentSlide].content.image || "/placeholder.svg"}
                        alt="Mother and son"
                        fill
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <p className="text-lg text-gray-400 mb-2">With all my heart,</p>
                    <p className="text-xl text-pink-300">Your Sarim</p>
                  </div>
                </motion.div>
              </div>

              <div className="scroll-indicator">
                <ChevronUp className="w-6 h-6 text-white/50" />
                <span className="text-xs text-white/50 block mt-1">Back to top</span>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className={`fixed top-1/2 left-4 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all ${
          currentSlide === 0 ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className={`fixed top-1/2 right-4 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all ${
          currentSlide === slides.length - 1 ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <ChevronDown className="w-5 h-5" />
      </button>
    </div>
  )
}
