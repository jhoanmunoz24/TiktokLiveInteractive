import { NavLink } from 'react-router'
import { useState } from 'react'
const Header = () => {
  const [user, setUser] = useState<boolean>(false)

  return (
    <>
      <div className="relative flex justify-between items-center p-4 bg-surface h-15 w-full">
        <div>
          <h1 className="text-primary-accent font-bold text-2xl">GIFTPLAY</h1>
        </div>
        <div>
          <NavLink to="/">Home</NavLink>
        </div>

        <button
          className="w-10 h-10 rounded-full bg-primary-accent text-white font-bold text-sm flex items-center justify-center"
          onClick={() => setUser(!user)}
        >
          JM
        </button>

        {user && (
          <div className="absolute top-12 right-0 bg-surface rounded-md shadow-lg p-4">
            <p className="text-sm text-gray-300">Jhoan Munoz</p>
            <button className="w-full mt-2 px-4 py-2 bg-primary-accent text-white rounded-md text-sm font-medium">
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Header
