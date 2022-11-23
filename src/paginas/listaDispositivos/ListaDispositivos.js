import './ListaDispositivos.css';
import '../listaAmbientes/ListaAmbientes.css';
import '../../App.css';
import axios from 'axios'
import React, { useState, useEffect } from 'react'

var hostbackend = 'http://localhost:80'

const ListaDispositivos = () => {
  //listaDispositivos: lista dos ambientes já existentes no banco de dados, retornada pelo back end
  const [listaDispositivos, setListaDispositivos] = useState([]);

  //Função que carrega a lista dos ambientes existentes no banco de dados, se a lista possuir ambientes estes serão exibidos como radio group para cadastro do dispositivo
  useEffect(() => {
    axios
    .get(hostbackend + '/getDispositivo')
    .then(response => {
      console.log(response)
      setListaDispositivos(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  }, [])

  function deleteDispositivo (cod_dispositivo) {
    let dadosJson = {cod_dispositivo: '',}
    dadosJson.cod_dispositivo = cod_dispositivo
    console.log(dadosJson)
    axios
    .post(hostbackend + '/delDispositivo', dadosJson)
    .then(response => {
      console.log(response)
      alert("Dispositivo removido com sucesso")
      window.location.reload(true)
    })
    .catch(error => {
      console.log(error)
      alert("Houve um erro ao tentar remover o dispositivo")
      window.location.reload(true)
    })
  }

  return (
    <div className='background'>
      <div className='container'>
        <ul className='ul_navbar'>
          <li className='navbar_left' onClick={() => window.location.href='/'}>Home <i class="fa-solid fa-house"></i></li>
          <li className='navbar_left' onClick={() => window.location.href='/listaAmbientes'}>Ambientes</li>
          <li className='navbar_left'>Dispositivos</li>
          <li className='navbar_right'><i class='fa-solid fa-seedling'></i> Nome do App</li>
        </ul>
        <div className='center_ambiente'>
          <div class="form__group">
            <text className='text'>Dispositivos disponíveis</text> 
            <p></p>
            {listaDispositivos.length > 0 ? (
              <div>        
                <ul>
                  {listaDispositivos.map(({nomedispositivo, nomeAmbiente, cod_dispositivo}) => (
                    <li className='li' key={nomedispositivo}>
                      <input type="text" class="list_text_disp" value={"Dispositivo: " + nomedispositivo} readOnly={true}/>
                      <input type="text" class="list_text_amb" value={"Ambiente: " + nomeAmbiente} readOnly={true}/>
                      <button className="button" onClick={() => deleteDispositivo(cod_dispositivo)}>Excluir</button>
                      <br></br>
                    </li>
                  ))}
                </ul>
              </div>  
              ) : (
                <div>
                    <text id='aviso'>Não há dispositivos cadastrados existentes</text>
                </div>
              )} 
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListaDispositivos;
