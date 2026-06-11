// ─────────────────────────────────────────────
//  components/Programme.jsx  — FIXED
// ─────────────────────────────────────────────

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp, staggerContainer, staggerChild, curtainReveal, viewportConfig } from '../animations/variants'

const events = [
  { time: '9:00 AM',  title: 'Guest Arrival & Welcome',  desc: 'Guests welcomed with garlands, traditional Carnatic music, and morning refreshments.', icon: '✦' },
  { time: '10:00 AM', title: 'The Wedding Ceremony',      desc: 'The sacred rites begin — the exchange of garlands, tying of the thali, and the saptapadi: seven vows for a lifetime.', icon: '♡' },
  { time: '1:00 PM',  title: 'Wedding Lunch',             desc: 'A traditional Kerala sadya served on banana leaves, with family and loved ones gathered around long tables.', icon: '✿' },
  { time: '4:00 PM',  title: 'Sunset Cruise',             desc: 'An optional evening cruise for close family on the Kochi backwaters before the reception.', icon: '◇' },
  { time: '7:00 PM',  title: 'Evening Reception & Dinner',desc: 'Dancing, live music, heartfelt toasts, and a celebratory feast at the Bolgatty ballroom.', icon: '★' },
]

function ProgrammeEvent({ event, index }) {
  return (
    <motion.div
      variants={staggerChild}
      style={{
        display: 'grid',
        gridTemplateColumns: '140px 1fr',
        gap: '0 2.5rem',
        marginBottom: '3rem',
        alignItems: 'start',
      }}
    >
      {/* LEFT: time + dot */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', paddingTop: '2px' }}>
        <span style={{
          fontSize: '11px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#C9897A',
          fontFamily: 'Jost, sans-serif',
          fontWeight: 500,
          lineHeight: 1,
          marginBottom: '10px',
        }}>
          {event.time}
        </span>
        {/* Dot — sits on the center line */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={viewportConfig}
          transition={{ delay: index * 0.12 + 0.2, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: '#C9897A',
            border: '2.5px solid #FAF7F2',
            outline: '1.5px solid #C9897A',
            flexShrink: 0,
          }}
        />
      </div>

      {/* RIGHT: content */}
      <div style={{ paddingBottom: '0.5rem' }}>
        <h3 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '1.5rem',
          fontStyle: 'italic',
          fontWeight: 300,
          color: '#2C2420',
          lineHeight: 1.2,
          marginBottom: '0.6rem',
          marginTop: '-2px',
        }}>
          {event.title}
        </h3>
        <p style={{
          fontSize: '0.875rem',
          color: '#7A6E69',
          lineHeight: 1.85,
          fontFamily: 'Jost, sans-serif',
          fontWeight: 300,
          maxWidth: 520,
        }}>
          {event.desc}
        </p>
      </div>
    </motion.div>
  )
}

export default function Programme() {
  const timelineRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 0.85', 'end 0.5'] })
  const scaleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), { stiffness: 80, damping: 20 })

  return (
    <section id="programme" style={{ padding: '6rem 1.5rem', background: '#FAF7F2' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}
          style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C9897A', fontFamily: 'Jost, sans-serif', fontWeight: 500, marginBottom: '0.75rem' }}
        >
          The day's journey
        </motion.p>

        <div style={{ overflow: 'hidden', marginBottom: '4rem' }}>
          <motion.h2
            variants={curtainReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 300, color: '#2C2420', lineHeight: 1.1 }}
          >
            Programme
          </motion.h2>
        </div>

        {/* Timeline wrapper — the vertical line runs behind the grid */}
        <div ref={timelineRef} style={{ position: 'relative' }}>

          {/* Ghost track line */}
          <div style={{
            position: 'absolute',
            top: 0, bottom: 0,
            left: 133,           /* aligns to center of the dot column */
            width: 1,
            background: 'rgba(201,137,122,0.15)',
          }} />

          {/* Animated fill line */}
          <motion.div style={{
            position: 'absolute',
            top: 0,
            left: 133,
            width: 1,
            background: 'rgba(201,137,122,0.55)',
            transformOrigin: 'top',
            scaleY,
            height: '100%',
          }} />

          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig}
          >
            {events.map((event, i) => (
              <ProgrammeEvent key={event.time} event={event} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}