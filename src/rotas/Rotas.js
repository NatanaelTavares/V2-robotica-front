import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../paginas/home/Home'
import AddAmbiente from '../paginas/addAmbiente/AddAmbiente'
import ListaAmbientes from '../paginas/listaAmbientes/ListaAmbientes'
import ListaDispositivos from '../paginas/listaDispositivos/ListaDispositivos'

export default function Rotas () {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/addAmbiente' element={<AddAmbiente/>} />
      <Route path='/listaAmbientes' element={<ListaAmbientes/>} />
      <Route path='/listaDispositivos' element={<ListaDispositivos/>} />
    </Routes>
  )
}