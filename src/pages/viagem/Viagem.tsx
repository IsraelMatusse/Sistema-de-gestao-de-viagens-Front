
import { Viatura } from '../../models/Viatura';
import { Associacao } from '../../models/Associacao';
import { Rota } from '../../models/Rota';
import { Motorista } from '../../models/Motorista';
import { useEffect, useState } from 'react';
import * as Yup from "yup";
import axios from 'axios';
import { BASE_URL } from '../../util/URL';
import { error_client_side, error_server_side, success_server_side } from '../../util/Notifications';
import { useFormik } from 'formik';
import { GET } from '../../data/client/httpcliente';
import { API_ENDPOINTS } from '../../data/client/Endpoints';


export default function Viagem(){

const[destino, setDestino]=useState("");
const[prevChegada, setPrevChegada]=useState("");
const[saida, setSaida]=useState("");
const[viaturas, setViatura]=useState<Viatura[]>([])
const[associacao, setAssociacao]=useState<Associacao[]>([]);
const[rotas, setRota]=useState<Rota[]>([]);
const[motorista, setMotorista]=useState<Motorista[]>([]);


//criacao do schema de validacao do formulario com yup
const dadosviagemschema = Yup.object().shape({
destino:Yup.string().required("o campo de destino e obrigatorio"),
prev_chegada:Yup.date().required("O campo de "),
saida:Yup.date().required("o campo de data de partida e obrigatorio"),
codigo_associacao:Yup.string().required("O campo da associacao e obrigatorio"),
id_rota:Yup.number().required("Intorduza a rota da viagem"),
codigo_motorista:Yup.string().required("Introduza o motorista da viagem"),
codigo_viatura:Yup.string().required("Introduza a viatura para esta viagem")
});

//criacao do metodo para envio dos dados do formulario

const cadastrarViagem=(values:any, setSubmitting:any)=>{
    axios
    .post(`${BASE_URL}/viagens/adicionar`, values, {
        headers:{
            Authorization:"Bearer"+localStorage.getItem('token'),
        },
    })
    .then(()=>{
        success_server_side("Viagem cadastrada com sucesso");
        setSubmitting(false);    
    }).catch((err)=>{
        console.log(err)
        if(err.response.data.statu_code===500){
            error_server_side("O correu um erro no cadastro da viagem")
        }else{
            error_client_side(err.response.data.message)
        }
    })
};

//criacao do formik para envio dos dados da viagem

const cadastrarViagemAdd= useFormik({
initialValues:{
    destino:null,
    prev_chegada:null,
    saida:null,
    codigo_associacao:null,
    id_rota:null,
    codigo_motorista:null,
    codigo_viatura:null 
},
validationSchema:dadosviagemschema,
onSubmit:(values, {setSubmitting})=>{
    cadastrarViagem(values, setSubmitting);
}
});


//gets for the selects

const getRotas=()=>{
    GET(API_ENDPOINTS.LISTAR_ROTAS, true)
    .then((res:any)=>{
        setRota(res.data.data);
    })
    .catch((err)=>{
        console.log(err);
    })

}
const getViaturas=()=>{
    GET(API_ENDPOINTS.LISTAR_VIATURAS, true)
    .then((res:any)=>{
        setRota(res.data.data);
    })
    .catch((err)=>{
        console.log(err);
    })

}
const getAssociacoes=()=>{
    GET(API_ENDPOINTS.LISTAR_ASSOCIACOES, true)
    .then((res:any)=>{
        setRota(res.data.data);
    })
    .catch((err)=>{
        console.log(err);
    })

}
const getMotoristas=()=>{
    GET(API_ENDPOINTS.LSITAR_MOTORISTAS, true)
    .then((res:any)=>{
        setRota(res.data.data);
    })
    .catch((err)=>{
        console.log(err);
    })

}

console.log(rotas)
console.log(viaturas)

useEffect(()=>{
    getRotas()
    getMotoristas(),
    getAssociacoes(),
    getRotas(),
    getViaturas()
}, [])
return(
    <div>

        {rotas.map((rota:Rota)=>(
            <div key={rota.nome_rota}>
                <h1>{rota.nome_rota} - {rota.distancia} - {rota.preco}</h1>
            </div> 
        ))}

        {viaturas.map((viatura:Viatura)=>(
            <div key={viatura.marca}>
                <h1>{viatura.anofabrico} - {viatura.modelo}</h1>
            </div>
        ))}

    </div>
)



  
}