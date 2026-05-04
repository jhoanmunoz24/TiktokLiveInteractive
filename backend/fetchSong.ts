import ytmusic from './ytMusicSearch.ts'

export async function fetchSongs(song: string) {
  try {
    const results = await ytmusic.search(song)

    const firstSong = results.find((item) => item.type === 'SONG')

    if (!firstSong) {
      return null
    }

    return {
      title: firstSong.name,
      artist: firstSong.artist.name,
      videoId: firstSong.videoId,
      thumbnail: firstSong.thumbnails[0].url || '',
    }
  } catch (error) {
    console.log(error)
    return null
  }
}
