import { Play, ArrowLeft, ArrowRight, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

declare global {
  interface Window {
    electronAPI: {
      goBack: () => Promise<void>
      goForward: () => Promise<void>
      openYoutubeMusic: (videoId?: string) => Promise<void>
      closeYoutubeMusic: () => Promise<void>
      resizeYoutubeView: (bounds: {
        x: number
        y: number
        width: number
        height: number
      }) => Promise<void>
      onWindowResized: (callback: () => void) => () => void
    }
  }
}

const YoutubeAPI = () => {
  const [showControls, setShowControls] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null) // ✅ ref al área donde va YouTube

  const updateViewSize = () => {
    if (!viewportRef.current || !showControls) return

    // ✅ Coordenadas reales del div en la pantalla
    const rect = viewportRef.current.getBoundingClientRect()

    window.electronAPI.resizeYoutubeView({
      x: Math.round(rect.left),
      y: Math.round(rect.top),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    })
  }

  useEffect(() => {
    if (!showControls) return

    // Pequeño delay para que el DOM se actualice primero
    const timeout = setTimeout(updateViewSize, 100)

    // Escuchar resize del DOM
    window.addEventListener('resize', updateViewSize)

    // ✅ Escuchar resize de la ventana Electron
    const removeListener = window.electronAPI.onWindowResized(updateViewSize)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('resize', updateViewSize)
      removeListener()
    }
  }, [showControls])

  const handleOpen = () => {
    window.electronAPI.openYoutubeMusic()
    setShowControls(true)
  }

  const handleClose = () => {
    window.electronAPI.closeYoutubeMusic()
    setShowControls(false)
  }

  return (
    <div className="flex flex-col h-full p-4" ref={containerRef}>
      {/* Botones superiores */}
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={handleOpen}
          className="flex items-center gap-3 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-red-600/30"
        >
          <Play className="w-5 h-5 fill-white" />
          Abrir YouTube Music
        </button>

        {showControls && (
          <button
            onClick={handleClose}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-all"
          >
            <X className="w-4 h-4" />
            Cerrar
          </button>
        )}
      </div>

      {/* Controles de navegación */}
      {showControls && (
        <div className="flex items-center gap-3 mb-4 p-3 bg-gray-900/80 rounded-xl border border-gray-700/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-red-600 rounded-full">
            <Play className="w-4 h-4 fill-white text-white" />
            <span className="text-white font-medium text-sm">YouTube Music</span>
          </div>

          <div className="h-6 w-px bg-gray-600 mx-2" />

          <button
            onClick={() => window.electronAPI.goBack()}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Atrás</span>
          </button>

          <button
            onClick={() => window.electronAPI.goForward()}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all hover:scale-105"
          >
            <span className="text-sm">Adelante</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="ml-auto flex items-center gap-2 text-gray-400 text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Reproduciendo
          </div>
        </div>
      )}

      {/* ✅ Este div es el área exacta donde se posiciona YouTube Music */}
      <div
        ref={viewportRef}
        className="flex-1 relative rounded-2xl overflow-hidden border border-gray-700/30"
      >
        {!showControls && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 bg-gradient-to-b from-gray-900 to-gray-800">
            <Play className="w-20 h-20 mb-4 text-gray-600" />
            <p className="text-lg">Haz clic en "Abrir YouTube Music" para comenzar</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default YoutubeAPI
