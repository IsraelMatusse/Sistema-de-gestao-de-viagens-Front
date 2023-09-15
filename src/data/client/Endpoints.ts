import { BASE_URL } from "../../util/URL";

export const API_ENDPOINTS = {

    //autentication endpoints
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTAR_USUARIO: `${BASE_URL}/auth/registar`,
    USER_ROLES: `${BASE_URL}/usuarios/eu`,
    ASSOCIACAO_ONLINE: `${BASE_URL}/associacoes/perfil`,

    //gets without parameter 
    LISTAR_VIAGENS: `${BASE_URL}/viagens`,
    NUMERO_DE_VIAGENS: `${BASE_URL}/viagens/numero-viagens`,
    CORES: `${BASE_URL}/cores`,
    VIAGENS_DO_DIA: `${BASE_URL}/viagens/hoje`,
    MODELOS_VIATURAS: `${BASE_URL}/modelos`,
    LISTAR_ASSOCIACOES: `${BASE_URL}/associacoes`,
    LISTAR_GENEROS: `${BASE_URL}/generos`,
    LISTAR_PROPRIETARIOS: `${BASE_URL}/proprietarios`,
    LISTAR_PROVINCIAS: `${BASE_URL}/provincias`,
    LISTAR_ROTAS: `${BASE_URL}/rotas`,
    LISTAR_TODOS_VIAJANTES: `${BASE_URL}/viajantes`,
    LISTAR_VIATURAS: `${BASE_URL}/viaturas`,
    LISTAR_MOTORISTAS: `${BASE_URL}/motoristas`,
    LISTAR_TIPOS_LICENCA: `${BASE_URL}/tipos-licenca`,
    LISTAR_DISTRITOS: `${BASE_URL}/distritos`,
    TIPO_DOCUMENTO: `${BASE_URL}/tipo-documentos`,


    //get with params
    ASSOCIACAO_VIATURA: (codigo_associacao: any) => `${BASE_URL}/associacoes/viaturas?codigoAssociacao=${codigo_associacao}`,
    LISTAR_DISTRITOS_DA_PROVINCIA: (codigo_provincia: number) => `${BASE_URL}/distritos/${codigo_provincia}`,
    DETALHES_DA_VIAGEM: (codigo_viagem: any) => `${BASE_URL}/viagens/${codigo_viagem}`,
    VIAJANTES_DA_VIAGEM: (codigo_viagem: any) => `${BASE_URL}/viagens/${codigo_viagem}/viajantes`,


    //post endpoints

    CADASTRAR_VIAGEM: `${BASE_URL}/viagens/adicionar`,
    CADASTRAR_ASSOCIACAO: `${BASE_URL}/associacoes/adicionar`,
    CADASTRAR_TERMINAL: `${BASE_URL}/terminais`,
    CADASTRAR_PASSAGEIRO_VIAGEM: `${BASE_URL}/viagens/associar-viajante`

}