import { Box } from "@mui/material";
import "./App.css";
import Header from "./Component/Header/Header";
import Home from "./Component/home/Home";
import DataProvider from "./Context/DataProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailView from "./Component/details/DetailView";
import Cart from "./Component/cart/Cart";

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Header />
        <Box style={{ marginTop: 54 }}>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/product/:id' element={<DetailView/>}/>
            <Route path="/cart" element={<Cart/>}/>
          </Routes>
        </Box>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
