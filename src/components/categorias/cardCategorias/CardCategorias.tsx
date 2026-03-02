import { Link } from 'react-router-dom'
import type { Categoria } from '../../../models/Categoria'

interface CardCategoriasProps {
  categoria: Categoria
}

function CardCategorias({ categoria }: CardCategoriasProps) {
  return (
    <div className='border flex flex-col rounded-2xl overflow-hidden justify-between bg-white shadow-md'>
      <header className='py-2 px-6 bg-[#2563EB] text-white font-bold text-2xl'>Categoria</header>
      <p className='p-8 text-3xl bg-slate-50 h-full text-[#374151]'>{categoria.descricao}</p>
      <div className="flex">
        <Link to={`/editarCategoria/${categoria.id}`} className='w-full text-slate-100 bg-[#2563EB] hover:bg-[#1D4ED8] flex items-center justify-center py-2'>
          <button>Editar</button>
        </Link>
        <Link to={`/deletarCategoria/${categoria.id}`} className='text-slate-100 bg-red-400 hover:bg-red-700 w-full flex items-center justify-center py-2'>
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  )
}

export default CardCategorias