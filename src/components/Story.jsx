// ─────────────────────────────────────────────
//  components/Story.jsx  — FIXED
// ─────────────────────────────────────────────

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, staggerChild, springHover, curtainReveal, viewportConfig } from '../animations/variants'

const stories = [
  { year: '2021', title: "The first hello",     text: "We crossed paths at a mutual friends rooftop gathering in Kochi. What started as a conversation about monsoon books turned into a three-hour walk along the waterfront.", icon: '✦' },
  { year: '2022', title: "Becoming us",          text: "Weekend trips to Munnar and Alleppey, lazy Sundays at the Fort Kochi market, and countless shared meals slowly turned two lives into one story.", icon: '✿' },
  { year: '2023', title: "A year of firsts",     text: "Our first Onam together, first road trip to Wayanad, first time cooking a Kerala sadya — badly — and laughing through every bite.", icon: '♡' },
  { year: '2024', title: "The question",         text: "Under the lantern light at the Dutch Palace gardens, Arjun asked Priya to spend every monsoon, every summer, and every lifetime with him. She said yes.", icon: '◇' },
]

function StoryCard({ story, index }) {
  return (
    <motion.div variants={staggerChild}>
      <motion.div
        variants={springHover}
        whileHover="hover"
        whileTap="tap"
        style={{
          padding: '2.25rem 2rem',
          border: '1px solid rgba(201,137,122,0.18)',
          borderRadius: 3,
          background: index % 2 === 0 ? '#FAF7F2' : 'white',
          cursor: 'default',
          height: '100%',
        }}
      >
        <div style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '3.2rem',
          fontWeight: 300,
          color: 'rgba(201,137,122,0.2)',
          lineHeight: 1,
          marginBottom: '0.6rem',
        }}>
          {story.year}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
          <span style={{ color: '#C9897A', fontSize: '0.7rem' }}>{story.icon}</span>
          <h3 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1.35rem',
            fontStyle: 'italic',
            fontWeight: 300,
            color: '#2C2420',
          }}>
            {story.title}
          </h3>
        </div>

        <p style={{ fontSize: '0.875rem', color: '#7A6E69', lineHeight: 1.85, fontFamily: 'Jost, sans-serif', fontWeight: 300 }}>
          {story.text}
        </p>

        <motion.div
          style={{ height: 1, background: '#C9897A', originX: 0, marginTop: '1.5rem' }}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function Story() {
  return (
    <section id="story" style={{ padding: '6rem 1.5rem', background: '#FAF7F2' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportConfig}
          style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C9897A', fontFamily: 'Jost, sans-serif', fontWeight: 500, marginBottom: '0.75rem' }}
        >
          How it began
        </motion.p>

        <div style={{ overflow: 'hidden', marginBottom: '3.5rem' }}>
          <motion.h2
            variants={curtainReveal} initial="hidden" whileInView="visible" viewport={viewportConfig}
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 300, lineHeight: 1.1, color: '#2C2420' }}
          >
            A love story <em style={{ color: '#C9897A', fontStyle: 'italic' }}>written in stars</em>
          </motion.h2>
        </div>

        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}
        >
          {stories.map((story, i) => (
            <StoryCard key={story.year} story={story} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}