export interface ViagemPost{
    destino_viagem:string,
    saida:Date,
    prev_chegada: Date,
    id_rota:number,
    codigo_associacao: string
}
export interface ViagemFetch{
    destino_viagem:string,
    saida:Date,
    prev_chegada: Date,
    rota:string,
    codigo_associacao: string
}