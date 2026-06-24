import { getProject, types } from '@theatre/core'

// One Theatre.js project/sheet for the whole site's cinematic layer.
// In development we load Theatre Studio (the visual keyframe editor) so the
// timeline can be authored/tuned live. Studio is dynamically imported and
// guarded by import.meta.env.DEV, so it is code-split out of the production
// bundle entirely.
export const project = getProject('Widespread Cinema')
export const sheet = project.sheet('Homepage')

if (import.meta.env.DEV) {
  import('@theatre/studio')
    .then(({ default: studio }) => studio.initialize())
    .catch(() => {
      /* studio is optional — ignore if it fails to load */
    })
}

// Decorative hero accents Theatre can drive (non-conflicting with the
// scroll-parallax baseline). Author keyframes for these in Studio.
export const heroAccents = sheet.object('Hero Accents', {
  glowX: types.number(0, { range: [-200, 200] }),
  glowY: types.number(0, { range: [-200, 200] }),
  glowOpacity: types.number(0.5, { range: [0, 1] }),
  driftRotate: types.number(0, { range: [-180, 180] }),
})

export { types }
