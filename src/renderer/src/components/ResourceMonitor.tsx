import { useState, useEffect } from 'react'
import { MemoryStick, Cpu } from 'lucide-react'

const ResourceMonitor = () => {
  const [resources, setResources] = useState<{
    system: { totalMem: number; freeMem: number; usedMem: number }
    app: { heapUsed: number; heapTotal: number; rss: number }
    cpu: { percentCPUUsage: number }
  } | null>(null)

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await window.electronAPI.getResourceUsage()
        setResources(data)
      } catch {
        // Silently fail - only for dev
      }
    }

    fetchResources()
    const interval = setInterval(fetchResources, 2000)

    return () => clearInterval(interval)
  }, [])

  if (!resources) return null

  const systemMemMB = Math.round(resources.system.totalMem / 1024 / 1024)
  const usedMemMB = Math.round(resources.system.usedMem / 1024 / 1024)
  const memPercent = Math.round((usedMemMB / systemMemMB) * 100)

  return (
    <div className="flex items-center gap-3 px-3 py-1.5 bg-gray-900/90 rounded-lg border border-gray-700/50 text-xs">
      <div className="flex items-center gap-1.5" title="Memoria del sistema">
        <MemoryStick className="w-3.5 h-3.5 text-blue-400" />
        <span className="text-gray-300">
          {usedMemMB}MB / {systemMemMB}MB
        </span>
        <div className="w-12 h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${memPercent > 80 ? 'bg-red-500' : memPercent > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
            style={{ width: `${memPercent}%` }}
          />
        </div>
      </div>

      <div className="w-px h-4 bg-gray-600" />

      <div className="flex items-center gap-1.5" title="Memoria de la app">
        <Cpu className="w-3.5 h-3.5 text-purple-400" />
        <span className="text-gray-300">App: {resources.app.rss}MB</span>
      </div>

      <div className="w-px h-4 bg-gray-600" />

      <div className="flex items-center gap-1.5" title="CPU">
        <span className="text-gray-400">CPU:</span>
        <span className={`font-medium ${resources.cpu.percentCPUUsage > 50 ? 'text-red-400' : 'text-green-400'}`}>
          {resources.cpu.percentCPUUsage.toFixed(1)}%
        </span>
      </div>
    </div>
  )
}

export default ResourceMonitor