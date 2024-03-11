import Layout from "@/components/Layout"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getPokemonImage, getPokemons } from "@/utils/apis/pokemons/api"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"

interface pokemonData {
  name: string,
  image: string
}
const App = () => {
  const [pokemons, setPokemons] = useState<(pokemonData | undefined)[]>([])
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const scrollToTop = useRef<HTMLDivElement>(null)
  useEffect(() => {
    fetchPokemons('https://pokeapi.co/api/v2/pokemon')

  }, [])

  const fetchPokemons = async (url: string | null) => {

    try {
      const result = await getPokemons(url! || 'https://pokeapi.co/api/v2/pokemon')
      setPrevPage(result.previous)
      setNextPage(result.next)
      const getData = result.results.map(async (pokemon) => {
        try {
          const result = await getPokemonImage(pokemon.url)
          const image = result.sprites.other.dream_world.front_default
          return { name: pokemon.name, image }
        } catch (error) {
          console.log(error)
        }
      })
      const newPokemonData = await Promise.all(getData);
      setPokemons(newPokemonData)

      if (scrollToTop.current) {
        scrollToTop.current.scrollTop = 0;
      }

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout>
      <div ref={scrollToTop} className="h-80% w-full overflow-auto">
        <div className="grid grid-flow-row auto-rows-max grid-cols-2 gap-5 p-8">
          {pokemons.map((pokemon, index) => (
            <Link key={index} to={`pokemon/${pokemon?.name}`}>
              <Card className="flex h-full flex-col items-center justify-between bg-slate-100 dark:bg-transparent shadow-lg ring-black ring dark:ring-white " >
                <CardHeader className="text-slate-900 dark:text-white">
                </CardHeader>
                <CardContent className="flex h-full w-full items-center justify-center">
                  <img src={pokemon?.image} className="w-auto h-auto" alt="image" />
                </CardContent>
                  <CardTitle className="w-full rounded-b-lg bg-black py-2 text-center font-arcade text-xs font-bold uppercase tracking-widest text-white dark:rounded-b-xl">{pokemon?.name}</CardTitle>
                <CardFooter className="text-white">
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
        <div className="col-span-2 flex justify-between">
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 192 512" className="h-10 w-10 disabled:cursor-not-allowed text-black dark:text-white" aria-disabled={!prevPage} onClick={() => fetchPokemons(prevPage)} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M192 127.338v257.324c0 17.818-21.543 26.741-34.142 14.142L29.196 270.142c-7.81-7.81-7.81-20.474 0-28.284l128.662-128.662c12.599-12.6 34.142-3.676 34.142 14.142z"></path></svg>
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 192 512" className="h-10 w-10 disabled:cursor-not-allowed text-black dark:text-white" aria-disabled={!nextPage} onClick={() => fetchPokemons(nextPage)} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path></svg>
        </div>
      </div>
    </Layout>
  )
}

export default App