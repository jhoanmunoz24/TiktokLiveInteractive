import { app, shell, BrowserWindow, ipcMain, WebContentsView, session } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { ElectronBlocker } from '@ghostery/adblocker-electron'
import fetch from 'cross-fetch'
let mainWindow: BrowserWindow
let youtubeMusicView: WebContentsView | null = null
let youtubeMusicVisible = false
let blocker
function openYoutubeMusic(videoId?: string): void {
  if (!mainWindow || mainWindow.isDestroyed()) return

  if (!youtubeMusicView) {
    youtubeMusicView = new WebContentsView()
    const url = videoId
      ? `https://music.youtube.com/watch?v=${videoId}`
      : 'https://music.youtube.com'
    youtubeMusicView.webContents.loadURL(url)
  }

  if (!youtubeMusicVisible) {
    mainWindow.contentView.addChildView(youtubeMusicView)
    youtubeMusicVisible = true
  }

  const windowBounds = mainWindow.getBounds()
  const viewX = 90
  const viewY = 170
  const viewWidth = Math.floor((windowBounds.width - 110) * 0.95)
  const viewHeight = windowBounds.height - 210
  youtubeMusicView.setBounds({ x: viewX, y: viewY, width: viewWidth, height: viewHeight })
  youtubeMusicView.setVisible(true)
}

function closeYoutubeMusic(): void {
  if (youtubeMusicView && youtubeMusicVisible) {
    youtubeMusicView.setVisible(false)
    youtubeMusicVisible = false
  }
}

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 1000,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('resize', () => {
    if (youtubeMusicVisible) {
      mainWindow.webContents.send('window-resized')
    }
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')
  blocker = await ElectronBlocker.fromPrebuiltAdsAndTracking(fetch)
  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  blocker.enableBlockingInSession(session.defaultSession)
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.handle('open-youtube-music', (_, videoId?: string) => {
    openYoutubeMusic(videoId)
  })

  ipcMain.handle('close-youtube-music', () => {
    closeYoutubeMusic()
  })

  ipcMain.handle('go-back', () => {
    if (youtubeMusicView && youtubeMusicView.webContents.canGoBack()) {
      youtubeMusicView.webContents.goBack()
    }
  })

  ipcMain.handle('go-forward', () => {
    if (youtubeMusicView && youtubeMusicView.webContents.canGoForward()) {
      youtubeMusicView.webContents.goForward()
    }
  })

  ipcMain.handle(
    'resize-youtube-view',
    (_, bounds: { x: number; y: number; width: number; height: number }) => {
      if (youtubeMusicView && youtubeMusicVisible) {
        youtubeMusicView.setBounds({
          x: Math.round(bounds.x),
          y: Math.round(bounds.y),
          width: Math.round(bounds.width),
          height: Math.round(bounds.height),
        })
      }
    }
  )

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
