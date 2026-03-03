import { Link } from 'react-router-dom'
import type { Categoria } from '../../../models/Categoria'

interface CardCategoriasProps {
  categoria: Categoria
}

function CardCategorias({ categoria }: CardCategoriasProps) {
  return (
    <div className="flex flex-col justify-between rounded-2xl overflow-hidden 
                    bg-white shadow-lg hover:shadow-xl 
                    transition-all duration-300 
                    border border-gray-100 hover:-translate-y-1">

      {/*Header*/}
      <header className="py-3 px-6 
                         bg-[var(--color-blablacarros-600)] 
                         text-white font-semibold text-lg tracking-wide">
        Categoria
      </header>

      {/*Conteúdo*/}
      <div className="p-8 bg-[var(--color-blablacarros-cinza)] flex items-center justify-center">
        <p className="text-2xl font-medium text-gray-700 text-center">
          {categoria.descricao}
        </p>
      </div>

      {/*Botões*/}
      <div className="flex">
        <Link
          to={`/editarCategoria/${categoria.id}`}
          className="w-full bg-[var(--color-blablacarros-600)] 
                     hover:bg-[var(--color-blablacarros-400)] 
                     text-white font-medium 
                     transition-colors duration-300 
                     py-3 text-center">
          Editar
        </Link>

        <Link
          to={`/deletarCategoria/${categoria.id}`}
          className="w-full bg-[var(--color-blablacarros-verde)] 
                     hover:brightness-95 
                     text-gray-800 font-medium 
                     transition-all duration-300 
                     py-3 text-center">
          Deletar
        </Link>
      </div>
    </div>
  )
}

export default CardCategorias