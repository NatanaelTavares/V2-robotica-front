import './Home.css';
import '../../App.css';
import axios from 'axios'
import hostBackEnd from '../../App';
import React, { Component } from 'react'

class Home extends Component {
  state = {
    data: '',
    horario: '',
    programarHorarios : false
  }

  adicionarRacao() {
    axios
    .get(hostBackEnd + '/addRacao')
    .then(response => {
      console.log(response)
      alert("Ração adicionada com sucesso")
      window.location.reload(true)
    })
    .catch(error => {
      console.log(error);
      alert("Não foi possível adicionar a ração")
      window.location.reload(true)
    });
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler() {
    let dados = this.state;
    delete dados.programarHorarios

    console.log(dados)

    axios
    .post(hostBackEnd + '/postHorario', dados)
    .then(response => {
      console.log(response)
      alert("Horário adicionado com sucesso")
    })
    .catch(error => {
      console.log(error);
      alert("Não foi possível adicionar o horário")
    });
  }

  handleProgramarHorarios() {
    this.setState({
      programarHorarios : true
    })
  }

  render() {
    const {data, horario} = this.state

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
            <button class="button" onClick={() => this.adicionarRacao()}>Colocar ração</button>
            <button class="button" onClick={() => this.handleProgramarHorarios()}>Programar horário</button>
            <div>
              {this.state.programarHorarios ? (
                <div align='center'>
                  <div class="form__group" >
                    <hr></hr>
                    <text className='text'>Configurar horário</text> 
                    <p></p>
                    <input type="date" class="form__input_data" id="data" placeholder="Data" name='data' value={data} onChange={this.changeHandler}/>
                    <input type="time" class="form__input_horario" id="hora" placeholder="Horário" name='horario' value={horario} onChange={this.changeHandler}/>
                    <button class="button" onClick={() => this.submitHandler()}>Confirmar horário</button>
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
}

export default Home;
