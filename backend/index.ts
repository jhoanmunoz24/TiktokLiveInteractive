import express from 'express'
import type { Request, Response } from 'express'
import cors from 'cors'
import { initYTMusic } from './ytMusicSearch.ts'
import { startTikTokConnection } from './tiktokConnection.ts'
import { Server } from 'socket.io'
import { createServer } from 'http'
const app = express()
const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

const port = 3000
app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hola mundo')
})

const songs: string[] = []

app.get('/songs', async (req: Request, res: Response) => {})

app.get('array/songs', (req: Request, res: Response) => {
  res.json({ songs })
})

async function startServer() {
  await initYTMusic()

  server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

startServer()
startTikTokConnection(io)
