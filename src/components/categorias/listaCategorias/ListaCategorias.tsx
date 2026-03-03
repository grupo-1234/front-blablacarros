/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react';
import type { Categoria } from '../../../models/Categoria';
import { buscar } from '../../../services/Service';
import CardCategorias from '../cardCategorias/CardCategorias';
import { Link } from 'react-router-dom'

function ListaCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  console.log(categorias)
  async function buscarCategorias() {
    try {
      // Ajustado para o seu Service (sem o terceiro parâmetro {})
      await buscar('/categorias', setCategorias);
    } catch (error: any) {
      alert('Erro ao buscar categorias');
      console.log(error);
    }
  }

  useEffect(() => {
    buscarCategorias();
  }, [categorias.length]);

  return (
    
    <div className="flex justify-center w-full my-4 mt-24">
      <div className="container flex flex-col">
        <div className="flex justify-end mb-6">
          <Link
            to="/cadastrarCategoria"
            className="bg-[var(--color-blablacarros-600)] 
               hover:bg-[var(--color-blablacarros-400)] 
               text-white font-semibold 
               px-6 py-2 rounded-xl 
               transition-all duration-300 
               shadow-md hover:shadow-lg">
            Nova Categoria
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categorias.map((categoria) => (
            <CardCategorias key={categoria.id} categoria={categoria} />
          ))}

        </div>
      </div>
    </div>
  );
}

export default ListaCategorias;