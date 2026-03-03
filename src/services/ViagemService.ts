import type { Viagem } from "../models/Viagem";
import { buscar, cadastrar, atualizar, deletar } from "./Service";

export const ViagemService = {
  listar: (setDados: Function) => buscar("/viagem", setDados),

  buscarPorId: (id: number, setDados: Function) => buscar(`/viagem/${id}`, setDados),

  criar: (dados: Viagem, setDados: Function) => cadastrar("/viagem", dados, setDados),

  editar: (id: number, dados: Viagem, setDados: Function) => atualizar(`/viagem`, dados, setDados),

  remover: (id: number) => deletar(`/viagem/${id}`),

  async exibirValorFormatado(id: number, setDados: Function) {
    await this.buscarPorId(id, (viagem: Viagem) => {
      const mensagem = `O valor da viagem é R$ ${Number(viagem.preco).toFixed(2)}`;
      setDados(mensagem);
    });
  },

  calcularValorCarona: (distancia: number, precoPorKm: number): number => {
    if (!distancia || !precoPorKm) return 0;
    return distancia * precoPorKm;
  },
  
  buscarPorDestino: (destino: string, setDados: Function) => 
    buscar(`/viagem/destino/${destino}`, setDados),
};