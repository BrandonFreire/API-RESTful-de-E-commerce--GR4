import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './Context/UserContext';
import ProductProvider from './Context/ProductContext';
import Home from './Components/Home';
import Login from './Components/LoginRegister/Login';
import Cart from './Components/Cart/Cart';
import Shop from './Components/Shop/Shop'; // <-- Importar la Tienda
import UserProfile from './Components/UserProfile/UserProfile';
import Success from './Components/Success/Success';
//import './App.css';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ProductProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shop" element={<Shop />} /> {/* <-- Nueva Ruta */}
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </ProductProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;