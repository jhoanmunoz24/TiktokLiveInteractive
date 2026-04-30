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

createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
