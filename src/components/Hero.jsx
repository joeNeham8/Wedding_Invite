// ─────────────────────────────────────────────
//  components/Hero.jsx  — FIXED
//  • Names + & stacked cleanly, no overlap
//  • Countdown fully separated in its own bar
//  • Petals contained to hero area only
//  • Eyebrow / tagline properly spaced
// ─────────────────────────────────────────────

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { fadeUp, curtainReveal, staggerContainer, staggerChild, viewportConfig } from '../animations/variants'

function Petal({ style }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        borderRadius: '50% 0 50% 0',
        background: style.color || '#C9897A',
        left: style.left,
        top: '-16px',
        width: style.width,
        height: style.height,
        opacity: 0,
        pointerEvents: 'none',
      }}
      animate={{ y: ['0px', '105vh'], rotate: [0, style.rotate], opacity: [0, 0.5, 0.38, 0] }}
      transition={{ duration: style.duration, delay: style.delay, repeat: Infinity, ease: 'linear' }}
    />
  )
}

function CountUnit({ value, label }) {
  return (
    <div style={{ textAlign: 'center', minWidth: 64 }}>
      <div style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
        fontWeight: 300,
        lineHeight: 1,
        color: '#FAF7F2',
        letterSpacing: '-0.01em',
      }}>
        {String(value).padStart(2, '0')}
      </div>
      <div style={{
        fontSize: '9px',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: '#6B5E5A',
        fontFamily: 'Jost, sans-serif',
        marginTop: '0.4rem',
      }}>
        {label}
      </div>
    </div>
  )
}

export default function Hero() {
  const WEDDING_DATE = new Date('2026-02-14T10:00:00+05:30')
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const tick = () => {
      const diff = WEDDING_DATE - new Date()
      if (diff <= 0) return
      setTimeLeft({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  const petals = Array.from({ length: 16 }, (_, i) => ({
    left:     `${5 + Math.random() * 90}%`,
    duration: 4 + Math.random() * 5,
    delay:    Math.random() * 7,
    rotate:   160 + Math.random() * 360,
    width:    `${6 + Math.random() * 5}px`,
    height:   `${9 + Math.random() * 8}px`,
    color:    Math.random() > 0.5 ? '#C9897A' : '#e0b5ad',
  }))

  const sep = (
    <span style={{
      fontFamily: 'Cormorant Garamond, serif',
      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
      color: 'rgba(201,137,122,0.4)',
      alignSelf: 'center',
      lineHeight: 1,
      userSelect: 'none',
    }}>·</span>
  )

  return (
    <>
      {/* ── Hero panel ── */}
      <section
        ref={ref}
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FAF7F2',
          overflow: 'hidden',
          paddingTop: '80px',      /* nav clearance */
          paddingBottom: '3rem',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
        }}
      >
        {/* Ambient gradient bg */}
        <motion.div
          aria-hidden
          style={{
            position: 'absolute', inset: 0,
            background:
              'radial-gradient(ellipse 65% 55% at 12% 18%, rgba(201,137,122,0.1) 0%, transparent 65%), ' +
              'radial-gradient(ellipse 55% 65% at 88% 82%, rgba(138,158,140,0.08) 0%, transparent 65%)',
            y: bgY,
            pointerEvents: 'none',
          }}
        />

        {/* Petals */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {petals.map((p, i) => <Petal key={i} style={p} />)}
        </div>

        {/* Content stack */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: '100%' }}
        >
          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#C9897A',
              fontFamily: 'Jost, sans-serif',
              fontWeight: 500,
              marginBottom: '2.5rem',
              opacity: 0.85,
            }}
          >
            — Together with their families —
          </motion.p>

          {/* Names block */}
          <div style={{ lineHeight: 1, marginBottom: '0' }}>
            {/* Arjun */}
            <div style={{ overflow: 'hidden' }}>
              <motion.span
                variants={curtainReveal}
                style={{
                  display: 'block',
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(5rem, 14vw, 11rem)',
                  fontWeight: 300,
                  color: '#2C2420',
                  lineHeight: 0.92,
                  letterSpacing: '-0.02em',
                }}
              >
                Arjun
              </motion.span>
            </div>

            {/* Ampersand */}
            <div style={{ overflow: 'hidden' }}>
              <motion.span
                variants={curtainReveal}
                style={{
                  display: 'block',
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(5rem, 14vw, 11rem)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: 'rgba(201,137,122,0.22)',
                  lineHeight: 0.88,
                  letterSpacing: '-0.02em',
                }}
              >
                &
              </motion.span>
            </div>

            {/* Priya */}
            <div style={{ overflow: 'hidden' }}>
              <motion.span
                variants={curtainReveal}
                style={{
                  display: 'block',
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(5rem, 14vw, 11rem)',
                  fontWeight: 300,
                  color: '#2C2420',
                  lineHeight: 0.92,
                  letterSpacing: '-0.02em',
                }}
              >
                Priya
              </motion.span>
            </div>
          </div>

          {/* Divider + date */}
          <motion.div
            variants={fadeUp}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', margin: '2.5rem 0 1.5rem' }}
          >
            <div style={{ width: 44, height: 1, background: '#C9897A', opacity: 0.4 }} />
            <p style={{
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#7A6E69',
              fontFamily: 'Jost, sans-serif',
              fontWeight: 400,
            }}>
              Saturday · 14 February 2026 · Kochi, Kerala
            </p>
            <div style={{ width: 44, height: 1, background: '#C9897A', opacity: 0.4 }} />
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.3rem',
              fontStyle: 'italic',
              fontWeight: 300,
              color: '#7A6E69',
              letterSpacing: '0.02em',
            }}
          >
            request the honour of your presence
          </motion.p>
        </motion.div>
      </section>

      {/* ── Countdown bar — fully separate from hero ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ background: '#2C2420', padding: '2.5rem 1.5rem' }}
      >
        <p style={{
          textAlign: 'center',
          fontSize: '9px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#C9897A',
          fontFamily: 'Jost, sans-serif',
          fontWeight: 500,
          marginBottom: '1.75rem',
        }}>
          Counting down to forever
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 'clamp(1rem, 4vw, 3rem)' }}>
          <CountUnit value={timeLeft.days}    label="Days" />
          {sep}
          <CountUnit value={timeLeft.hours}   label="Hours" />
          {sep}
          <CountUnit value={timeLeft.minutes} label="Minutes" />
          {sep}
          <CountUnit value={timeLeft.seconds} label="Seconds" />
        </div>
      </motion.div>
    </>
  )
}