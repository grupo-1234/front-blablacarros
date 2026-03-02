import type { Viagem } from "./Viagem";

export interface Categoria {
    id: number,
    descricao: string,
    //a categoria pode ter ou não ter viagem. se tiver viagem, carrega a lista da viagem, se não, fica nulo. 
    viagem?: Viagem[] | null;
}