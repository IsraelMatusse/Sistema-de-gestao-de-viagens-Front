import Input from '../../components/Input';
import { ViagemFetch } from '../../models/Viagem';
import { ViaturaFetch } from '../../models/Viatura';
import { AssociacaoFetch } from '../../models/Associacao';
import { RotaFetch } from '../../models/Rota';
import { useState } from 'react';
import { MotoristaFetch } from '../../models/Motorista';


interface AddViagem{
    destino_viagem:string,
    saida:Date,
    prev_chegada: Date,
    id_rota:number,
    codigo_associacao: Date
}
export function Viagem(){

const[destino, setDestino]=useState("");
const[prevChegada, setPrevChegada]=useState("");
const[saida, setSaida]=useState("");
const[viatura, setViatura]=useState<ViaturaFetch[]>([])
const[associacao, setAssociacao]=useState<AssociacaoFetch[]>([]);
const[rota, setRota]=useState<RotaFetch[]>([]);
const[motorista, setMotorista]=useState<MotoristaFetch[]>([]);

    <div className="viagem-over-flow">
    <div className="viagem-body">
        <h2>Cadastre uma nova viagem</h2>
        <form className="input-container">
            <Input label="Associacao" value={associacao} updateValue={setAssociacao}  options={associacao}/>
            <Input label="Saida" value={saida} updateValue={setSaida} type='date'/>
            <Input label="Previsao de chegada" value={prevChegada} updateValue={setPrevChegada} />
            <Input label="viatura" value={viatura} updateValue={setViatura}  options={viatura}/>
            <Input label="Motorista" value={motorista} updateValue={setMotorista} options={motorista}/>
            <Input label="Motorista" value={rota} updateValue={setRota} options={rota}/>
            <Input label="Destino" value={destino} updateValue={setDestino} />
        </form>
        <button className="btn-submit">cadastrar</button>
    </div>
</div>
}