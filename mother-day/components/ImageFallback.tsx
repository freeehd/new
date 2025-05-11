"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart } from "lucide-react"

interface ImageFallbackProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
}

export default function ImageFallback({
  src,
  alt,
  fill = false,
  width,
  height,
  className,
  ...props
}: ImageFallbackProps) {
  const [error, setError] = useState(false)

  // If src starts with / but not //, ensure it starts with /images/
  const processedSrc = error
    ? `https://source.unsplash.com/random/?${encodeURIComponent(alt.replace(/[^a-zA-Z0-9 ]/g, ""))}`
    : src.startsWith("/") && !src.startsWith("//") && !src.startsWith("/images/")
      ? `/images${src}`
      : src

  return fill ? (
    <div className="relative w-full h-full">
      <Image
        src={processedSrc || "/placeholder.svg"}
        alt={alt}
        fill
        className={className || "object-cover"}
        onError={() => setError(true)}
        {...props}
      />
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-pink-500/10 to-purple-500/10">
          <Heart className="w-8 h-8 text-pink-500 mb-2" />
          <p className="text-xs text-center text-gray-300 px-2">{alt}</p>
        </div>
      )}
    </div>
  ) : (
    <div className="relative">
      <Image
        src={processedSrc || "/placeholder.svg"}
        alt={alt}
        width={width || 300}
        height={height || 300}
        className={className || ""}
        onError={() => setError(true)}
        {...props}
      />
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-pink-500/10 to-purple-500/10">
          <Heart className="w-8 h-8 text-pink-500 mb-2" />
          <p className="text-xs text-center text-gray-300 px-2">{alt}</p>
        </div>
      )}
    </div>
  )
}
