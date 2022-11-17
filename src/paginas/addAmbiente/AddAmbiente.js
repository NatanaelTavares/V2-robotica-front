import './AddAmbiente.css';
import '../../App.css';
import axios from 'axios'
import hostBackEnd from '../../App';
import React, { Component } from 'react'

class AddAmbiente extends Component {
  //listaAmbientes: lista dos ambientes já existentes no banco de dados, retornada pelo back end
  //ambientesDispositivo: lista de ambientes que serão adicionados ao dispositivo, é preenchida pelas checkboxes na hora do cadastro de dispositivo
  state = {
    nomeAmbiente: '',
    nomeDispositivo: '',
    descricao: '',
    listaAmbientes: [{id: '1', nomeAmbiente: 'Ambiente1'}, {id: '2', nomeAmbiente: 'Ambiente2'}, {id: '3', nomeAmbiente: 'Ambiente3'}],
    ambientesDispositivo: [],
  }

  //Função que carrega a lista dos ambientes existentes no banco de dados, se a lista possuir ambientes estes serão exibidos como checkboxes para cadastro do dispositivo
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

  //Atualiza os elementos da lista de ambientes selecionados para o dispositivo conforme as checkboxes são marcadas/desmarcadas
  checkboxChangeHandler(e) {
    let ambientes = this.state.ambientesDispositivo;
    let check = e.target.checked
    let checkedAmbiente = e.target.value

    console.log(checkedAmbiente)

    if(check) {
      this.state.ambientesDispositivo.push(checkedAmbiente)
    } else {
      var i = ambientes.indexOf(checkedAmbiente)
      if(i > -1) {
        ambientes.splice(i, 1)
        this.setState({
          ambientesDispositivo: ambientes
        })
      }
    }
  }

  submitHandlerAmbiente() {
    //Cria a variável que será o json enviado para o back e deleta as propriedades desnecessárias do state
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

    for(var i = 0; i < dadosDispositivo.ambientesDispositivo.length; i++) {
      dadosDispositivo.ambientesDispositivo[i] = JSON.parse(dadosDispositivo.ambientesDispositivo[i])
    }

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
                          <input type="checkbox" className='checkbox' value={'{"id": "' + id + '", "nomeAmbiente": "' + nomeAmbiente + '"}'} onChange={this.checkboxChangeHandler.bind(this)}/>
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
