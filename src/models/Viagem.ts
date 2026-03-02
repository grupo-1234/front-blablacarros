import type { Categoria } from "./Categoria";


export interface Viagem {
    id?: number;
    origem: string;      
    destino: string;     
    distancia: number;    
    velocidadeMedia: number; 
    preco: number;
    data: string | Date;
    categoria: Categoria;   
    motorista: { id: 1 };
}