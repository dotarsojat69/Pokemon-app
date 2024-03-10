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
        <div className="grid grid-flow-row auto-rows-max grid-cols-2 gap-3 p-5">
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
        <div className="w-full text-slate-900 flex justify-between text-2xl py-12 sm:py-5">
          <button className="py-2 px-5 border bg-white border-slate-400 disabled:cursor-not-allowed rounded-lg" disabled={!prevPage} onClick={() => fetchPokemons(prevPage)}>Prev</button>
          <button className="py-2 px-5 border bg-white border-slate-400 disabled:cursor-not-allowed rounded-lg" disabled={!nextPage} onClick={() => fetchPokemons(nextPage)}>Next</button>
        </div>
      </div>
    </Layout>
  )
}

export default App