// Sections that read best centered in the viewport (they're shorter than a
// full screen, so aligning to the top would reveal the next section).
const CENTERED = new Set(['serve', 'connect'])

export function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: CENTERED.has(id) ? 'center' : 'start' })
  }
}
