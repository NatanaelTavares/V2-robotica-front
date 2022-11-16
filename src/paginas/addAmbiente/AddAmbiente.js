import './AddAmbiente.css';
import '../../App.css';
import axios from 'axios'
import hostBackEnd from '../../App';

import React, { Component } from 'react'

class AddAmbiente extends Component {
  state = {
    nomeAmbiente: '',
    nomeDispositivo: '',
    descricao: '',
    listaAmbientes: [{id: '1', nomeAmbiente: 'Ambiente1'}, {id: '2', nomeAmbiente: 'Ambiente2'}, {id: '3', nomeAmbiente: 'Ambiente3'}],
    ambientesDispositivo: [],
  }

  componentDidMount() {
    axios
    .get(hostBackEnd + '/ambientes')
    .then(response => {
      console.log(response)
      this.setListaAmbientes(response)
    })
    .catch(error => {
      console.log(error)
    })
  }

  setListaAmbientes(response) {
    this.setState({
      listaAmbientes: response.data
    })
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  checkboxChangeHandler(id) {
    /*let ambienteExiste = false
    this.state.ambientesDispositivo.forEach(element => {
      if(element === id) {
        this.setState(this.state.ambientesDispositivo.pop())
        ambienteExiste = true
      }
    })
    if(!ambienteExiste) {
      this.setState(this.state.ambientesDispositivo.push(id))
    }*/
  }

  submitHandlerAmbiente() {
    let dadosAmbiente = this.state;
    delete dadosAmbiente.nomeDispositivo
    delete dadosAmbiente.descricao
    delete dadosAmbiente.listaAmbientes
    delete dadosAmbiente.ambientesDispositivo

    console.log(dadosAmbiente)

    axios
    .post(hostBackEnd + '/postAmbiente', dadosAmbiente)
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
  }

  submitHandlerDispositivo() {
    let dadosDispositivo = this.state;
    delete dadosDispositivo.nomeAmbiente
    delete dadosDispositivo.listaAmbientes
    delete dadosDispositivo.ambientesDispositivo

    console.log(dadosDispositivo)

    axios
    .post(hostBackEnd + '/postDispositivo', dadosDispositivo)
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
  }

  render() {
    const {nomeAmbiente, nomeDispositivo, descricao} = this.state

    return (
      <div className='background'>
        <div className='container'>
          <ul className='ul_navbar'>
            <li className='navbar_left' onClick={() => window.location.href='/'}>Home <i class="fa-solid fa-house"></i></li>
            <li className='navbar_left'>Ambientes</li>
            <li className='navbar_right'><i class='fas fa-paw'></i> Nome do App</li>
          </ul>
          <div className='center_ambiente' align='center'>
            <div class="form__group" >
              <text className='text'>Adicionar ambiente</text> 
              <p></p>
              <input type="text" class="form__input_nome" id="nomeAmbiente" placeholder="Nome do ambiente" name='nomeAmbiente' value={nomeAmbiente} onChange={this.changeHandler}/>
              <button class="button" onClick={() => this.submitHandlerAmbiente()}>Adicionar</button>
            </div>
            <div align='center'>
              <div class="form__group" >
                <hr></hr>
                <text className='text'>Adicionar dispositivo</text>           
                <p></p>
                {this.state.listaAmbientes.length > 0 ? (
                  <div>        
                    <input type="text" class="form__input_nome" id="nomeDisp" placeholder="Nome do dispositivo" name='nomeDispositivo' value={nomeDispositivo} onChange={this.changeHandler}/>
                    <input type="text" class="form__input_descricao" id="descricao" placeholder="Descrição" name='descricao' value={descricao} onChange={this.changeHandler}/>
                    <p></p>
                    <ul>
                      {this.state.listaAmbientes.map(({id, nomeAmbiente}) => (
                        <li className='li' key={id}>
                          <input type="checkbox" className='checkbox' onChange={this.checkboxChangeHandler(id)}/>
                          <label className='label'>{nomeAmbiente}</label>
                        </li>
                      ))}
                      <button class="button" onClick={() => this.submitHandlerDispositivo()}>Adicionar</button>
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
}

export default AddAmbiente;
