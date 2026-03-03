/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
 
import { type ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Categoria } from '../../../models/Categoria';
import { atualizar, buscar, cadastrar } from '../../../services/Service';
import { ToastAlerta } from '../../../utils/ToastAlerta';



function FormCategoria() {
    const navigate = useNavigate();

    // const [isLoading, setIsLoading] = useState<boolean>(false) 

    const [categoria, setCategoria] = useState<Categoria>({ id: 0, descricao: '' });

    const {id} = useParams<{id: string}>();

    async function buscarPorId(id: string) {
        try {
            await buscar (`/categorias/${id}`, setCategoria,)
        } catch (error: any) {
            
        }
    }

    useEffect(() => {
        if(id !== undefined) {
            buscarPorId(id)
        }
    }, [id])
    
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        })
    }

    function retornar() {
        navigate("/categorias")
    }

    async function gerarNovaCategoria(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        // setIsLoading(true) 

        if (id !== undefined) {
            try {
                await atualizar (`/categorias`, categoria, setCategoria)
                ToastAlerta("A categoria foi atualizada com sucesso!", "sucesso")
            } catch (error: any) {
                ToastAlerta("Erro ao atualizar a categoria", "erro")
            }
        } else {
            try {
                await cadastrar (`/categorias`, categoria, setCategoria)
                ToastAlerta("A categoria foi cadastrada com sucesso!", "sucesso")
            } catch (error: any) {
                ToastAlerta("Erro ao cadastrar a categoria", "erro")
            }
        }
    }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto">
        <h1 className="text-4xl text-center my-8">
            {id === undefined ? "Cadastrar Categoria" : "Editar Categoria"}
        </h1>

        <form className="w-1/2 flex flex-col gap-4"
                onSubmit={gerarNovaCategoria}>
            
            <div className="flex flex-col gap-2">
                <label htmlFor="descricao"> Descrição da categoria </label>
                <input
                    type="text"
                    placeholder="Descreva aqui sua categoria"
                    name="descricao"
                    className="border-2 border-slate-700 rounded p-2"
                    value={categoria.descricao}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
            </div>
            <button 
                className="rounded text-slate-100 bg-blue-400 hover:bg-blue-800
                            w-1/2 py-2 mx-auto flex justify-center"
                type="submit"
                onClick={retornar}>

                {/* { isLoading ? 
                    <ClipLoader
                        color="#ffffff"
                        size={24}
                    /> :  */}
                    <span> {id === undefined ? 'Cadastrar' : 'Atualizar'} </span>
                    
                {/* }     */}
            </button>
        </form>
    </div>
  )
}

export default FormCategoria