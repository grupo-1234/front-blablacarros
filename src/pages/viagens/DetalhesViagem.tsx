import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ViagemService } from "../../services/ViagemService";
import { ToastAlerta } from "../../utils/ToastAlerta";
import type { Viagem } from "../../models/Viagem";

function DetalhesViagem() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [viagem, setViagem] = useState<Viagem | null>(null);

  useEffect(() => {
    if (id) {
      ViagemService.buscarPorId(Number(id), setViagem);
    }
  }, [id]);

  async function deletarViagem() {
    if (window.confirm("Tem certeza que deseja apagar esta carona?")) {
      try {
        await ViagemService.remover(Number(id)); 
        ToastAlerta("Carona removida!", "sucesso");
        navigate("/viagens");
      } catch (error) {
        ToastAlerta("Erro ao remover carona.", "erro");
      }
    }
  }

  if (!viagem) return <div className="pt-28 text-center">Carregando...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-28 px-4 pb-10">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-[var(--color-blablacarros-600)] p-8 text-white">
          <h2 className="text-3xl font-black">{viagem.origem} → {viagem.destino}</h2>
          <p className="opacity-80 mt-2">📅 {new Date(viagem.data).toLocaleDateString('pt-BR')}</p>
        </div>

        <div className="p-8 space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-4xl font-black text-gray-900">R$ {Number(viagem.preco).toFixed(2)}</span>
            <div className="flex gap-3">
              <button 
                onClick={() => navigate(`/editar-viagem/${viagem.id}`)}
                className="px-6 py-2 border-2 border-blue-500 text-blue-500 rounded-xl font-bold hover:bg-blue-50 transition"
              >
                Editar
              </button>
              <button 
                onClick={deletarViagem}
                className="px-6 py-2 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition shadow-md"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalhesViagem;