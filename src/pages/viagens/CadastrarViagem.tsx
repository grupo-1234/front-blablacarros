import { useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ViagemService } from "../../services/ViagemService";
import { buscar } from "../../services/Service";
import type { Viagem } from "../../models/Viagem";
import type { Categoria } from "../../models/Categoria";
import { ToastAlerta } from "../../utils/ToastAlerta";

function CadastrarViagem() {
  const navigate = useNavigate();

  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [data, setData] = useState("");
  const [distancia, setDistancia] = useState<number>(0);
  const [precoPorKm, setPrecoPorKm] = useState<number>(0);
  const [precoTotal, setPrecoTotal] = useState<number>(0);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<Categoria>({ id: 0, descricao: "" });

  useEffect(() => {
    buscar("/categorias", setCategorias);
  }, []);

  useEffect(() => {
    const resultado = ViagemService.calcularValorCarona(distancia, precoPorKm);
    setPrecoTotal(resultado);
  }, [distancia, precoPorKm]);

  async function cadastrarNovaViagem(e: FormEvent) {
    e.preventDefault();

    if (categoriaSelecionada.id === 0) {
      ToastAlerta("Selecione uma categoria!", "erro");
      return;
    }

    const dadosViagem: Viagem = {
      origem,
      destino,
      distancia: Number(distancia),
      velocidadeMedia: 60,
      preco: precoTotal,
      data: new Date(data),
      motorista: { id: 1 } as any,
      categoria: categoriaSelecionada
    };

    try {
      await ViagemService.criar(dadosViagem, () => {
        ToastAlerta("Carona publicada com sucesso! 🏁", "sucesso");
        navigate("/viagens");
      });
    } catch (error) {
      ToastAlerta("Erro ao cadastrar: Verifique os dados.", "erro");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-center pt-28">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-[var(--color-blablacarros-600)] mb-6 text-center">Oferecer Carona 🚗</h2>
        
        <form onSubmit={cadastrarNovaViagem} className="space-y-4">
          <input type="text" placeholder="Partida" className="w-full p-3 border rounded-lg" value={origem} onChange={(e) => setOrigem(e.target.value)} required />
          <input type="text" placeholder="Destino" className="w-full p-3 border rounded-lg" value={destino} onChange={(e) => setDestino(e.target.value)} required />
          <input type="date" className="w-full p-3 border rounded-lg" value={data} onChange={(e) => setData(e.target.value)} required />

          <select 
            className="w-full p-3 border rounded-lg bg-white"
            onChange={(e) => setCategoriaSelecionada(categorias.find(c => c.id === Number(e.target.value)) || { id: 0, descricao: "" })}
            required
          >
            <option value="">Selecione o tipo de carona</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.descricao}</option>
            ))}
          </select>

          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Distância (km)" className="p-3 border rounded-lg" onChange={(e) => setDistancia(Number(e.target.value))} required />
            <input type="number" placeholder="Preço p/ km" className="p-3 border rounded-lg" onChange={(e) => setPrecoPorKm(Number(e.target.value))} required />
          </div>

          <div className="p-4 bg-green-50 rounded-lg flex justify-between items-center border border-green-200">
            <span className="text-gray-600 font-medium">Preço Final:</span>
            <span className="text-xl font-black text-green-700">R$ {precoTotal.toFixed(2)}</span>
          </div>

          <button type="submit" className="w-full bg-[var(--color-blablacarros-600)] text-white py-4 rounded-xl font-bold hover:opacity-90 transition shadow-md">
            Publicar Carona
          </button>
        </form>
      </div>
    </div>
  );
}

export default CadastrarViagem;