import { BrowserRouter } from "react-router-dom"
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Footer from "./components/footer/Footer"
import ListaVantagens from "./components/cards/Vantagem/ListaVantagens"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Home />
      <ListaVantagens />
      <Footer />
    </BrowserRouter>
  )
}

export default App