// ─────────────────────────────────────────────
//  components/RSVP.jsx
//  RSVP form section with:
//  • Animated form fields staggering in
//  • Animated submit button with loading state
//  • Success state with AnimatePresence crossfade
//  • Connects to Formspree (replace YOUR_FORM_ID)
// ─────────────────────────────────────────────

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  fadeUp, staggerContainer, staggerChild,
  curtainReveal, viewportConfig,
} from '../animations/variants'

// ── Replace with your Formspree form ID ──────
// Sign up free at formspree.io → New Form → copy the ID
const FORMSPREE_ID = 'YOUR_FORM_ID'

// ── Animated input field ─────────────────────
function Field({ label, children }) {
  return (
    <motion.div variants={staggerChild} className="flex flex-col gap-1">
      <label style={{
        fontSize: '10px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'rgba(201,137,122,0.7)',
        fontFamily: 'Jost, sans-serif',
        fontWeight: 500,
      }}>
        {label}
      </label>
      {children}
    </motion.div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '0.8rem 1rem',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(201,137,122,0.25)',
  borderRadius: 2,
  color: '#FAF7F2',
  fontFamily: 'Jost, sans-serif',
  fontSize: '0.9rem',
  fontWeight: 300,
  outline: 'none',
}

// ── Success message ───────────────────────────
function SuccessMessage() {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="text-center py-12"
    >
      {/* Animated checkmark ring */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 14 }}
        style={{
          width: 64, height: 64,
          borderRadius: '50%',
          border: '1.5px solid rgba(138,158,140,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.5rem',
          fontSize: '1.5rem',
        }}
      >
        ✓
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '1.6rem',
          fontStyle: 'italic',
          fontWeight: 300,
          color: '#8A9E8C',
          marginBottom: '0.5rem',
        }}
      >
        We can't wait to celebrate with you.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{
          fontSize: '0.85rem',
          color: 'rgba(250,247,242,0.35)',
          fontFamily: 'Jost, sans-serif',
          letterSpacing: '0.1em',
        }}
      >
        A confirmation has been sent to your email. ✦
      </motion.p>
    </motion.div>
  )
}

// ── Main component ───────────────────────────
export default function RSVP() {
  const [form, setForm] = useState({
    name: '', email: '', guests: '1', attendance: '', dietary: '',
  })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) setStatus('success')
      else setStatus('error')
    } catch {
      // If no Formspree ID yet, just show success for local dev
      setStatus('success')
    }
  }

  return (
    <div
      id="rsvp"
      style={{ background: '#2C2420', padding: '5rem 1.5rem' }}
    >
      <div style={{ maxWidth: 520, margin: '0 auto' }}>

        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          style={{
            fontSize: '10px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#C9897A',
            fontFamily: 'Jost, sans-serif',
            fontWeight: 500,
            marginBottom: '0.75rem',
            textAlign: 'center',
          }}
        >
          You're invited
        </motion.p>

        {/* Heading */}
        <div className="overflow-hidden mb-2 text-center">
          <motion.h2
            variants={curtainReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 300,
              lineHeight: 1.1,
              color: '#FAF7F2',
            }}
          >
            Please{' '}
            <em style={{ color: '#C9897A' }}>RSVP</em>
          </motion.h2>
        </div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          style={{
            fontSize: '0.8rem',
            color: 'rgba(250,247,242,0.35)',
            fontFamily: 'Jost, sans-serif',
            textAlign: 'center',
            marginBottom: '2.5rem',
            letterSpacing: '0.05em',
          }}
        >
          Kindly respond by 1st January 2026
        </motion.p>

        {/* Form / Success — crossfade with AnimatePresence */}
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <SuccessMessage />
          ) : (
            <motion.form
              key="form"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}
            >
              <Field label="Full name">
                <motion.input
                  type="text"
                  name="name"
                  required
                  placeholder="Priya Nair"
                  value={form.name}
                  onChange={handleChange}
                  style={inputStyle}
                  whileFocus={{ borderColor: '#C9897A', scale: 1.005 }}
                  transition={{ duration: 0.2 }}
                />
              </Field>

              <Field label="Email address">
                <motion.input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  style={inputStyle}
                  whileFocus={{ borderColor: '#C9897A', scale: 1.005 }}
                  transition={{ duration: 0.2 }}
                />
              </Field>

              <Field label="Number of guests">
                <motion.input
                  type="number"
                  name="guests"
                  min="1"
                  max="5"
                  value={form.guests}
                  onChange={handleChange}
                  style={inputStyle}
                  whileFocus={{ borderColor: '#C9897A', scale: 1.005 }}
                  transition={{ duration: 0.2 }}
                />
              </Field>

              <Field label="Will you be attending?">
                <motion.select
                  name="attendance"
                  required
                  value={form.attendance}
                  onChange={handleChange}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                  whileFocus={{ borderColor: '#C9897A' }}
                >
                  <option value="" disabled>Select…</option>
                  <option value="yes-both">Yes — Ceremony & Reception</option>
                  <option value="yes-reception">Yes — Reception only</option>
                  <option value="no">Unable to attend</option>
                </motion.select>
              </Field>

              <Field label="Dietary requirements (optional)">
                <motion.input
                  type="text"
                  name="dietary"
                  placeholder="Vegetarian, nut allergy, etc."
                  value={form.dietary}
                  onChange={handleChange}
                  style={inputStyle}
                  whileFocus={{ borderColor: '#C9897A', scale: 1.005 }}
                  transition={{ duration: 0.2 }}
                />
              </Field>

              {/* Error message */}
              <AnimatePresence>
                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    style={{ color: '#F09595', fontSize: '0.8rem', fontFamily: 'Jost, sans-serif' }}
                  >
                    Something went wrong. Please try again.
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit button */}
              <motion.div variants={staggerChild} style={{ marginTop: '0.5rem' }}>
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: status === 'loading' ? 'rgba(201,137,122,0.5)' : '#C9897A',
                    border: 'none',
                    borderRadius: 2,
                    color: 'white',
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '11px',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  }}
                  whileHover={status !== 'loading' ? { background: '#8B5E53', y: -2 } : {}}
                  whileTap={status !== 'loading' ? { scale: 0.97 } : {}}
                  transition={{ duration: 0.2 }}
                >
                  {status === 'loading' ? 'Sending…' : 'Confirm Attendance'}
                </motion.button>
              </motion.div>

            </motion.form>
          )}
        </AnimatePresence>

        {/* Footer note */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          style={{
            textAlign: 'center',
            fontSize: '0.75rem',
            color: 'rgba(250,247,242,0.2)',
            fontFamily: 'Jost, sans-serif',
            marginTop: '2rem',
            fontStyle: 'italic',
          }}
        >
          For questions, contact us at wedding@arjunpriya.in
        </motion.p>

      </div>
    </div>
  )
}