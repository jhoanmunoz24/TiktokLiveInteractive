interface MiniGameCardProps {
  title: string
  description: string
  status: string
  img: string
}

const MiniGameCard = ({ title, description, status, img }: MiniGameCardProps) => {
  return (
    <div className="w-80 bg-surface-container rounded-2xl overflow-hidden relative">
      <span className="absolute top-2 left-2 bg-primary text-on-primary px-2 py-1 rounded-full text-sm border-on-primary/20 border">
        {status}
      </span>
      <img src={img} alt="Youtube Music Overlay" className="" />
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-bold text-xl">{title}</h3>
        <p className="text-on-background">{description}</p>
      </div>
    </div>
  )
}

export default MiniGameCard