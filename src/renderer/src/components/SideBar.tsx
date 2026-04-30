import { NavLink } from 'react-router'
import { Gamepad2, LayoutDashboard, Headset, Settings2, Music } from 'lucide-react'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Inicio' },
  { to: '/minigames', icon: Gamepad2, label: 'Minijuegos' },
  { to: '/youtubeoverlay', icon: Music, label: 'YouTube' },
  { to: '/soporte', icon: Headset, label: 'Soporte' },
  { to: '/ajustes', icon: Settings2, label: 'Ajustes' },
]

const SideBar = () => {
  return (
    <div className="h-full overflow-visible">
      <div className=" flex flex-col justify-between   p-4 bg-surface-container h-full w-20  border-r border-border-subtle text-gray-500 overflow-x-visible">
        <div className="flex flex-col text-sm gap-4 ">
          {navItems.slice(0, 2).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="relative flex flex-col items-center py-2 z-0 hover:text-white
                before:absolute before:inset-y-0 before:-left-4 before:right-[-30px]
                before:rounded-r-md before:bg-[#EE1D52] before:opacity-0
                before:-z-10 before:transition-opacity
                hover:before:opacity-100"
            >
              <item.icon />
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="flex flex-col">
          {navItems.slice(2).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="relative flex flex-col items-center py-2 z-0 hover:text-white
                before:absolute before:inset-y-0 before:-left-4 before:right-[-25px]
                before:rounded-r-md before:bg-[#EE1D52] before:opacity-0
                before:-z-10 before:transition-opacity
                
                hover:before:opacity-100"
            >
              <item.icon />
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideBar
