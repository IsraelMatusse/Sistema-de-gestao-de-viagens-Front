function Cadastro(){
    return(
       <div>
        
        <form method="POST">
        <h5>cadastro de rotas</h5>
             <input type="text" required placeHolder="designacao da rota" className="form-control"  />
             <input type="number" required placeHolder="Distancia em kilometros" className="form-control" />
              <input type="number" required placeHolder="Preco" className="form-control" />
            <input type="button" value="cadastrar" className="btn btn-primary"/>
            <input type="button" value="cancelar" className="btn btn-secondary"/>
        </form>
       </div>
       


    )
}export default Cadastro