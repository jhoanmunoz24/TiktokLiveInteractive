const images = import.meta.glob('./minigames/*.png', { eager: true, import: 'default' }) as Record<
  string,
  string
>

export const getImage = (filename: string): string => {
  const key = `./minigames/${filename}`

  return images[key] ?? ''
}
