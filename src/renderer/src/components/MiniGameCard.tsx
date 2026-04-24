import React from 'react'

const MiniGameCard = ({title, description, status}) => {
  return (
    <div className='w-30 bg-surface-container'>
      <h3>{title}</h3>
      <p>{description}</p>
      <span>{status}</span>
    </div>
  )
}

export default MiniGameCard