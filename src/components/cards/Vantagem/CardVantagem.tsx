import { type IconProps } from "@phosphor-icons/react"

interface CardVantagemProps {
  titulo: string
  descricao: string
  Icone: React.ElementType<IconProps>
}

function CardVantagem({ titulo, descricao, Icone }: CardVantagemProps) {
  return (
    <div className="bg-white border border-black/5
                    rounded-2xl p-8 flex flex-col
                    shadow-sm hover:shadow-lg
                    transition-all duration-300
                    hover:-translate-y-1">

      <div className="bg-[var(--color-blablacarros-600)]/10 
                      p-3 rounded-xl mb-6 
                      text-[var(--color-blablacarros-600)] w-fit">
        <Icone size={28} weight="bold" />
      </div>

      <h3 className="font-bold text-gray-800 text-lg mb-3 leading-tight">
        {titulo}
      </h3>

      <p className="text-gray-500 text-sm leading-relaxed">
        {descricao}
      </p>

    </div>
  )
}

export default CardVantagem