import React from 'react'

const YTMusicOverlay = () => {
  return (
    <div>
        <div>
          <h5>REPRODUCIENDO AHORA</h5>
          <span>{currentSong?.title}</span>
          <span>{currentSong?.artist}</span>

          <div>Duracion</div>
          <div>
            <img src={currentSong?.thumbnail} alt="" className="h-20 w-20" />
          </div>
        </div>
      </div>

      <div>
        <h5>Proximas</h5>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
        </ul>
      </div>
      <div>
        <img src="" alt="" />
        <span>Dragon envio un regalo</span>
        <p>Reproduciendo su cancion ahora</p>
        </div>
    </div>>
    
  )
}

export default YTMusicOverlay