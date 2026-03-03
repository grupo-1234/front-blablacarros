import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import ListaCategorias from './components/categorias/listaCategorias/ListaCategorias';
import FormCategoria from './components/categorias/formCategoria/FormCategoria';
import DeletarCategoria from './components/categorias/deletarCategoria/DeletarCategoria';
import Navbar from './components/navbar/Navbar'
import Footer from "./components/footer/Footer"
import ListarViagens from './pages/viagens/ListarViagens';
import CadastrarViagem from './pages/viagens/CadastrarViagem';
import DetalhesViagem from './pages/viagens/DetalhesViagem';



function App() {
  return (
    <BrowserRouter>
    <Navbar />
      
      <div className='min-h-[80vh]'> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/viagens" element={<ListarViagens />} />
          <Route path="/viagens/:id" element={<DetalhesViagem />} />
          <Route path="/oferecer-carona" element={<CadastrarViagem />} />
          <Route path="/editar-viagem/:id" element={<CadastrarViagem />} />
          <Route path="/categorias" element={<ListaCategorias />} />
          <Route path="/cadastroCategoria" element={<FormCategoria />} />
          <Route path="/editarCategoria/:id" element={<FormCategoria />} />
          <Route path="/deletarCategoria/:id" element={<DeletarCategoria />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App