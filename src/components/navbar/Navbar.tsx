import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { X, List } from "@phosphor-icons/react"

interface NavbarProps {
  onOpenModal?: (titulo: string) => void
}

export default function Navbar({ onOpenModal }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation() //

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const isHome = location.pathname === '/' || location.pathname === '/home'

  return (
    <nav className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
      isHome ? "bg-transparent text-white" : "bg-[var(--color-blablacarros-600)] text-white shadow-lg"
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">

          <Link to="/" className="text-xl font-semibold tracking-wide" onClick={closeMenu}>
            BlablaCarros
          </Link>

          <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <Link to="/" className="hover:text-[var(--color-blablacarros-400)] transition">Home</Link>
            <Link to="/viagens" className="hover:text-[var(--color-blablacarros-400)] transition">Caronas</Link>
            <Link to="/categorias" className="hover:text-[var(--color-blablacarros-400)] transition">Categorias</Link>
            <Link to="/oferecer-carona" className="hover:text-[var(--color-blablacarros-400)] transition">Oferecer</Link>

            <button
              onClick={() => onOpenModal?.("Quero uma carona")}
              className={`px-5 py-2 rounded-md text-sm font-semibold transition hover:opacity-90 ${
                isHome 
                  ? "bg-[var(--color-blablacarros-600)] text-white" 
                  : "bg-white text-[var(--color-blablacarros-600)]"
              }`}
            >
              Entrar
            </button>
          </div>

          <div className="lg:hidden">
            <button onClick={toggleMenu}>
              {isOpen ? <X size={26} weight="bold" /> : <List size={26} weight="bold" />}
            </button>
          </div>
        </div>
      </div>

      <div className={`lg:hidden transition-all duration-300 ${
          isOpen ? "max-h-screen py-6 bg-[var(--color-blablacarros-600)]" : "max-h-0 overflow-hidden"
      }`}>
        <div className="flex flex-col items-center gap-6 text-sm font-medium">
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/viagens" onClick={closeMenu}>Caronas</Link>
          <Link to="/categorias" onClick={closeMenu}>Categorias</Link>
          <Link to="/oferecer-carona" onClick={closeMenu}>Oferecer</Link>

          <button
            onClick={() => { onOpenModal?.("Quero uma carona"); closeMenu(); }}
            className="bg-white text-[var(--color-blablacarros-600)] px-6 py-3 rounded-md font-semibold"
          >
            Entrar
          </button>
        </div>
      </div>
    </nav>
  )
}