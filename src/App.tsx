import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Rotas } from './models/Rotas';
function App() {

  const [rotas, setRotas] = useState<Rotas[]>([]);

const getRotas = () =>{
  axios.get('localhost:8080/api/rotas')
  .then((res) =>{
    setRotas(res.data)
    console.log(res.data)
  })
}

  useEffect(() => {

  }, []);

  return (
    <div className="App">
     
    </div>
  );
}

export default App;
