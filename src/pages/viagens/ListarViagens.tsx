import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { ViagemService } from "../../services/ViagemService";
import type { Viagem } from "../../models/Viagem";

function ListarViagens() {
  const [viagens, setViagens] = useState<Viagem[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [destinoBusca, setDestinoBusca] = useState("");
  const [dataBusca, setDataBusca] = useState("");

  const carregarCaronas = async () => {
    setCarregando(true);
    try {
      if (destinoBusca.length >= 3) {
        await ViagemService.buscarPorDestino(destinoBusca, setViagens);
      } else {
        await ViagemService.listar(setViagens);
      }
    } catch (error) {
      console.error("Erro ao carregar viagens:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => carregarCaronas(), 500);
    return () => clearTimeout(delayDebounce);
  }, [destinoBusca]);

  const viagensFiltradas = viagens.filter((viagem) => {
    if (!dataBusca) return true;
    const dataViagem = new Date(viagem.data).toISOString().split('T')[0];
    return dataViagem === dataBusca;
  });

  return (
    <div className="min-h-screen bg-[var(--color-blablacarros-cinza)] p-4 font-sans">
      <header className="max-w-6xl mx-auto mb-8 text-center">
        <h1 className="text-2xl font-bold text-[var(--color-blablacarros-600)] mb-6">
          Encontre sua Carona 🚗
        </h1>

        {/* Barra de Busca Compacta */}
        <div className="bg-white p-2 rounded-2xl shadow-md flex flex-col md:flex-row items-center gap-2 max-w-2xl mx-auto border border-gray-100">
          <div className="flex-1 flex items-center px-3 w-full border-b md:border-b-0 md:border-r border-gray-50">
            <span className="opacity-50">📍</span>
            <input 
              type="text" 
              placeholder="Para onde?" 
              className="w-full p-2 outline-none text-sm"
              value={destinoBusca}
              onChange={(e) => setDestinoBusca(e.target.value)}
            />
          </div>
          <div className="flex-1 flex items-center px-3 w-full">
            <span className="opacity-50">📅</span>
            <input 
              type="date" 
              className="w-full p-2 outline-none text-sm cursor-pointer"
              value={dataBusca}
              onChange={(e) => setDataBusca(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {carregando ? (
          <p className="text-center text-gray-500 text-sm">Buscando...</p>
        ) : viagensFiltradas.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={15}
            slidesPerView={1.2} // Mostra um pedaço do próximo card para indicar slide
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
                {/* Card Quadrado e Compacto */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[280px]">
                  <div className="p-4 flex-grow">
                    <div className="flex justify-between items-center mb-4">
                      <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        Ativa
                      </span>
                      <span className="text-gray-300 text-[10px]">#{viagem.id}</span>
                    </div>

                    <div className="space-y-3 relative pl-4 border-l-2 border-dashed border-gray-100">
                       <div>
                          <p className="text-[10px] text-gray-400 uppercase font-bold">Origem</p>
                          <p className="text-sm font-semibold text-gray-700 truncate">{viagem.origem}</p>
                       </div>
                       <div>
                          <p className="text-[10px] text-gray-400 uppercase font-bold">Destino</p>
                          <p className="text-sm font-bold text-[var(--color-blablacarros-600)] truncate">{viagem.destino}</p>
                       </div>
                    </div>
                    
                    <p className="mt-4 text-[11px] text-gray-400">
                      📅 {new Date(viagem.data).toLocaleDateString('pt-BR')}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 border-t border-gray-50 flex justify-between items-center">
                    <div>
                      <p className="text-[9px] text-gray-400 uppercase font-bold">Preço</p>
                      <p className="text-lg font-black text-gray-900">
                        R$ {Number(viagem.preco).toFixed(2)}
                      </p>
                    </div>
                    <button className="bg-[var(--color-blablacarros-600)] text-white text-xs px-4 py-2 rounded-lg font-bold hover:scale-105 transition-transform">
                      Ver
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-400 text-sm">Nenhuma carona disponível. 📍</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default ListarViagens;