function Tabela(vetor){
    return(
        <table className="table">
            <thead>
                <tr > 
                    <th>#</th>
                    <th>Designacao </th>
                    <th>Preco </th>
                    <th>Distancia</th>
                </tr>
            </thead>
            <tbody>
            {
                vetor.map((obj,indice)=>(
                    <tr key={indice}>
                    <td>{indice+1}</td>
                    <td>{obj.designacao}</td>
                    <td>{obj.preco}</td>
                    <td>{obj.distancia}</td>
                    <td className="btn btn-sucess">Selecionar</td>
                </tr>
                ))
            }
            </tbody>
        </table>

    )
} export default Tabela