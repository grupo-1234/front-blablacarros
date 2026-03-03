import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { ViagemService } from "../../services/ViagemService";
import { buscar } from "../../services/Service";
import type { Viagem } from "../../models/Viagem";
import type { Categoria } from "../../models/Categoria";

function ListarViagens() {
  const [viagens, setViagens] = useState<Viagem[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [destinoBusca, setDestinoBusca] = useState("");
  const [dataBusca, setDataBusca] = useState("");
  const [categoriaFiltrada, setCategoriaFiltrada] = useState("");

  const carregarDados = async () => {
    setCarregando(true);
    try {
      await buscar("/categorias", setCategorias);

      if (destinoBusca.length >= 3) {
        await ViagemService.buscarPorDestino(destinoBusca, setViagens);
      } else {
        await ViagemService.listar(setViagens);
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      carregarDados();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [destinoBusca]);

  const viagensFiltradas = viagens.filter((viagem) => {
    const bateData = !dataBusca || new Date(viagem.data).toISOString().split('T')[0] === dataBusca;
    const bateCategoria = !categoriaFiltrada || viagem.categoria?.descricao === categoriaFiltrada;

    return bateData && bateCategoria;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans pt-28">
      <header className="max-w-6xl mx-auto mb-8 text-center">
        <h1 className="text-2xl font-bold text-[var(--color-blablacarros-600)] mb-6">
          Para onde quer ir? 🚗
        </h1>

        <div className="bg-white p-2 rounded-2xl shadow-md flex flex-col md:flex-row items-center gap-2 max-w-4xl mx-auto border border-gray-100">
          <div className="flex-1 flex items-center px-3 w-full border-b md:border-b-0 md:border-r border-gray-50">
            <span className="opacity-50">📍</span>
            <input 
              type="text" 
              placeholder="Destino" 
              className="w-full p-2 outline-none text-sm font-medium"
              value={destinoBusca}
              onChange={(e) => setDestinoBusca(e.target.value)}
            />
          </div>

          <div className="flex-1 flex items-center px-3 w-full border-b md:border-b-0 md:border-r border-gray-50">
            <span className="opacity-50">📅</span>
            <input 
              type="date" 
              className="w-full p-2 outline-none text-sm font-medium cursor-pointer"
              value={dataBusca}
              onChange={(e) => setDataBusca(e.target.value)}
            />
          </div>

          <div className="flex-1 flex items-center px-3 w-full">
            <span className="opacity-50 mr-2">🏷️</span>
            <select 
              className="w-full p-2 bg-transparent outline-none text-sm font-medium cursor-pointer"
              value={categoriaFiltrada}
              onChange={(e) => setCategoriaFiltrada(e.target.value)}
            >
              <option value="">Todas as Categorias</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.descricao}>
                  {cat.descricao}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {carregando ? (
          <div className="flex justify-center py-20">
             <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--color-blablacarros-600)]"></div>
          </div>
        ) : viagensFiltradas.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={15}
            slidesPerView={1.2}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.5 },
            }}
            className="pb-12"
          >
            {viagensFiltradas.map((viagem) => (
              <SwiperSlide key={viagem.id}>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[300px] hover:shadow-md transition-shadow">
                  <div className="p-4 flex-grow">
                    <div className="flex justify-between items-center mb-4">
                      <span className="bg-[var(--color-blablacarros-verde)] text-[#064e3b] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        {viagem.categoria?.descricao || 'Carona'}
                      </span>
                      <span className="text-gray-300 text-[10px]">ID #{viagem.id}</span>
                    </div>

                    <div className="space-y-3 relative pl-4 border-l-2 border-dashed border-gray-100">
                       <div>
                          <p className="text-[10px] text-gray-400 uppercase font-bold text-left">Origem</p>
                          <p className="text-sm font-semibold text-gray-700 truncate text-left">{viagem.origem}</p>
                       </div>
                       <div>
                          <p className="text-[10px] text-gray-400 uppercase font-bold text-left">Destino</p>
                          <p className="text-sm font-bold text-[var(--color-blablacarros-600)] truncate text-left">{viagem.destino}</p>
                       </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                        <p className="text-[11px] text-gray-400">
                          📅 {new Date(viagem.data).toLocaleDateString('pt-BR')}
                        </p>
                        <p className="text-[11px] text-gray-400">
                          📍 {viagem.distancia}km
                        </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 border-t border-gray-50 flex justify-between items-center">
                    <div className="text-left">
                      <p className="text-[9px] text-gray-400 uppercase font-bold">Preço</p>
                      <p className="text-lg font-black text-gray-900">
                        R$ {Number(viagem.preco).toFixed(2)}
                      </p>
                    </div>
                    <button className="bg-[var(--color-blablacarros-600)] text-white text-xs px-4 py-2 rounded-lg font-bold hover:scale-105 active:scale-95 transition-transform">
                      Ver Mais
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-400 text-sm italic">Nenhuma carona encontrada para estes filtros. 📍</p>
            {(destinoBusca || dataBusca || categoriaFiltrada) && (
                <button 
                  onClick={() => { setDestinoBusca(""); setDataBusca(""); setCategoriaFiltrada(""); }}
                  className="mt-4 text-[var(--color-blablacarros-600)] font-bold text-sm hover:underline"
                >
                  Limpar filtros
                </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default ListarViagens;