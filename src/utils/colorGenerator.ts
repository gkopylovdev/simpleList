const HEX_SYMBS = "0123456789ABCDEF"

type GeneratedRandomColorGetter = () => string
export const getGeneratedRandomColor: GeneratedRandomColorGetter = () => {
  let color = "#"

  for (let i = 0; i < 6; i++) {
    color += HEX_SYMBS[Math.floor(Math.random() * 16)]
  }

  return color
}
