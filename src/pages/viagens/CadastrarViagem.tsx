import { useState, useEffect, type FormEvent } from "react";
import { ViagemService } from "../../services/ViagemService";
import type { Viagem } from "../../models/Viagem";

function CadastrarViagem() {
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [data, setData] = useState("");
  
  const [distancia, setDistancia] = useState<number>(0);
  const [precoPorKm, setPrecoPorKm] = useState<number>(0);
  const [precoTotal, setPrecoTotal] = useState<number>(0);

  // Sincroniza o cálculo visual para o usuário
  useEffect(() => {
    // Usando o nome correto da função que criamos no ViagemService
    const resultado = ViagemService.calcularValorCarona(distancia, precoPorKm);
    setPrecoTotal(resultado);
  }, [distancia, precoPorKm]);

  async function cadastrarNovaViagem(e: FormEvent) {
    e.preventDefault();

    // Objeto montado exatamente para a tb_viagem com a nova coluna preco
    const dadosViagem: Viagem = {
      origem,
      destino,
      distancia: Number(distancia),
      velocidadeMedia: 60, // Valor padrão exigido pela Entity
      preco: precoTotal,   // AGORA ENVIAMOS O PREÇO PARA SALVAR NO BANCO 💰
      data: new Date(data),
      
      // Relacionamentos obrigatórios (IDs que devem existir no MySQL)
      motorista: { id: 1 } as any, 
      categoria: { id: 1 } as any 
    };

    try {
      await ViagemService.criar(dadosViagem, () => {
        alert("Carona publicada com sucesso! O preço foi salvo no banco. 🏁");
        // Limpa o formulário após o sucesso
        setOrigem("");
        setDestino("");
        setDistancia(0);
        setPrecoPorKm(0);
        setData("");
      });
    } catch (error) {
      alert("Erro ao cadastrar: Verifique se os campos estão corretos e se os IDs existem.");
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-blablacarros-cinza)] p-8 flex justify-center items-center font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-[var(--color-blablacarros-600)] mb-6 text-center">
          Oferecer Nova Carona 🚗
        </h2>
        
        <form onSubmit={cadastrarNovaViagem} className="space-y-4">
          <div className="space-y-3">
            <input 
              type="text" 
              placeholder="Local de partida" 
              className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[var(--color-blablacarros-400)]"
              value={origem}
              onChange={(e) => setOrigem(e.target.value)}
              required
            />
            <input 
              type="text" 
              placeholder="Destino final" 
              className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[var(--color-blablacarros-400)]"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              required
            />
          </div>

          <input 
            type="date" 
            className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[var(--color-blablacarros-400)]"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />

          <hr className="my-6 border-gray-100" />

          <div className="bg-gray-50 p-5 rounded-xl space-y-4 border border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-left">Definição de Valor</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-left">
                <label className="text-xs text-gray-500 ml-1">Distância (km)</label>
                <input 
                  type="number" 
                  placeholder="Ex: 10" 
                  className="w-full p-3 border border-gray-200 rounded-lg"
                  value={distancia || ""}
                  onChange={(e) => setDistancia(Number(e.target.value))}
                  required
                />
              </div>
              <div className="text-left">
                <label className="text-xs text-gray-500 ml-1">Preço p/ km (R$)</label>
                <input 
                  type="number" 
                  placeholder="Ex: 2.50" 
                  className="w-full p-3 border border-gray-200 rounded-lg"
                  value={precoPorKm || ""}
                  onChange={(e) => setPrecoPorKm(Number(e.target.value))}
                  required
                />
              </div>
            </div>

            <div className="p-4 bg-[var(--color-blablacarros-verde)]/20 rounded-lg flex justify-between items-center border border-[var(--color-blablacarros-verde)]">
              <span className="text-gray-700 font-medium">O passageiro pagará:</span>
              <span className="text-2xl font-black text-[var(--color-blablacarros-600)]">
                R$ {precoTotal.toFixed(2)}
              </span>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-[var(--color-blablacarros-600)] text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-md active:scale-95"
          >
            Publicar Carona
          </button>
        </form>
      </div>
    </div>
  );
}

export default CadastrarViagem;