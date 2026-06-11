// ─────────────────────────────────────────────
//  animations/variants.js
//  Reusable Framer Motion configs for the whole site
// ─────────────────────────────────────────────

// Fade up — used on almost every section element
export const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

// Stagger container — wraps a list of children that appear one by one
export const staggerContainer = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

// Stagger child — each card/item inside a staggerContainer
export const staggerChild = {
  hidden:  { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

// Curtain text reveal — text slides up from behind a hidden overflow mask
export const curtainReveal = {
  hidden:  { y: '105%' },
  visible: {
    y: '0%',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

// Fade in only — for backgrounds, overlays, decorative elements
export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.2, ease: 'easeOut' },
  },
}

// Slide in from left
export const slideLeft = {
  hidden:  { opacity: 0, x: -40 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

// Slide in from right
export const slideRight = {
  hidden:  { opacity: 0, x: 40 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

// Spring hover — used on cards and buttons
// Apply as: whileHover="hover" whileTap="tap" variants={springHover}
export const springHover = {
  hover: {
    y: -5, scale: 1.02,
    transition: { type: 'spring', stiffness: 320, damping: 18 },
  },
  tap: {
    scale: 0.97,
    transition: { type: 'spring', stiffness: 400, damping: 20 },
  },
}

// Viewport config — reuse on every whileInView component
// Triggers animation once when 15% of element is visible
export const viewportConfig = { once: true, amount: 0.15 }