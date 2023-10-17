/* eslint-disable @next/next/no-img-element */
import {
  Chart as ChartJS,
  Filler,
  LineElement,
  PointElement,
  RadialLinearScale,
} from 'chart.js'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { padStart, themeByType } from '@/utils/pokemon/pokemon'

import Button from '@/components/Button/Button'
import Chip from '@/components/Chip/Chip'
import Head from 'next/head'
import Link from 'next/link'
import { Radar } from 'react-chartjs-2'
import Stat from '@/components/Stat/Stat'
import clsx from 'clsx'
import { getPokemonData } from '../api/PokemonService'
import { useRouter } from 'next/router'

ChartJS.register(Filler, RadialLinearScale, PointElement, LineElement)

export default function PokemonPage({
  id,
  pokemon,
}: {
  id: number
  pokemon: PokemonProps
}) {
  const router = useRouter()

  //state
  const [data, setData] = useState(pokemon)

  //memos
  const image = useMemo(() => {
    const paddedId = data ? padStart(data.id, 3) : ''
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`
  }, [data])
  const flavor_text = useMemo(() => {
    return data
      ? data.pokemon_species?.flavor_text_entries.find(
          (entry: any) => entry.language.name === 'en'
        )
      : null
  }, [data])

  //effects
  useEffect(() => {
    // console.log(data, 'data')
  }, [data])

  useEffect(() => {
    async function apiCall() {
      if (!router.query.id) return
      const apiDataResponse: any = await getPokemonData(
        `https://pokeapi.co/api/v2/pokemon/${router.query.id}`
      )
      const apiSpeciesResponse: any = await getPokemonData(
        `https://pokeapi.co/api/v2/pokemon-species/${router.query.id}`
      )
      const apiEvolutionResponse: any = apiSpeciesResponse.evolution_chain
        ? await getPokemonData(apiSpeciesResponse.evolution_chain.url)
        : []
      const apiResponseTheme = themeByType(apiDataResponse.types[0].type.name)

      setData({
        ...apiDataResponse,
        pokemon_species: apiSpeciesResponse,
        evolution_chain: apiEvolutionResponse.chain,
        theme: { ...apiResponseTheme },
      })
    }
    apiCall()
  }, [router])

  const renderEvolutionChain = (pokemon: any) => {
    if (pokemon) {
      const speciesName = pokemon.species.name
      const speciesID = getSpeciesNumberFromURL(pokemon.species.url)
      const paddedId = speciesID ? padStart(speciesID, 3) : ''
      const speciesImage = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`
      return (
        <>
          {speciesID == data?.id ? (
            <div key={`evolution${speciesID}`}>
              <img src={speciesImage} alt={speciesName} />
              <div className='font-bold'>{speciesName}</div>
            </div>
          ) : (
            <Link key={`evolution${speciesID}`} href={`/pokemon/${speciesID}`}>
              <img src={speciesImage} alt={speciesName} />
              <div>{speciesName}</div>
            </Link>
          )}
          {pokemon.evolves_to.map((evolution: any) => {
            return (
              <Fragment key={`${evolution.species.name}`}>
                {renderEvolutionChain(evolution)}
              </Fragment>
            )
          })}
        </>
      )
    }
    return null
  }

  const getSpeciesNumberFromURL = (url: string) => {
    const parts = url.split('/')
    return parseInt(parts[parts.length - 2]) // Assuming the species number is the second-to-last part
  }

  const RadarData = {
    labels: data?.stats.map((stat) => stat.stat.name),
    datasets: [
      {
        label: 'Base',
        backgroundColor: `rgba(${data?.theme.rgb},.6)`,
        borderColor: `rgba(${data?.theme.rgb},1)`,
        pointBackgroundColor: 'transparent',
        pointBorderColor: 'transparent',
        data: data?.stats.map((stat) => stat.base_stat),
      },
    ],
  }
  const RadarOptions: any = {
    scale: {
      ticks: {
        min: 0,
        max: 200,
        stepSize: 25,
        beginAtZero: true,
        display: false,
      },
    },
    scales: {
      r: {
        pointLabels: {
          ticks: { display: false },
          font: { fontSize: 20, weight: 700 },
        },
      },
    },
  }

  return (
    <>
      <Head>
        <title>{data ? data.name + ':' : ''} Pokedex Entry</title>
        <meta name='description' content='Read more' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        {data && (
          <div className={`min-h-screen`}>
            {/* hero */}
            <div
              className={clsx(
                'hero',
                `bg-gradient-to-r from-${data.theme.color}-${
                  data.theme.dark ? 900 : 500
                } to-${data.theme.color}-${data.theme.dark ? 700 : 400}`
              )}
            >
              <Link href={'/'} className='absolute top-4 left-4'>
                <Button>Go Back</Button>
              </Link>
              <img src={image} alt={data.name} className='mx-auto' />
            </div>
            <div className='container flex gap-10 lg:gap-16 max-w-4xl py-10 flex-col lg:flex-row'>
              <div className='lg:w-3/5 '>
                {/* info component*/}
                <div>
                  <h1 className='capitalize mb-2'>{data.name}</h1>
                  <div className='flex gap-2 text-xs mb-4'>
                    {data.types?.map((type: any) => {
                      const chipTheme = themeByType(type.type.name)
                      const chipClass = `${chipTheme.color}-${
                        data.theme.dark ? 700 : 400
                      }`
                      return (
                        <Chip key={`type${type.slot}`} color={chipClass}>
                          {type.type.name}
                        </Chip>
                      )
                    })}
                  </div>
                  <div className='max-w-[25rem]'>
                    {flavor_text?.flavor_text}
                  </div>
                </div>
                {/* moves component */}
                <div className='mt-10'>
                  <h2>Moves</h2>
                  <ul>
                    {data.moves?.map((move, id) => {
                      return id < 4 ? (
                        <li key={`move${move.move.name}${data.id}`}>
                          {move.move.name.replace('-', ' ')}
                        </li>
                      ) : null
                    })}
                  </ul>
                </div>
                {/* evolutions component */}
                {data.evolution_chain.evolves_to.length > 0 && (
                  <div className='mt-10'>
                    <h2>Evolutions</h2>
                    <div className='grid grid-cols-3 gap-6 text-center text-xs font-medium'>
                      {renderEvolutionChain(data.evolution_chain)}
                    </div>
                  </div>
                )}
              </div>
              <div className='lg:w-2/5 text-center grow-0 shadow-md p-6 rounded-sm bg-white'>
                <h2>Base Stats</h2>
                {/* chart component */}
                <div className='max-w-md'>
                  <Radar
                    data={RadarData}
                    options={RadarOptions}
                    width={250}
                    className='mx-auto'
                  />
                </div>
                {/* stats component */}
                <div className='grid grid-cols-3 mt-4 gap-6 justify-center'>
                  {data.stats.map((stat) => {
                    return (
                      <Stat
                        key={`stat${stat.stat.name}`}
                        value={parseInt(stat.base_stat)}
                        label={stat.stat.name}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  )
}

interface PokemonProps {
  id: number
  name: string
  theme: {
    name: string
    color: string
    rgb: string
    dark: boolean
  }
  types: [{ type: { name: string; url: string }; slot: number }]
  moves: [{ move: { name: string; url: string } }]
  stats: [{ stat: { name: string; url: string }; base_stat: string }]
  pokemon_species: any
  evolution_chain: any
}
