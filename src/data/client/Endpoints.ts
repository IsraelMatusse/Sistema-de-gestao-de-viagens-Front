import { BASE_URL } from "../../util/URL";

export const API_ENDPOINTS = {

    //autentication endpoints
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTAR_USUARIO: `${BASE_URL}/auth/registar`,


    //gets without parameter 
    LISTAR_VIAGENS: `${BASE_URL}/viagens`,
    NUMERO_DE_VIAGENS: `${BASE_URL}/viagens/numero-viagens`,
    CORES: `${BASE_URL}/cores`,
    VIAGENS_DO_DIA: `${BASE_URL}/viagens/hoje`,
    MODELOS_VIATURAS: `${BASE_URL}/modelos`,
    LISTAR_ASSOCIACOES: `${BASE_URL}/associacoes`,
    LISTAR_DISTRITOS: `${BASE_URL}/distritos`,
    LISTAR_GENEROS: `${BASE_URL}/generos`,
    LISTAR_PROPRIETARIOS: `${BASE_URL}/proprietarios`,
    LISTAR_PROVINCIAS: `${BASE_URL}/provincias`,
    LISTAR_ROTAS: `${BASE_URL}/rotas`,
    LISTAR_TODOS_VIAJANTES: `${BASE_URL}/viajantes`,
    LISTAR_VIATURAS: `${BASE_URL}/viaturas`,


    //post endpoints

    CADASTRAR_VIAGEM: `${BASE_URL}/viagens/adicionar`



}