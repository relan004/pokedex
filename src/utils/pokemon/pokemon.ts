type TypeTheme = {
  name: string
  color: string
  rgb: string
  dark: boolean
}

function themeByType(type: string): TypeTheme {
  let typeTheme: TypeTheme = {
    name: type ?? 'normal',
    color: 'neutral',
    rgb: '163, 163, 163',
    dark: false,
  }
  switch (type) {
    case 'grass':
    case 'bug':
      typeTheme.color = 'green'
      typeTheme.rgb = '74, 222, 128'
      break
    case 'water':
    case 'ice':
      typeTheme.color = 'blue'
      typeTheme.rgb = '96, 165, 250'
      break
    case 'fire':
      typeTheme.color = 'red'
      typeTheme.rgb = '255,0,0'
      break
    case 'electric':
      typeTheme.color = 'yellow'
      typeTheme.rgb = '250, 204, 21'
      break
    case 'ghost':
    case 'poison':
      typeTheme.color = 'purple'
      typeTheme.rgb = '192, 132, 252'
      break
    case 'psychic':
    case 'fairy':
      typeTheme.color = 'pink'
      typeTheme.rgb = '244, 114, 182'
      break
    case 'fighting':
    case 'dragon':
      typeTheme.color = 'orange'
      typeTheme.rgb = '251, 146, 60'
      break
    case 'ground':
      typeTheme.color = 'brown'
      typeTheme.rgb = '168, 126, 98'
      break
    case 'rock':
      typeTheme.color = 'slate'
      typeTheme.rgb = '112, 128, 144'
      break
    case 'flying':
      typeTheme.color = 'stone'
      typeTheme.rgb = '163, 163, 163'
      break
    case 'dark':
      typeTheme.color = 'neutral'
      typeTheme.rgb = '33,33,33'
      typeTheme.dark = true
      break
    default:
      break
  }
  return typeTheme
}

function padStart(input: number, minLength: number): string {
  const inputValue: string = input.toString()
  if (inputValue.length < minLength) {
    const zerosToPad = minLength - inputValue.length
    return '0'.repeat(zerosToPad) + inputValue
  }
  return inputValue
}

export { themeByType, padStart }
