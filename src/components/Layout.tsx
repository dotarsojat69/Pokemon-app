/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect } from "react"
import Navbar from "./Navbar"
import { useLocation, useParams } from "react-router-dom"
import Footer from "./footer"

interface props {
  children: ReactNode
}
const Layout = ({ children }: Readonly<props>) => {
  const { name } = useParams();

  const { pathname } = useLocation()
  useEffect(() => {
    if (pathname === "/") {
      document.title = "Pokemon App"
    } else if (pathname === `/pokemon/${name}`) {
      document.title = `Pokemon - ${name}`
    } else if (pathname === `/battle/${name}`) {
      document.title = `Battle - ${name}`
    } else {
      document.title = "My - Pokemon"
    }
  }, [pathname, name]);
  return (
    <div className="flex justify-center bg-slate-900 xs:hidden">
      <div className="layout-container min-w-full max-w-full bg-white dark:bg-neutral-800 md:min-w-[480px] md:max-w-[480px]">
      <Navbar />
      {children}
      <Footer />
      </div>
    </div>
  )
}

export default Layout