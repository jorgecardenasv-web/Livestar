'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface ScrollAnimatedComponentProps {
  children: React.ReactNode
}

export const ScrollAnimatedComponent: React.FC<ScrollAnimatedComponentProps> = ({ children }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
