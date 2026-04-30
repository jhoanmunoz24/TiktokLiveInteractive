import { Outlet } from 'react-router'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import ResourceMonitor from '../components/ResourceMonitor'

export default function Layout() {
  return (
    <div className="flex h-screen overflow-visible">
      <div className="relative z-10 overflow-visible">
        <SideBar />
      </div>
      <div className="flex flex-col flex-1 gap-4 text-on-surface overflow-hidden">
        <Header />
        {import.meta.env.DEV && <ResourceMonitor />}
        <Outlet />
      </div>
    </div>
  )
}
