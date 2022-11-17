import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../paginas/home/Home'
import AddAmbiente from '../paginas/addAmbiente/AddAmbiente'

export default function Rotas () {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/addAmbiente' element={<AddAmbiente/>} />
    </Routes>
  )
}