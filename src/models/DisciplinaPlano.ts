export interface DisciplinaPlano {
    id_plano: number,
    designacao_plano: string;
    designacao_disciplina: string;
    no_academico: string,
    trimestre: string,
    semestre: string,
    tipo_disciplina: string,
    creditos: number,
    preco: number,
    activo: boolean
}