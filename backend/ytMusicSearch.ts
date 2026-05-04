import YTMusic from 'ytmusic-api'

const ytmusic = new YTMusic()

export async function initYTMusic() {
  await ytmusic.initialize()
  console.log('YTMusic initialized')
}

export default ytmusic
