import MiniGameCard from './MiniGameCard'

import { getImage } from '../assets/index'

const Minigames = () => {
  const games = [
    {
      id: 1,
      title: 'Youtube Music Overlay',
      description: 'El chat Maneja la reproducción de tu música en Youtube',
      status: 'valid',
      img: getImage('reproducer_img.png'),
      link: 'youtubeoverlay',
    },
  ]
  return (
    <div className="px-5 flex flex-col gap-9">
      <div>
        <h1 className="font-headline-xl text-5xl ">Minijuegos</h1>
        <p className="text-xl mt-4 text-on-background">
          Engancha a tu audiencia con los minijuegos interactivos controlados por el chat de Tiktok
        </p>
      </div>

      {games.map((game) => (
        <MiniGameCard
          key={game.id}
          title={game.title}
          description={game.description}
          status={game.status}
          img={game.img}
          link={game.link}
        />
      ))}
    </div>
  )
}

export default Minigames
