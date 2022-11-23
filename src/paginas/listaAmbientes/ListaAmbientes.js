import './ListaAmbientes.css';
import '../../App.css';
import axios from 'axios'
import React, { useState, useEffect } from 'react'

var hostbackend = 'http://localhost:80'

const ListaAmbientes = () => {
  //listaAmbientes: lista dos ambientes já existentes no banco de dados, retornada pelo back end
  const [listaAmbientes, setListaAmbientes] = useState([]);

  //Função que carrega a lista dos ambientes existentes no banco de dados, se a lista possuir ambientes estes serão exibidos como radio group para cadastro do dispositivo
  useEffect(() => {
    axios
    .get(hostbackend + '/getAmbiente')
    .then(response => {
      console.log(response)
      setListaAmbientes(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  }, [])

  function deleteAmbiente (cod_ambiente) {
    let dadosJson = {cod_ambiente: '',}
    dadosJson.cod_ambiente = cod_ambiente
    console.log(dadosJson)
    axios
    .post(hostbackend + '/delAmbiente', dadosJson)
    .then(response => {
      console.log(response)
      alert("Ambiente removido com sucesso")
      window.location.reload(true)
    })
    .catch(error => {
      console.log(error)
      alert("Houve um erro ao tentar remover o ambiente")
      window.location.reload(true)
    })
  }

  return (
    <div className='background'>
      <div className='container'>
        <ul className='ul_navbar'>
          <li className='navbar_left' onClick={() => window.location.href='/'}>Home <i class="fa-solid fa-house"></i></li>
          <li className='navbar_left'>Ambientes</li>
          <li className='navbar_left' onClick={() => window.location.href='/listaDispositivos'}>Dispositivos</li>
          <li className='navbar_right'><i class='fa-solid fa-seedling'></i> Nome do App</li>
        </ul>
        <div className='center_ambiente'>
          <div class="form__group">
            <text className='text'>Ambientes disponíveis</text> 
            <p></p>
            {listaAmbientes.length > 0 ? (
              <div>        
                <ul>
                  {listaAmbientes.map(({cod_ambiente, nomeAmbiente}) => (
                    <li className='li' key={cod_ambiente}>
                      <input type="text" class="list_text" value={nomeAmbiente} readOnly={true}/>
                      <button className="button" onClick={() => deleteAmbiente(cod_ambiente)}>Excluir</button>
                      <br></br>
                    </li>
                  ))}
                </ul>
              </div>  
              ) : (
                <div>
                    <text id='aviso'>Não há ambientes cadastrados existentes</text>
                </div>
              )} 
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListaAmbientes;
