import type { Categoria } from "./Categoria";

export interface Viagem {
    id: number,
    origem: string,
    destino: string,
    distancia: number,
    velocidadeMedia: number,
    data: Date,
    //uma viagem não pode ficar sem categoria;
    categoria: Categoria;
}