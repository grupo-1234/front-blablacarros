/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { Categoria } from '../../../models/Categoria'
import { buscar, deletar } from '../../../services/Service'

function DeletarCategoria() {
    // Estado para guardar a categoria que será eliminada
    const [categoria, setCategoria] = useState<Categoria>({} as Categoria)
    
    let navigate = useNavigate()

    // Pega o ID da URL (ex: /deletarCategoria/1)
    const { id } = useParams<{ id: string }>()

    // Função para procurar a categoria pelo ID antes de eliminar
    async function buscarPorId(id: string) {
        try {
            // Ajustado para o Service do teu grupo (apenas 2 parâmetros)
            await buscar(`/categorias/${id}`, setCategoria)
        } catch (error: any) {
            alert('Erro ao procurar a categoria')
        }
    }

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    // Função que executa a eliminação no Back-end
    async function deletarCategoria() {
        try {
            // Ajustado para o Service do teu grupo (apenas 1 parâmetro)
            await deletar(`/categorias/${id}`)
            alert('Categoria apagada com sucesso')
            retornar()
        } catch (error) {
            alert('Erro ao apagar a categoria')
        }
    }

    function retornar() {
        navigate("/categorias")
    }

    return (
        <div className='container w-1/3 mx-auto py-8'>
            <h1 className='text-4xl text-center my-4'>Eliminar Categoria</h1>
            <p className='text-center font-semibold mb-4 text-gray-600'>
                Tem certeza de que deseja apagar a categoria abaixo?
            </p>
            
            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between shadow-lg'>
                <header className='py-2 px-6 bg-[#2563EB] text-white font-bold text-2xl'>
                    Categoria
                </header>
                
                <div className="p-8 bg-slate-100">
                    <p className='text-3xl text-[#374151] font-medium'>{categoria.descricao}</p>
                </div>

                <div className="flex">
                    <button 
                        className='text-slate-100 bg-red-500 hover:bg-red-700 w-full py-2 transition-colors font-bold' 
                        onClick={retornar}
                    >
                        Não
                    </button>
                    <button 
                        className='w-full text-slate-100 bg-[#2563EB] hover:bg-[#1D4ED8] flex items-center justify-center font-bold transition-colors' 
                        onClick={deletarCategoria}
                    >
                        Sim
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarCategoria