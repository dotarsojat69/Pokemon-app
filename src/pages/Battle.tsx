import Layout from "@/components/Layout"
import battleground from "../../public/images/battleground.jpg"
import { getPokemonImage } from "@/utils/apis/pokemons/api"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Modal from "@/components/Modal"


interface PromiseType {
  status: string,
  message: string
}

const Battle = () => {
  const [response, setResponse] = useState<PromiseType>()
  const [isLoading, setIsLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const { name } = useParams()

  useEffect(() => {
    fetchImage()
  }, [])

  const fetchImage = async () => {
    try {
      const result = await getPokemonImage(`https://pokeapi.co/api/v2/pokemon/${name}`)
      const getImage = result.sprites.other.home.front_default
      setImageUrl(getImage)
    } catch (error) {
      console.log(error)
    }
  }

  const catchRun = () => {
    return new Promise<PromiseType>((resolve, rejects) => {

      const randomNum = +(Math.random() * 100).toFixed(0);

      setTimeout(() => {
        if (randomNum > 50) {
          resolve({
            status: "success",
            message: "congratulation! you caught " + name
          })
        } else {
          rejects({
            status: "failed",
            message: "You missed"
          })
        }
      }, 200)
    })
  }


  const playGame = async () => {
    setIsLoading(true)
    try {
      const response = await catchRun()
      setResponse(response)
      setIsLoading(false)

    } catch (error: any) {
      alert(error.message)
      setIsLoading(false)

    }
  }


  return (
    <Layout>
      <div className="container h-screen bg-red-50 p-0 relative">

        {response?.status === "success" &&
          <div className="fixed inset-0 bg-black/20 z-10">
            <Modal message={response.message} image={imageUrl} name={name!} />
          </div>
        }
        <img src={imageUrl} alt="pokemon" className="absolute top-1/3 -translate-y-1/4 right-1/2 translate-x-1/2 w-[100px] h-[100px]" />
        <button className="absolute top-10 right-1/4 rounded-2xl border border-black shadow-lg shadow-black dark:border-white m-3 p-5 undefined undefined bg-green-900 text-white cursor-auto">Wild {name} appear ?</button>
        <img src={battleground} alt="background" className="grid w-full h-full grid-flow-col bg-cover bg-center bg-repeat" />
        <div className="absolute bottom-10 right-1/2 translate-x-1/2 gap-6 flex flex-col md:flex-row pb-20 ">
          
          <button className="border border-black dark:border-white m-0 p-1 rounded-2xl bg-sky-500 ring-3 ring-white text-white font-bold font-mono cursor-auto">What will you do ?</button>
          <button className="border border-black dark:border-white m-0 p-1 rounded-2xl bg-amber-500 ring-3 ring-white text-white font-bold font-mono disabled:cursor-wait" disabled={isLoading} onClick={playGame}>Catch Run</button>
        </div>
      </div>
    </Layout>
  )
}

export default Battle