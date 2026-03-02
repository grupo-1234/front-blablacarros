export default function Footer() {
  return (
    <footer className="bg-[var(--color-blablacarros-600)] text-white px-8 py-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">

        <div>
          <h3 className="text-white text-xl font-semibold mb-4">
            BlablaCarros
          </h3>
          <p className="text-white/80 text-sm leading-relaxed">
            Conectando pessoas e destinos através de viagens compartilhadas.
            Economia, praticidade e sustentabilidade em um só lugar.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Plataforma</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[var(--color-blablacarros-verde)] cursor-pointer transition">
              Como funciona
            </li>
            <li className="hover:text-[var(--color-blablacarros-verde)] cursor-pointer transition">
              Buscar caronas
            </li>
            <li className="hover:text-[var(--color-blablacarros-verde)] cursor-pointer transition">
              Oferecer carona
            </li>
            <li className="hover:text-[var(--color-blablacarros-verde)] cursor-pointer transition">
              Segurança
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Empresa</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[var(--color-blablacarros-verde)] cursor-pointer transition">
              Sobre nós
            </li>
            <li className="hover:text-[var(--color-blablacarros-verde)] cursor-pointer transition">
              Blog
            </li>
            <li className="hover:text-[var(--color-blablacarros-verde)] cursor-pointer transition">
              Trabalhe conosco
            </li>
            <li className="hover:text-[var(--color-blablacarros-verde)] cursor-pointer transition">
              Contato
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Contato</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li>contato@blablacarros.com.br</li>
            <li>(81) 99999-0000</li>
            <li>Recife, PE - Brasil</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-white/20 mt-12 pt-6 text-center text-sm text-white/70">
        © 2026 BlablaCarros. Todos os direitos reservados.
      </div>
    </footer>
  )
}