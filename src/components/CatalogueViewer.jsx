import React, { useEffect, useState } from 'react'
import { X, Download, FileText, ExternalLink } from 'lucide-react'

/**
 * Fullscreen catalogue reader. Shows the brand's PDF in an embedded frame with
 * download / open-in-new-tab actions. Animated open/close, ESC to dismiss.
 */
export default function CatalogueViewer({ brand, onClose }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
    const onKey = (e) => { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClose = () => {
    setShow(false)
    setTimeout(onClose, 300)
  }

  if (!brand) return null

  return (
    <div className="fixed inset-0 z-[60] flex flex-col">
      <div
        className={`absolute inset-0 bg-stone-900/70 backdrop-blur-sm transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
      />

      <div
        className={`relative m-auto flex h-[92vh] w-[94vw] max-w-5xl flex-col overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-2xl transition-all duration-300 ease-smooth ${
          show ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-6 scale-95 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-stone-100 px-5 sm:px-7 py-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-stone-100 overflow-hidden bg-white">
              <img src={brand.image} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0">
              <h3 className="font-display text-xl sm:text-2xl font-light text-stone-800 leading-tight truncate">
                {brand.name} Catalogue
              </h3>
              <p className="text-xs text-stone-400 font-body truncate">{brand.tagline}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={brand.catalogue}
              download
              className="hidden sm:flex items-center gap-2 rounded-full border border-stone-200 px-3.5 py-2 text-xs font-body text-stone-600 hover:border-sky-400 hover:text-sky-700 transition-colors"
            >
              <Download size={14} />
              Download
            </a>
            <button
              onClick={handleClose}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* PDF body */}
        <div className="relative flex-1 bg-stone-50">
          <object data={brand.catalogue} type="application/pdf" className="h-full w-full">
            {/* Fallback when the PDF can't be embedded (or isn't added yet) */}
            <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                <FileText size={26} />
              </div>
              <p className="font-display text-2xl font-light text-stone-700">
                Catalogue preview unavailable
              </p>
              <p className="max-w-sm text-sm text-stone-500 font-body">
                This catalogue may still be on its way. You can try opening it directly:
              </p>
              <a
                href={brand.catalogue}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary rounded-full inline-flex items-center gap-2"
              >
                Open PDF <ExternalLink size={14} />
              </a>
            </div>
          </object>
        </div>
      </div>
    </div>
  )
}
