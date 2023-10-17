import { getPokedexData } from '../../pages/api/PokemonService'
import { useQuery } from '@tanstack/react-query'

interface PokedexDataQuery {
  limit: number
  offset: number
}

const pokedexDataQuery = {
  limit: 151,
  offset: 0,
}

function usePokedexData(
  query: PokedexDataQuery = pokedexDataQuery,
  region: string = 'kanto'
) {
  return useQuery<any, Error, any>(
    ['pokedexData', region],
    () => getPokedexData(query),
    {
      refetchOnWindowFocus: false,
    }
  )
}

export { getPokedexData, usePokedexData }
