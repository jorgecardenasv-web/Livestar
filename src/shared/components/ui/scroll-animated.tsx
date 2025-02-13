'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef, useEffect } from 'react'

interface ScrollAnimatedComponentProps {
  children: React.ReactNode;
  initialVisible?: boolean;
}

export const ScrollAnimatedComponent: React.FC<ScrollAnimatedComponentProps> = ({
  children,
  initialVisible = false
}) => {
  const ref = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 1],
    [initialVisible ? 1 : 0, 1, 1]
  )

  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 1],
    [initialVisible ? 0 : 20, 0, 0]
  )

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        y: shouldReduceMotion ? 0 : y,
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </motion.div>
  )
}
