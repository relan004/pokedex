import ApiService from './ApiService'

const defaultQuery: PokemonQuery = {
  limit: 151,
  offset: 0,
}

interface PokemonQuery {
  limit: number
  offset: number
}

interface ApiResponse {
  results: []
}

export const getPokemon = async (query: PokemonQuery = defaultQuery) => {
  try {
    let response: ApiResponse = await ApiService.get(
      `https://pokeapi.co/api/v2/pokemon`,
      query
    )
    return response.results
  } catch (err) {
    throw err
  }
}

// Single pokemon
export const getPokemonData = async (url: string) => {
  try {
    let response = await ApiService.get(url)
    return response
  } catch (err) {
    throw err
  }
}

// Multi pokemon
export const getPokedexData = async (query: PokemonQuery = defaultQuery) => {
  try {
    // Get pokemon list
    let pokemons = await getPokemon(query)
    let pokemonPromises = pokemons?.map((p: any) => getPokemonData(p.url))

    // Return all the pokemon data
    return await Promise.all(pokemonPromises)
  } catch (err) {
    throw err
  }
}
