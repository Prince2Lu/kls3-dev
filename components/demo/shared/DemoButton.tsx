'use client'

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'

type DemoButtonProps = HTMLMotionProps<'button'>

export default function DemoButton({
  type = 'button',
  disabled,
  children,
  ...props
}: DemoButtonProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.button
      {...props}
      type={type}
      disabled={disabled}
      whileTap={disabled || reduceMotion ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.1, ease: 'easeOut' }}
    >
      {children}
    </motion.button>
  )
}