function Formulario(){
    return  (
   <div>
    <form >

<p><label for="destino_viagem">Destino</label>
    <input type="text" name="destino_viagem" value=""/></p>
    <p><label for="saida">Hora de saida</label>
    <input type="date" name="saida" value=""/></p>
    <p><label for="prev_chegada">Previsao de chegada</label>
    <input type="date" name="prev_chegada"  value=""/></p>

    <label><b>Transporte:</b></label>
    
    <select >
        <option value="">Escolha a viatura</option>
           <option>
        </option>  
    </select>   
        
    <label><b>Associacoes</b></label>
    <select >
        <option value="">Escolha a associacao</option>
           <option >
        </option>  
    </select>
    <label><b>Rotas</b></label>
    <select >

        <option value="">Escolha a Rota</option>
           <option >
        </option>  
    </select>
        <p><input type="submit"/></p>
</form>
   </div> 
    )
}
 export default Formulario