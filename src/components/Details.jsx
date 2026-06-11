// ─────────────────────────────────────────────
//  components/Details.jsx  — FIXED
// ─────────────────────────────────────────────

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, staggerChild, springHover, curtainReveal, viewportConfig } from '../animations/variants'

const details = [
  {
    label: 'Ceremony',
    title: 'Hindu Wedding Rites',
    lines: ['Saturday, 14 February 2026', '10:00 AM — 1:00 PM', 'Pookattupady Temple Hall', 'Ernakulam, Kerala'],
    link: { label: 'Get Directions →', href: 'https://maps.google.com' },
  },
  {
    label: 'Reception',
    title: 'Evening Celebration',
    lines: ['Saturday, 14 February 2026', '7:00 PM onwards', 'Grand Hyatt Kochi Bolgatty', 'Mulavukad Island, Kochi'],
    link: { label: 'Get Directions →', href: 'https://maps.google.com' },
  },
  {
    label: 'Dress Code',
    title: 'Festive Traditional',
    lines: ['Traditional Indian attire', 'or festive Western wear.', 'Colour of the day:', 'Soft gold & ivory'],
    link: null,
  },
  {
    label: 'Accommodation',
    title: 'Where to stay',
    lines: ['Grand Hyatt Kochi Bolgatty', 'Mention "Arjun & Priya Wedding"', 'for our special rate', 'when booking.'],
    link: { label: 'Book a room →', href: 'https://www.hyatt.com' },
  },
]

function DetailCard({ detail, index }) {
  return (
    <motion.div variants={staggerChild} style={{ height: '100%' }}>
      <motion.div
        variants={springHover}
        whileHover="hover"
        whileTap="tap"
        style={{
          height: '100%',
          padding: '2.25rem 2rem',
          background: 'white',
          border: '1px solid rgba(201,137,122,0.18)',
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          cursor: 'default',
        }}
      >
        {/* Diamond icon */}
        <motion.span
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportConfig}
          transition={{ delay: index * 0.1 + 0.25, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'block', fontSize: '1rem', color: '#C9897A', marginBottom: '1.5rem' }}
        >
          ✦
        </motion.span>

        {/* Label */}
        <p style={{
          fontSize: '10px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#C9897A',
          fontFamily: 'Jost, sans-serif',
          fontWeight: 500,
          marginBottom: '0.45rem',
        }}>
          {detail.label}
        </p>

        {/* Title */}
        <h3 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '1.55rem',
          fontWeight: 300,
          color: '#2C2420',
          lineHeight: 1.2,
          marginBottom: '1.25rem',
        }}>
          {detail.title}
        </h3>

        {/* Info lines */}
        <div style={{ flex: 1, marginBottom: '1.5rem' }}>
          {detail.lines.map((line, i) => (
            <p key={i} style={{
              fontSize: '0.875rem',
              color: '#7A6E69',
              lineHeight: 2,
              fontFamily: 'Jost, sans-serif',
              fontWeight: 300,
            }}>
              {line}
            </p>
          ))}
        </div>

        {/* Link */}
        {detail.link && (
          <motion.a
            href={detail.link.href}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-block',
              fontSize: '11px',
              letterSpacing: '0.12em',
              color: '#C9897A',
              fontFamily: 'Jost, sans-serif',
              fontWeight: 500,
              textDecoration: 'none',
              borderBottom: '1px solid rgba(201,137,122,0.4)',
              paddingBottom: '2px',
              alignSelf: 'flex-start',
            }}
            whileHover={{ letterSpacing: '0.2em', borderBottomColor: '#C9897A' }}
            transition={{ duration: 0.3 }}
          >
            {detail.link.label}
          </motion.a>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function Details() {
  return (
    <div id="details" style={{ background: '#F2E4DF', padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Eyebrow */}
        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}
          style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C9897A', fontFamily: 'Jost, sans-serif', fontWeight: 500, marginBottom: '0.75rem' }}
        >
          Save the date
        </motion.p>

        {/* Heading */}
        <div style={{ overflow: 'hidden', marginBottom: '3.5rem' }}>
          <motion.h2
            variants={curtainReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 300, color: '#2C2420', lineHeight: 1.1 }}
          >
            Wedding <em style={{ color: '#C9897A', fontStyle: 'italic' }}>details</em>
          </motion.h2>
        </div>

        {/* Cards grid */}
        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}
        >
          {details.map((detail, i) => (
            <DetailCard key={detail.label} detail={detail} index={i} />
          ))}
        </motion.div>

        {/* Add to calendar */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <motion.a
            href="https://calendar.google.com"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 2.5rem',
              border: '1px solid rgba(201,137,122,0.45)',
              borderRadius: 2,
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#8B5E53',
              fontFamily: 'Jost, sans-serif',
              fontWeight: 500,
              textDecoration: 'none',
              background: 'transparent',
            }}
            whileHover={{ background: '#C9897A', color: 'white', borderColor: '#C9897A' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            ＋ Add to calendar
          </motion.a>
        </motion.div>

      </div>
    </div>
  )
}