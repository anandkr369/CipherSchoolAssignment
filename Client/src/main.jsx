import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Provider} from "react-redux"
import App from './App.jsx'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from './Component/Pages/Login.jsx'
import Register from './Component/Pages/Register.jsx'
import Store from "./Component/Store/Store.jsx"
import TestArea from './Component/Pages/TestArea.jsx'
import TestCompleted from './Component/Pages/TestCompleted.jsx'
import PrivateRoute from './Component/Pages/PrivateRoute.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/home' element={<PrivateRoute component={App}/>} />
      <Route path='/test' element={<PrivateRoute component={TestArea}/>}/>
      <Route path='/complete' element={<PrivateRoute component={TestCompleted}/>}/>
    </Routes>
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
