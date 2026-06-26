import React, { Suspense, lazy } from 'react'

// Three.js is heavy, so the actual WebGL backdrop is code-split into its own
// chunk and streamed in after the page has painted. Until it loads (or if it
// fails), the section simply shows its CSS gradient — no layout shift.
const ThreeBackground = lazy(() => import('./ThreeBackground'))

export default function SectionBackground(props) {
  return (
    <Suspense fallback={null}>
      <ThreeBackground {...props} />
    </Suspense>
  )
}
