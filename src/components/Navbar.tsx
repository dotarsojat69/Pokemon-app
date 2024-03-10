import useTheme from "@/utils/hooks/useTheme";
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-gray-200 bg-black px-2 py-2.5 sm:px-4">
          <div className="container mx-auto flex items-center justify-center">
            <Link to={"/"}>
            <img
              src="https://pokemon-iota-jet.vercel.app/_next/image?url=%2FPokeBall.ico&w=64&q=75"
              className="h-14 md:h-auto"
              alt="pokemon"
            />
              </Link>
            <li className="absolute top-2 right-4 h-8 w-8">
            <button onClick={() => toggleTheme()}>
              {theme === "dark" ? (
                <Sun className="text-slate-900 dark:text-white w-8 h-8" />
              ) : (
                <Moon className="text-slate-900 dark:text-white w-8 h-8" />
              )}
            </button>
          </li>
          </div>
          
        
      </nav>
    </>
  );
};

export default Navbar;
