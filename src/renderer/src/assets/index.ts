const images = import.meta.glob('./minigames/*.png', { eager: true, import: 'default' }) as Record<
  string,
  string
>

console.log('Imágenes encontradas:', images) // ← agrega esto

export const getImage = (filename: string): string => {
  const key = `./minigames/${filename}`
  console.log('Buscando key:', key) // ← y esto
  console.log('Resultado:', images[key]) // ← y esto
  return images[key] ?? ''
}
