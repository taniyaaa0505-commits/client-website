import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

/**
 * Animated GPU backdrop for a section. Two refined looks:
 *   - variant="aurora": flowing liquid-marble / aurora (domain-warped fbm)
 *   - variant="blobs":  morphing lava-lamp metaballs
 * Both render as a single fullscreen shader quad (cheap), tinted with the
 * section palette and easing toward the cursor. Purely decorative — sits
 * behind content (z-0, pointer-events: none).
 *
 * Performance-aware: pauses offscreen, honours prefers-reduced-motion, caps
 * pixel ratio, and disposes on unmount.
 */

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

// Shared noise helpers + two effect bodies, selected with a #define.
const NOISE = /* glsl */ `
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float noise(vec2 p){
    vec2 i = floor(p); vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0.0; float a = 0.5;
    for (int i = 0; i < 5; i++){ v += a * noise(p); p *= 2.0; a *= 0.5; }
    return v;
  }
`

const FRAG_AURORA = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float u_time; uniform vec2 u_res; uniform vec2 u_mouse; uniform float u_seed;
  uniform vec3 u_c1; uniform vec3 u_c2; uniform vec3 u_c3;
  ${NOISE}
  void main(){
    float aspect = u_res.x / u_res.y;
    vec2 uv = vUv; uv.x *= aspect;
    uv += (u_mouse - 0.5) * 0.25;            // gentle parallax to cursor
    float t = u_time * 0.05 + u_seed;
    float sc = 1.6;

    // domain warping for that flowing marble / aurora look
    vec2 q = vec2(fbm(uv * sc + vec2(0.0, t)),
                  fbm(uv * sc + vec2(5.2, 1.3) - t));
    vec2 r = vec2(fbm(uv * sc + 2.2 * q + vec2(1.7, 9.2) + 0.15 * t),
                  fbm(uv * sc + 2.2 * q + vec2(8.3, 2.8) + 0.126 * t));
    float f = fbm(uv * sc + 2.6 * r);

    vec3 col = mix(u_c1, u_c2, clamp(f * f * 2.2, 0.0, 1.0));
    col = mix(col, u_c3, clamp(length(q), 0.0, 1.0));
    col = mix(col, u_c1, clamp(r.y, 0.0, 1.0) * 0.55);
    col += pow(clamp(f, 0.0, 1.0), 3.0) * 0.18;   // soft highlights

    float alpha = (0.30 + 0.70 * smoothstep(0.15, 0.95, f)) * 0.92;
    gl_FragColor = vec4(col, alpha);
  }
`

const FRAG_BLOBS = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float u_time; uniform vec2 u_res; uniform vec2 u_mouse; uniform float u_seed;
  uniform vec3 u_c1; uniform vec3 u_c2; uniform vec3 u_c3;
  float ball(vec2 p, vec2 c, float r){ vec2 d = p - c; return (r * r) / dot(d, d); }
  void main(){
    float aspect = u_res.x / u_res.y;
    vec2 p = vUv; p.x *= aspect;
    float t = u_time * 0.22 + u_seed;
    vec2 b1 = vec2(aspect * (0.30 + 0.16 * sin(t * 0.90)),       0.34 + 0.18 * cos(t * 1.10));
    vec2 b2 = vec2(aspect * (0.70 + 0.18 * sin(t * 0.70 + 1.0)), 0.66 + 0.16 * cos(t * 0.85 + 2.0));
    vec2 b3 = vec2(aspect * (0.50 + 0.22 * sin(t * 0.55 + 3.0)), 0.50 + 0.20 * cos(t * 0.65 + 0.5));
    vec2 b4 = vec2(aspect * (0.22 + 0.14 * sin(t * 1.20 + 2.5)), 0.74 + 0.14 * cos(t * 1.00 + 1.5));
    vec2 b5 = vec2(aspect * (0.80 + 0.12 * sin(t * 0.95 + 4.0)), 0.28 + 0.15 * cos(t * 1.15 + 3.5));
    vec2 bm = vec2(u_mouse.x * aspect, u_mouse.y);
    float f = 0.0;
    f += ball(p, b1, 0.26); f += ball(p, b2, 0.24); f += ball(p, b3, 0.30);
    f += ball(p, b4, 0.20); f += ball(p, b5, 0.22); f += ball(p, bm, 0.20);
    float mask = smoothstep(0.85, 1.7, f);
    float rim  = smoothstep(0.95, 1.25, f) * (1.0 - smoothstep(1.25, 2.2, f));
    float gx = clamp(vUv.x * 0.8 + 0.5 + 0.5 * sin(t * 0.6), 0.0, 1.0);
    vec3 col = mix(u_c1, u_c2, gx);
    col = mix(col, u_c3, clamp(vUv.y + 0.25 * sin(t * 0.5 + vUv.x * 3.0), 0.0, 1.0));
    col += rim * 0.25;
    gl_FragColor = vec4(col, mask * 0.78);
  }
`

