import { useEffect, useState } from 'react'

import Head from 'next/head'
import { Inter } from 'next/font/google'
import PokemonCard from '@/components/PokemonCard/PokemonCard'
import { usePokedexData } from '../utils/pokedex/pokedexData'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: dataPokedex, error, isFetching } = usePokedexData()
  const [pokedex, setPokedex] = useState(dataPokedex)

  useEffect(() => {
    console.log(dataPokedex, 'loaded')
    setPokedex(dataPokedex ?? [])
  }, [dataPokedex])

  return (
    <>
      <Head>
        <title>Pokedex</title>
        <meta name='description' content='Personal Project' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={''}>
        <div className='container'>
          <h1 className='text-3xl pb-10'>Adventure!</h1>
          walk around!
        </div>
      </main>
    </>
  )
}
