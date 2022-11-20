import './Home.css';
import '../../App.css';
import axios from 'axios'
import  { hostBackEnd, hostWebSocket } from '../../App';
import React, { Component, useState, useCallback } from 'react'
import useWebSocket from 'react-use-websocket';

const Home  = () => {
  const [programarHorarios, setProgramarHorarios] = useState(false);
  const [dadosJson, setDadosJson] = useState({
    data: '',
    horario: '',
  });
  
  const socketUrl = 'ws://localhost:3001'

  const { sendMessage, sendJsonMessage, lastMessage, lastJsonMessage, readyState } = useWebSocket(socketUrl, {
    onOpen: () => console.log('Conectado ao websocket'),
    onMessage: (lastMessage = MessageEvent.data) => {
      if (lastMessage) {
        console.log(lastMessage.data)
        alert(lastMessage.data)
        window.location.reload(true)
      }
    },
    onError: (event) => { console.error(event); },
    shouldReconnect: (closeEvent) => true,
    reconnectInterval: 3000
  });

  const ColocarRacao = useCallback(() => sendMessage('Ler'), []);

  const ConfirmarHorario = useCallback(() => sendJsonMessage(dadosJson), []);

  function handleClickColocarRacao(){
    ColocarRacao()
    console.log('Mensagem enviada!')
    console.log(lastMessage)
  }

  function handleClickConfirmarHorario(){
    ConfirmarHorario()
    console.log(dadosJson)
  }

  const changeHandler = e => {
    const {name, value} = e.target;
    setDadosJson({...dadosJson, [name]: value})
  }

  var data, horario

  return (
    <div className='background'>
      <div className='container'>
        <ul className='ul_navbar'>
          <li className='navbar_left' onClick={() => window.location.href='/addAmbiente'}>Adicionar ambiente <i class="fa-solid fa-circle-plus"></i></li>
          <li className='navbar_left'>Ambientes</li>
          <li className='navbar_right'><i class='fas fa-paw'></i> Nome do App</li>
        </ul>
        <div className='center_home' align='center'>
          <text className='text'>O que deseja fazer?</text> 
          <p></p>
          <button class="button" onClick={() => handleClickColocarRacao()}>Colocar ração</button>
          <button class="button" onClick={() => setProgramarHorarios(true)}>Programar horário</button>
          <div>
            {programarHorarios ? (
              <div align='center'>
                <div class="form__group" >
                  <hr></hr>
                  <text className='text'>Configurar horário</text> 
                  <p></p>
                  <input type="date" class="form__input_data" id="data" placeholder="Data" name='data' value={data} onChange={changeHandler}/>
                  <input type="time" class="form__input_horario" id="hora" placeholder="Horário" name='horario' value={horario} onChange={changeHandler}/>
                  <button class="button" onClick={() => handleClickConfirmarHorario()}>Confirmar horário</button>
                </div>
              </div>
            ) : (
              <text></text>
            )} 
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;