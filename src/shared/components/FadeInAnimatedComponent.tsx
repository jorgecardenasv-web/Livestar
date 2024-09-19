'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface FadeInAnimatedComponentProps {
  children: React.ReactNode
}

export const FadeInAnimatedComponent: React.FC<FadeInAnimatedComponentProps> = ({ children }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1} : { opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
