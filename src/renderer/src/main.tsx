import './assets/main.css'

import { createRoot } from 'react-dom/client'
import Home from './pages/Home'
import YoutubeAPI from './pages/YoutubeAPI'

import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import Layout from './pages/Layout'
import Minigames from './components/Minigames'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/minigames',
        element: <Minigames />,
      },
      {
        path: '/youtubeoverlay',
        element: <YoutubeAPI />,
      },
    ],
  },
])

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')
createRoot(rootElement).render(<RouterProvider router={router} />)
