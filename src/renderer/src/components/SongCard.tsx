type SongCardProps = {
  thumbnail: string
  title: string
  artist: string
}
import Skeleton from '../assets/thumbnail_skeleton.png'
const SongCard = ({ thumbnail, title, artist }: SongCardProps) => {
  return (
    <>
      <div className="flex gap-2 hover:bg-gray-800">
        <img src={thumbnail ?? Skeleton} alt="Song Thumbnail" className="h-15 w-15" />
        <div className="flex flex-col">
          <h5 className="font-bold text-lg">{title}</h5>
          <span className="text-stone-500">{artist}</span>
        </div>
      </div>
    </>
  )
}

export default SongCard
