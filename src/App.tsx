
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import ListaCategorias from './components/categorias/listaCategorias/ListaCategorias';
import FormCategoria from './components/categorias/formCategoria/FormCategoria';
import DeletarCategoria from './components/categorias/deletarCategoria/DeletarCategoria';


import Navbar from './components/navbar/Navbar'

import Footer from "./components/footer/Footer"
import ListaVantagens from "./components/cards/Vantagem/ListaVantagens"


function App() {
  return (
    <BrowserRouter>
    <Navbar />

      {/* Aqui você pode colocar o Navbar para ele aparecer em todas as páginas */}
      <div className='min-h-[80vh]'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/vantagens" element={<ListaVantagens />} />
          <Route path="/categorias" element={<ListaCategorias />} />
          <Route path="/cadastroCategoria" element={<FormCategoria />} />
          <Route path="/editarCategoria/:id" element={<FormCategoria />} />
          <Route path="/deletarCategoria/:id" element={<DeletarCategoria />} />
        </Routes>
      </div>
      {/* Aqui você pode colocar o Footer */}
       <Footer />
    </BrowserRouter>
  );

      
      

}

export default App