import { Plyr } from 'plyr-react'
import 'plyr-react/plyr.css'
import { socket } from '../socket.ts'
import { useEffect, useRef, useState } from 'react'
import SongCard from '@renderer/components/SongCard'

type Song = {
  id: string
  title: string
  artist: string
  thumbnail: string
  videoId: string
}

const YoutubeAPI = () => {
  const [songs, setSongs] = useState<Song[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const plyrRef = useRef<any>(null)

  useEffect(() => {
    socket.on('queue-update', (updatedQueue: Song[]) => {
      setSongs(updatedQueue)
      console.log(updatedQueue)
    })
    return () => {
      socket.off('queue-update')
    }
  }, [])

  useEffect(() => {
    let player: any = null

    const tryAttach = () => {
      player = plyrRef.current?.plyr
      if (!player) return

      const onEnded = () => {
        setCurrentIndex((prev) => (prev + 1 < songs.length ? prev + 1 : prev))
      }

      player.on('ready', () => {
        player.on('ended', onEnded)
      })

      if (player.ready) {
        player.on('ended', onEnded)
      }
    }

    const timeout = setTimeout(tryAttach, 300)
    return () => clearTimeout(timeout)
  }, [songs.length, currentIndex])

  const currentSong = songs[currentIndex]

  const plyrProps = {
    source: currentSong
      ? {
          type: 'video' as const,
          sources: [
            {
              src: currentSong.videoId,
              provider: 'youtube' as const,
              size: 720,
            },
          ],
        }
      : { type: 'video' as const, sources: [] },
    options: {
      controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
      autoplay: currentIndex > 0,
    },
  }

  return (
    <div className="flex p-4 rounded-2xl">
      <div className="w-[700px] h-[500px] mx-4">
        <Plyr ref={plyrRef} {...plyrProps} />
      </div>

      <div className="bg-black h-100 flex-1 overflow-y-scroll rounded-2xl gap-4 flex flex-col p-4">
        {songs.map((song, index) => (
          <SongCard
            key={song.videoId}
            thumbnail={song.thumbnail}
            title={song.title}
            artist={song.artist}
            isPlaying={index === currentIndex}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default YoutubeAPI
