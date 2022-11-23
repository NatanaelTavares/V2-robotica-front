import './AddAmbiente.css';
import '../../App.css';
import axios from 'axios'
import React, { useState, useEffect } from 'react'

var hostbackend = 'http://localhost:80'

const AddAmbiente = () => {
  const [dadosAmbiente, setDadosAmbiente] = useState({
    nomeAmbiente: '',
  });
  const [dadosDispositivo, setDadosDispositivo] = useState({
    nomedispositivo: '',
    descricaodispositivo: '',
    cod_ambiente: 0,
  });
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

  const changeHandlerAmbiente = e => {
    const {name, value} = e.target;
    setDadosAmbiente({...dadosAmbiente, [name]: value})
  }

  const changeHandlerDispositivo = e => {
    const {name, value} = e.target;
    setDadosDispositivo({...dadosDispositivo, [name]: value})
  }
  
  const changeHandlerRadio = e => {
    const {name, value} = e.target;
    setDadosDispositivo({...dadosDispositivo, [name]: value})
  }

  function submitHandlerAmbiente() {
    console.log(dadosAmbiente)

    if(dadosAmbiente.nomeAmbiente !== '') {
      axios
      .post(hostbackend + "/addAmbiente", dadosAmbiente)
      .then(response => {
        console.log(response)
        alert("Ambiente adicionado com sucesso")
        window.location.reload(true)
      })
      .catch(error => {
        console.log(error);
        alert("Não foi possível adicionar o ambiente")
        window.location.reload(true)
      });
    } else {
      alert("Escolha um nome para o ambiente")
    }
    
  }

  function submitHandlerDispositivo() {
    console.log(dadosDispositivo)

    if(dadosDispositivo.nomedispositivo !== '' && dadosDispositivo.cod_ambiente !== '') {
      axios
      .post(hostbackend + "/addDispositivo", dadosDispositivo)
      .then(response => {
        console.log(response)
        alert("Dispositivo adicionado com sucesso")
        window.location.reload(true)
      })
      .catch(error => {
        console.log(error);
        alert("Não foi possível adicionar o dispositivo")
        window.location.reload(true)
      });
    } else {
      alert("É necessário escolher um nome e ambiente para o dispositivo")
    }
    
  }

  var nomeAmbiente, nomedispositivo, descricaodispositivo

  return (
    <div className='background'>
      <div className='container'>
        <ul className='ul_navbar'>
          <li className='navbar_left' onClick={() => window.location.href='/'}>Home <i class="fa-solid fa-house"></i></li>
          <li className='navbar_left' onClick={() => window.location.href='/listaAmbientes'}>Ambientes</li>
          <li className='navbar_left' onClick={() => window.location.href='/listaDispositivos'}>Dispositivos</li>
          <li className='navbar_right'><i class='fa-solid fa-seedling'></i> Nome do App</li>
        </ul>
        <div className='center_ambiente' align='center'>
          <div class="form__group" >
            <text className='text'>Adicionar ambiente</text> 
            <p></p>
            <input type="text" class="form__input_nome" id="nomeAmbiente" placeholder="Nome do ambiente*" name='nomeAmbiente' value={nomeAmbiente} onChange={changeHandlerAmbiente}/>
            <button class="button" onClick={() => submitHandlerAmbiente()}>Adicionar</button>
          </div>
          <div align='center'>
            <div class="form__group" >
              <hr></hr>
              <text className='text'>Adicionar dispositivo</text>           
              <p></p>
              {listaAmbientes.length > 0 ? (
                <div>        
                  <input type="text" class="form__input_nome" id="nomeDisp" placeholder="Nome do dispositivo*" name='nomedispositivo' value={nomedispositivo} onChange={changeHandlerDispositivo}/>
                  <input type="text" class="form__input_descricao" id="descricao" placeholder="Descrição" name='descricaodispositivo' value={descricaodispositivo} onChange={changeHandlerDispositivo}/>
                  <p></p>
                  <ul>
                    {listaAmbientes.map(({cod_ambiente, nomeAmbiente}) => (
                      <li className='li' key={cod_ambiente}>
                        <input type="radio" name='cod_ambiente' className='checkbox' value={cod_ambiente} onClick={changeHandlerRadio}/>
                        <label className='label'>{nomeAmbiente}</label>
                      </li>
                    ))}
                    <button class="button" onClick={() => submitHandlerDispositivo()}>Adicionar</button>
                  </ul> 
                </div>  
              ) : (
                <div>
                    <text id='aviso'>Cadastre pelo menos um ambiente para adicionar um dispositivo</text>
                </div>
              )} 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAmbiente;
