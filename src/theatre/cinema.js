import { getProject, types } from '@theatre/core'

// One Theatre.js project/sheet for the whole site's cinematic layer.
// (The Theatre Studio visual editor is intentionally not loaded — the hero
// accents below just use their default values.)
export const project = getProject('Widespread Cinema')
export const sheet = project.sheet('Homepage')

// Decorative hero accents Theatre can drive (non-conflicting with the
// scroll-parallax baseline). Author keyframes for these in Studio.
export const heroAccents = sheet.object('Hero Accents', {
  glowX: types.number(0, { range: [-200, 200] }),
  glowY: types.number(0, { range: [-200, 200] }),
  glowOpacity: types.number(0.5, { range: [0, 1] }),
  driftRotate: types.number(0, { range: [-180, 180] }),
})

export { types }
