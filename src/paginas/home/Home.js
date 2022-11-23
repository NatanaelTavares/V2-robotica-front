import './Home.css';
import '../../App.css';
import React, { useState, useCallback } from 'react'
import useWebSocket from 'react-use-websocket';

const Home  = () => {
  const [programarHorarios, setProgramarHorarios] = useState(false);
  const [umidade, setUmidade] = useState({umidade:"00.00",temperatura:"nan"});
  const [dadosJson, setDadosJson] = useState({
    horario: '',
  });
  
  //const socketUrl = 'ws://168.197.117.82:3000'
  const socketUrl = 'ws://localhost:3001'

  const { sendMessage, sendJsonMessage, lastMessage } = useWebSocket(socketUrl, {
    onOpen: () => console.log('Conectado ao websocket'),
    onMessage: (lastMessage = MessageEvent.data) => {
      if (lastMessage) {
        setUmidade(JSON.parse(lastMessage.data))
        console.log(lastMessage.data)
      }
    },
    onError: (event) => { console.error(event); },
    shouldReconnect: (_closeEvent) => true,
    reconnectInterval: 3000
  });

  const RegarPlanta = useCallback(() => sendMessage('regar'), [sendMessage]);

  const ConfirmarHorario = useCallback(() => sendJsonMessage(dadosJson), [sendJsonMessage, dadosJson]);

  function handleClickRegarPlanta(){
    RegarPlanta()
    alert("Comando enviado!")
    console.log(lastMessage)
  }

  function handleClickConfirmarHorario(){
    if (dadosJson.horario !== '') {
      ConfirmarHorario()
      alert("Horário adicionado")
      console.log(dadosJson)
    } else {
      alert("Escolha um horário")
    }
  }

  const changeHandler = e => {
    const {name, value} = e.target;
    setDadosJson({...dadosJson, [name]: value})
  }

  var horario

  return (
    <div className='background'>
      <div className='container'>
        <ul className='ul_navbar'>
          <li className='navbar_left' onClick={() => window.location.href='/addAmbiente'}>Adicionar ambiente <i class="fa-solid fa-circle-plus"></i></li>
          <li className='navbar_left' onClick={() => window.location.href='/listaAmbientes'}>Ambientes</li>
          <li className='navbar_left' onClick={() => window.location.href='/listaDispositivos'}>Dispositivos</li>
          <li id='medidor'>Medidor de umidade: {umidade.umidade} (g/m³)</li>
          <li className='navbar_right'><i class='fa-solid fa-seedling'></i> Nome do App</li>
        </ul>
        <div className='center_home' align='center'>
          <text className='text'>O que deseja fazer?</text> 
          <p></p>
          <button class="button" onClick={() => handleClickRegarPlanta()}>Regar Planta</button>
          <button class="button" onClick={() => setProgramarHorarios(true)}>Programar horário</button>
          <div>
            {programarHorarios ? (
              <div align='center'>
                <div class="form__group" >
                  <hr></hr>
                  <text className='text'>Configurar horário</text> 
                  <p></p>
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