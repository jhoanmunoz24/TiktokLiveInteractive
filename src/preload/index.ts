import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

contextBridge.exposeInMainWorld('electronAPI', {
  goBack: () => ipcRenderer.invoke('go-back'),
  goForward: () => ipcRenderer.invoke('go-forward'),
  openYoutubeMusic: (videoId?: string) => ipcRenderer.invoke('open-youtube-music', videoId),
  closeYoutubeMusic: () => ipcRenderer.invoke('close-youtube-music'),
  resizeYoutubeView: (width: number, height: number, x: number, y: number) =>
    ipcRenderer.invoke('resize-youtube-view', width, height, x, y),

  onWindowResized: (callback: () => void) => {
    ipcRenderer.on('window-resized', callback)
    return () => ipcRenderer.removeListener('window-resized', callback)
  },
})

