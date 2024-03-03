import React, { useState } from "react";

import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Favorite from "./pages/Favorite";
import ProductPage from "./pages/ProductPage";

import { Routes, Route } from "react-router-dom";

import AppContext from "./Context";

function App() {
  const [openCart, setOpenCart] = useState(false);

  const onClickCloseCart = () => {
    setOpenCart(false);
    document.body.style.overflow = "auto";
  };

  const handleOpenCart = () => {
    setOpenCart(true);
    document.body.style.overflow = "hidden";
  };

  return (
    <AppContext.Provider value={{ onClickCloseCart, handleOpenCart }}>
      <div className="container clear">
        {openCart ? <Drawer /> : null}
        <Header openCart={openCart} setOpenCart={setOpenCart} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/favorites" element={<Favorite />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
