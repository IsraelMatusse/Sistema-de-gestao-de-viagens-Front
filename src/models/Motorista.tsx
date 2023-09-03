export interface MotoristaPost{
codigo_viatura:string,
numero_documento:string,
data_validade:Date,
tipo_documento:number,
ano_nascimento:number,
email:string,
nome:string,
apelido:string,
id_genero:number,
codigo_provincia:string
}

export interface MotoristaFetch{
    codigo_viatura:string,
    numero_documento:string,
    data_validade:Date,
    tipo_documento:string,
    ano_nascimento:number,
    email:string,
    nome:string,
    apelido:string,
    id_genero:string,
    codigo_provincia:string
    }