import { padStart, themeByType } from '@/utils/pokemon/pokemon'

import Chip from '../Chip/Chip'
import Link from 'next/link'
import styles from './PokemonCard.module.css'
import { useRouter } from 'next/router'

interface PokemonCardProps {
  id: number
  paddedId: string
  name: string
  types: [{ type: { name: string; url: string }; slot: number }]
}

export default function PokemonCard({
  pokemon,
}: {
  pokemon: PokemonCardProps
}) {
  pokemon.paddedId = padStart(pokemon.id, 3)
  const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.paddedId}.png`

  const cardTheme = themeByType(pokemon.types[0].type.name)
  const cardPath = `/pokemon/${pokemon.id}`
  const router = useRouter()

  const routeChange = () => {
    router.push(cardPath)
  }
  return (
    <div
      className={`${styles['pokemon-card']} pokemon-card bg-${
        cardTheme.color
      }-${cardTheme.dark ? 400 : 100}`}
      onClick={routeChange}
    >
      <div
        className={`rounded-md bg-gradient-to-r from-${cardTheme.color}-${
          cardTheme.dark ? 900 : 500
        } to-${cardTheme.color}-${cardTheme.dark ? 700 : 400}`}
      >
        <img src={image} alt={pokemon.name} className='mx-auto' />
      </div>
      <div className='flex gap-2 text-xs my-2'>
        {pokemon.types?.map((type: any) => {
          const chipTheme = themeByType(type.type.name)
          const chipClass = `${chipTheme.color}-${cardTheme.dark ? 700 : 400}`
          return (
            <Chip key={type.slot} color={chipClass}>
              {type.type.name}
            </Chip>
          )
        })}
      </div>
      <div className='flex justify-between'>
        <div className={`${styles['pokemon-card__name']}`}>{pokemon.name}</div>
        <span className=''>#{pokemon.id}</span>
      </div>
      <Link href={cardPath}>Go to Pokemon</Link>
    </div>
  )
}
