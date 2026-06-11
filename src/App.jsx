// ─────────────────────────────────────────────
//  App.jsx
//  Root component — assembles all sections +
//  scroll progress bar + nav + footer
// ─────────────────────────────────────────────

import { useScroll, useSpring, motion } from 'framer-motion'
import Hero      from './components/Hero'
import Story     from './components/Story'
import Details   from './components/Details'
import Programme from './components/Programme'
import RSVP      from './components/RSVP'

// ── Nav link ─────────────────────────────────
function NavLink({ href, children }) {
  return (
    <motion.a
      href={href}
      style={{
        fontFamily: 'Jost, sans-serif',
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        color: '#7A6E69',
      }}
      whileHover={{ color: '#C9897A' }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.a>
  )
}

// ── Main App ──────────────────────────────────
export default function App() {
  // Scroll progress bar
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 25 })

  return (
    <div style={{ background: '#FAF7F2', minHeight: '100vh' }}>

      {/* Scroll progress bar — fixed at top */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          height: 2,
          background: '#C9897A',
          transformOrigin: '0%',
          scaleX,
          zIndex: 200,
        }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        style={{
          position: 'fixed',
          top: 2, left: 0, right: 0,
          zIndex: 100,
          background: 'rgba(250,247,242,0.92)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(201,137,122,0.12)',
          padding: '1rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(1.5rem, 4vw, 3rem)',
        }}
      >
        <NavLink href="#story">Our Story</NavLink>
        <NavLink href="#details">Details</NavLink>
        <NavLink href="#programme">Programme</NavLink>
        <NavLink href="#rsvp">RSVP</NavLink>
      </motion.nav>

      {/* Sections */}
      <main>
        <Hero />
        <Story />
        <Details />
        <Programme />
        <RSVP />
      </main>

      {/* Footer */}
      <footer style={{
        background: '#FAF7F2',
        textAlign: 'center',
        padding: '3rem 1.5rem',
        borderTop: '1px solid rgba(201,137,122,0.1)',
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '2.5rem',
            fontWeight: 300,
            color: '#C9897A',
            letterSpacing: '0.12em',
            marginBottom: '0.5rem',
          }}
        >
          A ✦ P
        </motion.div>
        <p style={{
          fontSize: '0.8rem',
          color: '#7A6E69',
          fontFamily: 'Jost, sans-serif',
          letterSpacing: '0.08em',
        }}>
          14 · 02 · 2026 &nbsp;·&nbsp; Kochi, Kerala
        </p>
      </footer>

    </div>
  )
}hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh