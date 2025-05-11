"use client"

import type React from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface MessageSectionProps {
  section: number
}

const MessageSlide: React.FC<MessageSectionProps> = ({ section }) => {
  const message = {
    1: `To My Dearest Ammi, Nuzhat Mehdi,

From the moment you brought me into this world on April 7, 2000, in Rawalpindi, your life became a never-ending act of love, sacrifice, and strength. You were just 29 when you had me, but even then, you carried the wisdom and courage of a woman who could move mountains. And move mountains you did—raising Samana, Fatima, and me with unwavering resilience while Abbu served in Northern Waziristan and on UN missions, often far from home.`,
    2: `You weren't just a mother; you were our anchor, our protector, and our biggest cheerleader. You turned every challenge into a lesson, every fear into courage, and every ordinary day into a memory filled with warmth. You taught us that strength isn't just about enduring hard times but about facing them with grace, humor, and an unshakable love for your family.

Ammi, you are the definition of a brave woman—a warrior in a shalwar kameez, a hero without a cape. No words can truly capture the depth of my love and gratitude for you, but today and every day, I hope you feel how cherished you are.`,
    3: `Thank you for every sleepless night, every silent prayer, and every ounce of love you've poured into us.

Happy Mother's Day to the woman who made our house a home, no matter where life took us. May Allah bless you with endless happiness, good health, and the same fierce love you've given us all these years.

With all my heart,
Your Sarim`,
  }

  const currentMessage = message[section as keyof typeof message] || ""
  const lines = currentMessage.split("\n")

  return (
    <div className="slide-content">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.1),transparent_70%)]"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-12 overflow-y-auto h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-black/30 backdrop-blur-sm p-8 rounded-lg border border-white/10 shadow-xl"
        >
          {lines.map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`mb-4 ${
                index === 0 && section === 1
                  ? "text-2xl text-pink-300 font-medium"
                  : index === lines.length - 1 && section === 3
                    ? "text-xl text-pink-300 italic"
                    : "text-lg text-gray-200"
              }`}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>
      </div>

      <div className="scroll-indicator">
        <ChevronDown className="w-6 h-6 text-white/50" />
      </div>
    </div>
  )
}

export default MessageSlide
