'use client'

import { useEffect, useState } from 'react'
import { animate, useMotionValue, useMotionValueEvent, useReducedMotion } from 'framer-motion'

interface AnimatedNumberProps {
  value: number
  className?: string
}

export default function AnimatedNumber({ value, className }: AnimatedNumberProps) {
  const reduceMotion = useReducedMotion()
  const motionValue = useMotionValue(reduceMotion ? value : 0)
  const [display, setDisplay] = useState(reduceMotion ? value : 0)

  useEffect(() => {
    if (reduceMotion) {
      motionValue.set(value)
      setDisplay(Math.round(value))
      return
    }

    const controls = animate(motionValue, value, {
      duration: 0.8,
      ease: 'easeOut',
    })
    return () => controls.stop()
  }, [value, motionValue, reduceMotion])

  useMotionValueEvent(motionValue, 'change', (latest) => {
    setDisplay(Math.round(latest))
  })

  return <span className={className}>{display}</span>
}