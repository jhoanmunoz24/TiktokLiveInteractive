import type { Server } from 'socket.io'
import { fetchSongs } from './fetchSong.ts'
import {
  TikTokLiveConnection,
  WebcastChatMessage,
  WebcastEvent,
  WebcastGiftMessage,
} from 'tiktok-live-connector'

export async function startTikTokConnection(io: Server) {
  const tiktokUsername = 'coll4zoss'

  type songQueue = {
    title: string
    artist: string
    videoId: string
    uniqueId: string
  }

  const songQueue: songQueue[] = []
  let connection: TikTokLiveConnection | null = null
  let retryDelay = 5000

  async function connect() {
    if (connection) {
      connection.disconnect()
      connection = null
    }

    connection = new TikTokLiveConnection(tiktokUsername)

    connection.on('disconnected', () => {
      console.log(`Disconnected. Retrying in ${retryDelay / 1000}s...`)
      setTimeout(() => {
        retryDelay = Math.min(retryDelay * 2, 60000)
        connect()
      }, retryDelay)
    })

    connection.on('connected', () => {
      console.log('Connected to TikTok Live!')
      retryDelay = 5000
    })

    try {
      const state = await connection.connect()
      console.log(`Connected to roomId ${state.roomId}`)
    } catch (err) {
      console.error('Failed to connect', err)
      setTimeout(() => {
        retryDelay = Math.min(retryDelay * 2, 60000)
        connect()
      }, retryDelay)
      return
    }

    connection.on(WebcastEvent.CHAT, async (data: WebcastChatMessage) => {
      if (songQueue.length >= 50) return

      const uniqueId = data.user?.uniqueId

      if (data.comment.startsWith('!')) {
        const existingSong = songQueue.find((s) => s.uniqueId === uniqueId)

        if (!existingSong) {
          const song = await fetchSongs(data.comment)
          if (!song) {
            console.log('Song not found')
            return
          }

          console.log('Song found:', song)
          songQueue.push({ ...song, uniqueId: uniqueId || '' })
          io.emit('queue-update', songQueue)
          console.log('Queue updated:', songQueue)
        } else {
          console.log(`${uniqueId} already has a song in queue`)
        }
      }
    })

    connection.on(WebcastEvent.GIFT, (data: WebcastGiftMessage) => {
      const giftType = data.giftDetails?.giftType
      const giftName = data.giftDetails?.giftName
      const uniqueId = data.user?.uniqueId
      const nickname = data.user?.nickname

      if (giftType === 1 && !data.repeatEnd) {
        console.log('Gift streak in progress')
      }

      if (uniqueId) {
        console.log(`User uniqueId: ${uniqueId}`)
      }

      if (nickname) {
        console.log(`User nickname: ${nickname}`)
      }

      console.log(`GiftId: ${data.giftId}`)

      if (giftName) {
        console.log(`Gift name: ${giftName}`)
      }
    })
  }

  connect()
}
