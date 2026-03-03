import { useState, useEffect } from "react"
import CardVantagem from "./CardVantagem"
import { Car, ShieldCheck, Money, MapPin, Users, Clock } from "@phosphor-icons/react"

function ListaVantagens() {
  const [vantagens, setVantagens] = useState<any[]>([])

  useEffect(() => {
    carregarVantagens()
  }, [])

  function carregarVantagens() {
    const lista = [
      { id: 1, titulo: "Viagens mais econômicas", descricao: "Divida os custos da viagem e economize combustível, pedágio e estacionamento.", icone: Money },
      { id: 2, titulo: "Segurança verificada", descricao: "Perfis avaliados, sistema de avaliações e verificação de usuários para viagens tranquilas.", icone: ShieldCheck },
      { id: 3, titulo: "Encontre rotas facilmente", descricao: "Pesquise destinos e encontre motoristas indo para o mesmo lugar que você.", icone: MapPin },
      { id: 4, titulo: "Compartilhe seu carro", descricao: "Ofereça caronas e transforme lugares vazios em economia extra.", icone: Car },
      { id: 5, titulo: "Conecte-se com pessoas", descricao: "Conheça novas pessoas e torne sua viagem mais agradável.", icone: Users },
      { id: 6, titulo: "Horários flexíveis", descricao: "Escolha viagens que se encaixam perfeitamente na sua agenda.", icone: Clock }
    ]
    setVantagens(lista)
  }

  return (
    <section className="w-full py-28 bg-[var(--color-blablacarros-cinza)]">
      <div className="container mx-auto max-w-6xl px-6 ">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-blablacarros-600)] mb-6">
            Por que usar o BlablaCarros?
          </h2>
          <div className="w-20 h-1 bg-[var(--color-blablacarros-verde)] mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Uma maneira simples, segura e econômica de viajar compartilhando trajetos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {vantagens.map((vantagem) => (
            <CardVantagem
              key={vantagem.id}
              titulo={vantagem.titulo}
              descricao={vantagem.descricao}
              Icone={vantagem.icone}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ListaVantagens