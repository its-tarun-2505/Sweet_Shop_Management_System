import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Login from '../page/Login';
import Register from '../page/Register';

const AppRoute = () => {
  return (
    <>
        <Routes>
            <Route path='/login' element = {<Login/>} />
            <Route path='/register' element = {<Register/>} />
        </Routes> 
    </>
  )
}

export default AppRoute
