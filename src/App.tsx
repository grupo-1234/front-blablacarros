import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import ListarViagens from './pages/viagens/ListarViagens';
import CadastrarViagem from './pages/viagens/CadastrarViagem';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/viagem" element={<ListarViagens />} />
        <Route path="/cadastrar" element={<CadastrarViagem />} />
      </Routes>
    </BrowserRouter>
  )
  
}

export default App;