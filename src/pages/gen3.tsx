import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { getPokedexData, usePokedexData } from '../utils/pokedex/pokedexData'
import { useEffect, useState } from 'react'

import Head from 'next/head'
import PokemonCard from '@/components/PokemonCard/PokemonCard'
import SearchForm from '@/components/Form/Form/SearchForm'
import { prefetchPokedex } from '@/utils/pokedex/pokedex'

export default function Home3() {
  const {
    data: dataPokedex,
    error,
    isFetching,
  } = usePokedexData({
    limit: 135,
    offset: 251,
  })
  const [pokedex, setPokedex] = useState(dataPokedex)

  useEffect(() => {
    setPokedex(dataPokedex)
  }, [dataPokedex])

  const filterPokedexByName = (formData: any) => {
    const filteredArray = dataPokedex
      ? dataPokedex.filter((item: any) => item.name.includes(formData.name))
      : []
    setPokedex(filteredArray)
  }

  const filterPokedexByType = (pokemonType: any) => {
    const filteredArray = dataPokedex
      ? dataPokedex.filter((item: any) =>
          item.types.some((type: any) => type.type.name.includes(pokemonType))
        )
      : []
    setPokedex(filteredArray)
  }

  return (
    <>
      <Head>
        <title>Generation III: Pokedex</title>
        <meta name='description' content='Personal Project' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='py-10'>
        <div className='container'>
          <h1>Generation III</h1>

          <SearchForm
            className='mb-8'
            handleSearch={filterPokedexByName}
            handleFilter={filterPokedexByType}
          />

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
            {pokedex?.map((pokemon: any, id: number) => {
              return <PokemonCard key={pokemon.id} pokemon={pokemon} />
            })}
          </div>
        </div>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const queryClient = new QueryClient()

  await prefetchPokedex(queryClient, {
    limit: 151,
    offset: 0,
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
