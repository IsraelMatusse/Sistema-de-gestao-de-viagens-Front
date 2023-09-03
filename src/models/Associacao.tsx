export interface AssociacaoFetch {
designacao:string,
msdisn:string,
numero_licenca:string,
data_validade:Date,
tipo_licenca:string,
email_associacao:string
}

export interface AssociacaoPost {
    designacao:string,
    msdisn:string,
    numero_licenca:string,
    data_validade:Date,
    tipo_licenca:number,
    email_associacao:string
    }