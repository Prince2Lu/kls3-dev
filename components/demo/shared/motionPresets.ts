import type { Transition } from 'framer-motion'

export const listItemTransition: Transition = {
  duration: 0.25,
  ease: 'easeOut',
}

export const listItemInitial = { opacity: 0, y: -8 }
export const listItemAnimate = { opacity: 1, y: 0 }
export const listItemExit = { opacity: 0, scale: 0.95 }

export const fadeWaitTransition: Transition = {
  duration: 0.2,
  ease: 'easeOut',
}