const FRAG_CONTOUR = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float u_time; uniform vec2 u_res; uniform vec2 u_mouse; uniform float u_seed;
  uniform vec3 u_c1; uniform vec3 u_c2; uniform vec3 u_c3;
  ${NOISE}
  void main(){
    float aspect = u_res.x / u_res.y;
    vec2 uv = vUv; uv.x *= aspect;
    uv += (u_mouse - 0.5) * 0.12;                 // slight parallax
    float t = u_time * 0.025 + u_seed;

    // slowly evolving height field -> topographic map
    float h = fbm(uv * 2.3 + vec2(t, -t * 0.6));

    // minor contour lines (anti-aliased via screen-space derivative)
    float bands = h * 16.0;
    float fb = fract(bands);
    float db = min(fb, 1.0 - fb);
    float wb = fwidth(bands);
    float minor = 1.0 - smoothstep(0.0, wb * 1.5, db);

    // every 5th line emphasised (index contour)
    float maj = bands / 5.0;
    float fm = fract(maj);
    float dm = min(fm, 1.0 - fm);
    float wm = fwidth(maj);
    float major = 1.0 - smoothstep(0.0, wm * 1.5, dm);

    vec3 base = mix(u_c1, u_c2, clamp(h, 0.0, 1.0));
    vec3 col = mix(base, u_c3, max(minor, major));

    float alpha = minor * 0.32 + major * 0.45 + 0.03;  // thin lines + faint wash
    gl_FragColor = vec4(col, alpha);
  }
`

function hexToRgb(hex) {
  const n = parseInt(hex.replace('#', ''), 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

export default function ThreeBackground({
  colors = ['#3da8e0', '#7ac74f', '#ff7a66'],
  variant = 'aurora',
  seed = 0,
  className = '',
}) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    let width = mount.clientWidth || 1
    let height = mount.clientHeight || 1

    THREE.ColorManagement.enabled = false
    const scene = new THREE.Scene()
    const camera = new THREE.Camera()
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const pal = [0, 1, 2].map((i) => hexToRgb(colors[i] || colors[colors.length - 1]))
    const uniforms = {
      u_time: { value: 0 },
      u_res: { value: new THREE.Vector2(width, height) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_seed: { value: seed },
      u_c1: { value: new THREE.Vector3(...pal[0]) },
      u_c2: { value: new THREE.Vector3(...pal[1]) },
      u_c3: { value: new THREE.Vector3(...pal[2]) },
    }

    const frag =
      variant === 'blobs' ? FRAG_BLOBS : variant === 'contour' ? FRAG_CONTOUR : FRAG_AURORA
    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: frag,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      extensions: { derivatives: true }, // for fwidth() in the contour shader
    })
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
    scene.add(quad)

    const clock = new THREE.Clock()
    let raf = 0
    let visible = true
    let targetX = 0.5
    let targetY = 0.5

    const render = () => {
      uniforms.u_time.value = clock.getElapsedTime()
      const m = uniforms.u_mouse.value
      m.x += (targetX - m.x) * 0.04
      m.y += (targetY - m.y) * 0.04
      renderer.render(scene, camera)
    }
    const loop = () => { if (!visible) return; render(); raf = requestAnimationFrame(loop) }
    const start = () => { if (!raf) raf = requestAnimationFrame(loop) }
    const stop = () => { cancelAnimationFrame(raf); raf = 0 }

    if (reduce) render(); else start()

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (reduce) return
        if (visible) start(); else stop()
      },
      { threshold: 0 }
    )
    io.observe(mount)

    const onPointer = (e) => {
      const r = mount.getBoundingClientRect()
      targetX = (e.clientX - r.left) / (r.width || 1)
      targetY = 1.0 - (e.clientY - r.top) / (r.height || 1)
    }
    if (!reduce) window.addEventListener('pointermove', onPointer, { passive: true })

    const onResize = () => {
      width = mount.clientWidth || 1
      height = mount.clientHeight || 1
      renderer.setSize(width, height)
      uniforms.u_res.value.set(width, height)
      if (reduce) render()
    }
    const ro = new ResizeObserver(onResize)
    ro.observe(mount)

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onPointer)
      quad.geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
    }
  }, [colors, variant, seed])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
    />
  )
}
