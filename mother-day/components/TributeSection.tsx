"use client"

import { motion } from "framer-motion"
import { MapPin, Calendar, Heart, Star, Plane } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function TributeSection() {
  return (
    <section className="w-full py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pink-800 mb-6">A Tribute to My Mother</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            To the woman who has shaped my world with her love, wisdom, and strength.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Card className="overflow-hidden border-none shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="text-pink-500 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800">Born in Jhang</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Your roots in Jhang have given you such strength and character. I admire how you've carried the beauty
                  of your hometown with you throughout your life.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Card className="overflow-hidden border-none shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="text-pink-500 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800">Forever 36</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  At the young age of 36 (wink), you continue to radiate beauty, grace, and energy. Your youthful spirit
                  at 53 inspires me every day.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <Card className="overflow-hidden border-none shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Plane className="text-pink-500 mr-2" size={24} />
                <h3 className="text-2xl font-semibold text-gray-800">Your Visit to Malaysia</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                When you traveled all the way to Malaysia to take care of me, it showed me the depths of your love. You
                left everything behind just to be there for me.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                Your selfless care during that time meant everything to me. No matter how far apart we are, your love
                always finds a way to reach me.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <Card className="overflow-hidden border-none shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Heart className="text-pink-500 mr-2" size={24} />
                <h3 className="text-2xl font-semibold text-gray-800">My Beginning</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                On April 7, 2000, you brought me into this world. That day marked the beginning of my life's greatest
                blessing — having you as my mother.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                For 23 years, you've been my guide, my support, and my inspiration. Every achievement in my life is a
                testament to your love and guidance.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
            <Star className="text-yellow-400 mx-auto mb-4" size={32} fill="currentColor" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">What Makes You Special</h3>
            <ul className="text-left max-w-lg mx-auto space-y-3">
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">❦</span>
                <span className="text-gray-700">Your unwavering strength that I lean on in difficult times</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">❦</span>
                <span className="text-gray-700">Your smile that brightens even my darkest days</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">❦</span>
                <span className="text-gray-700">Your patience and understanding when I make mistakes</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">❦</span>
                <span className="text-gray-700">Your wisdom that guides me through life's challenges</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">❦</span>
                <span className="text-gray-700">Your selfless love that teaches me how to care for others</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
