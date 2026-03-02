import { useState } from "react"
import { Link } from "react-router-dom"
import { X, List } from "@phosphor-icons/react"

interface NavbarProps {
  onOpenModal?: (titulo: string) => void
}

export default function Navbar({ onOpenModal }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <nav className="bg-transparent text-white w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">

          <Link
            to="/"
            className="text-xl font-semibold tracking-wide"
            onClick={closeMenu}
          >
            BlablaCarros
          </Link>

          <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <Link
              to="/"
              className="hover:text-[var(--color-blablacarros-400)] transition"
            >
              Home
            </Link>

            <a
              href="#como-funciona"
              className="hover:text-[var(--color-blablacarros-400)] transition"
            >
              Como funciona
            </a>

            <a
              href="#vantagens"
              className="hover:text-[var(--color-blablacarros-400)] transition"
            >
              Vantagens
            </a>

            <a
              href="#planos"
              className="hover:text-[var(--color-blablacarros-400)] transition"
            >
              Planos
            </a>

            <button
              onClick={() => onOpenModal?.("Quero uma carona")}
              className="bg-[var(--color-blablacarros-600)] text-white px-5 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition"
            >
              Entrar
            </button>
          </div>

          <div className="lg:hidden">
            <button onClick={toggleMenu}>
              {isOpen ? (
                <X size={26} weight="bold" />
              ) : (
                <List size={26} weight="bold" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden transition-all duration-300 ${
          isOpen
            ? "max-h-screen py-6 bg-[var(--color-blablacarros-600)]"
            : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col items-center gap-6 text-sm font-medium">
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>

          <a href="#como-funciona" onClick={closeMenu}>
            Como funciona
          </a>

          <a href="#vantagens" onClick={closeMenu}>
            Vantagens
          </a>

          <a href="#planos" onClick={closeMenu}>
            Planos
          </a>

          <button
            onClick={() => {
              onOpenModal?.("Quero uma carona")
              closeMenu()
            }}
            className="bg-white text-[var(--color-blablacarros-600)] px-6 py-3 rounded-md font-semibold"
          >
            Entrar
          </button>
        </div>
      </div>
    </nav>
  )
}