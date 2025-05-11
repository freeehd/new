"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Camera } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface Photo {
  id: number
  src: string
  alt: string
  year: string
  caption: string
  location?: string
}

export default function MemoryGallery() {
  const photos: Photo[] = [
    {
      id: 1,
      src: "/images/mother-baby-1.png",
      alt: "Nuzhat with baby Sarim",
      year: "2000",
      caption: "Thank you for bringing me into this world and showering me with unconditional love from day one.",
    },
    {
      id: 2,
      src: "/images/mother-baby-2.png",
      alt: "Nuzhat with baby Sarim - another pose",
      year: "2000",
      caption: "Your gentle touch and warm embrace have been my comfort since I was small.",
    },
    {
      id: 3,
      src: "/images/mother-family.png",
      alt: "Family gathering with Nuzhat and children",
      year: "2005",
      caption: "You've always created a loving home for our family. I'm grateful for these precious moments together.",
    },
    {
      id: 4,
      src: "/images/mother-cooking.png",
      alt: "Nuzhat cooking and serving food outdoors",
      year: "2010",
      caption:
        "You've always nourished not just our bodies but our souls. Your cooking is filled with love that I can taste.",
    },
    {
      id: 5,
      src: "/images/mother-son-5.png",
      alt: "Sarim and Nuzhat in formal attire",
      year: "2015",
      caption: "Your guidance has shaped me into the person I am today. I'm forever thankful for your wisdom.",
    },
    {
      id: 6,
      src: "/images/mother-son-car.png",
      alt: "Sarim and Nuzhat in a car together",
      year: "2016",
      caption: "Every journey is better with you by my side. Thank you for always being there for me.",
      location: "Road Trip",
    },
    {
      id: 7,
      src: "/images/mother-son-4.png",
      alt: "Sarim and Nuzhat making peace signs",
      year: "2018",
      caption:
        "Your playful spirit reminds me to find joy in life. Thank you for teaching me to smile through challenges.",
    },
    {
      id: 8,
      src: "/images/mother-son-event.png",
      alt: "Sarim and Nuzhat at a formal event",
      year: "2019",
      caption: "I'm proud to stand beside you at every celebration. You make every occasion special.",
    },
    {
      id: 9,
      src: "/images/mother-son-malaysia.png",
      alt: "Sarim and Nuzhat at Petronas Towers in Malaysia",
      year: "2020",
      caption: "When you came to Malaysia to take care of me, it meant the world. Your love knows no distance.",
      location: "Kuala Lumpur, Malaysia",
    },
    {
      id: 10,
      src: "/images/mother-son-garden.png",
      alt: "Sarim and Nuzhat in garden at sunset",
      year: "2022",
      caption: "Your presence brings warmth to my life, just like the golden sunset we shared.",
    },
    {
      id: 11,
      src: "/images/mother-son-1.png",
      alt: "Recent selfie of Sarim and Nuzhat",
      year: "2023",
      caption: "Every year with you is a blessing. Thank you for your endless love and support.",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const nextPhoto = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length)
  }

  const prevPhoto = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length)
  }

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      }
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      }
    },
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pink-800 mb-6">Our Memories Together</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            A journey through time, celebrating the moments you've made special.
          </p>
        </motion.div>

        <div className="relative">
          <div
            ref={containerRef}
            className="relative overflow-hidden rounded-xl shadow-xl bg-white/80 backdrop-blur-sm"
            style={{ height: isMobile ? "500px" : "600px" }}
          >
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x)

                if (swipe < -swipeConfidenceThreshold) {
                  nextPhoto()
                } else if (swipe > swipeConfidenceThreshold) {
                  prevPhoto()
                }
              }}
              className="absolute inset-0 flex flex-col md:flex-row"
            >
              <div className="w-full md:w-3/5 h-1/2 md:h-full relative">
                <Image
                  src={photos[currentIndex].src || "/placeholder.svg"}
                  alt={photos[currentIndex].alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-pink-800 flex items-center">
                  <Camera size={16} className="mr-1" />
                  {photos[currentIndex].year}
                </div>
                {photos[currentIndex].location && (
                  <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-pink-800">
                    {photos[currentIndex].location}
                  </div>
                )}
              </div>
              <div className="w-full md:w-2/5 h-1/2 md:h-full p-6 md:p-10 flex flex-col justify-center">
                <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl h-full flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-semibold text-pink-800 mb-4">{photos[currentIndex].year}</h3>
                  <p className="text-lg md:text-xl text-gray-700 mb-6 italic">"{photos[currentIndex].caption}"</p>
                  <div className="text-sm text-gray-500 mt-auto">
                    Photo {currentIndex + 1} of {photos.length}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <Button
            onClick={prevPhoto}
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white/90 z-10 rounded-full h-12 w-12"
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous photo</span>
          </Button>

          <Button
            onClick={nextPhoto}
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white/90 z-10 rounded-full h-12 w-12"
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next photo</span>
          </Button>
        </div>

        <div className="mt-8 flex justify-center gap-2 overflow-x-auto pb-4">
          {photos.map((photo, index) => (
            <motion.button
              key={photo.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
              }}
              className={`relative rounded-md overflow-hidden h-16 w-16 flex-shrink-0 ${
                index === currentIndex ? "ring-4 ring-pink-500" : "ring-2 ring-transparent"
              }`}
            >
              <Image
                src={photo.src || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
