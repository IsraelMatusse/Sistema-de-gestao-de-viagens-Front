import React, { useEffect, useState } from 'react';
import './App.css';
import Cadastro from './rota/cadastro';
import Tabela from './rota/tabela';

function App() {

  const [rotas, setRotas] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8080/api/rotas')
  .then(retorno => retorno.json())
  .then(retorno_convertido => setRotas(retorno_convertido));
  
      }, []);

  return (
    <div className="App">
  
   <Cadastro/>
    <Tabela vetor={rotas} />

    </div>
  );
}

export default App;
