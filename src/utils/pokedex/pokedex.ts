import { getPokemon } from '../../pages/api/PokemonService'
import { useQuery } from '@tanstack/react-query'

interface PokedexQuery {
  limit: number
  offset: number
}
const pokedexQuery = {
  limit: 151,
  offset: 0,
}

function usePokedex(
  query: PokedexQuery = pokedexQuery,
  region: string = 'kanto'
) {
  return useQuery<any, Error, any>(
    ['pokedex', region],
    () => getPokemon(query),
    {
      refetchOnWindowFocus: false,
    }
  )
}

async function prefetchPokedex(
  queryClient: any,
  query: PokedexQuery = pokedexQuery,
  region: string = 'kanto'
) {
  return queryClient.prefetchQuery({
    queryKey: ['pokedex', region],
    queryFn: () => getPokemon(query),
  })
}

export { usePokedex, prefetchPokedex }
