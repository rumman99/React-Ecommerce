import { createContext, useState } from 'react';
import './App.css'
import ConfirmOrder from './components/ConfirmOrder/ConfirmOrder';
import Header from './components/Header/Header'
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import Productinfo from './components/Productinfo/Productinfo';
import Review from './components/Review/Review';
import Shop from './components/Shop/Shop'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const userContext= createContext();

function App() {
  const [userLogin, setUserLogin]= useState({});

  return (
    <userContext.Provider value={[userLogin, setUserLogin]}>
    <BrowserRouter>
    <Header></Header>
    <Routes>
      <Route path='/' element={<Shop></Shop>}/>
      <Route path='/review' element={<Review></Review>}/>
      <Route path='/inventory' element=
        {<PrivateRoute>
          <Inventory></Inventory>
          </PrivateRoute>}>
      </Route>
      <Route path='/product/:productkey' element={<Productinfo></Productinfo>}/>
      <Route path='/confirm-order' element=
        {<PrivateRoute>
        <ConfirmOrder></ConfirmOrder>
        </PrivateRoute>}>
      </Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='*' element={<h1>ERROR 404</h1>}/>
    </Routes>
    </BrowserRouter>
    </userContext.Provider>
  )
}

export default App
