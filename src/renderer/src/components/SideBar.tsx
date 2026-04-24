import { NavLink } from 'react-router'
import { Gamepad2, LayoutDashboard,Headset,Settings2 } from 'lucide-react'
const SideBar = () => {
  return (
    <div className="h-full">
      <div className=" flex flex-col justify-between   p-4 bg-surface-container h-full w-20  border-r border-border-subtle">
        <div className='flex flex-col'>
          <NavLink><LayoutDashboard />Inicio</NavLink>
          <NavLink> <Gamepad2 />Minijuegos</NavLink>
         
        </div>

        <div className='flex flex-col'>
          <NavLink><Headset />Soporte</NavLink>
          <NavLink><Settings2 />Ajustes</NavLink>
        </div>
      </div>
    </div>
  )
}

export default SideBar
