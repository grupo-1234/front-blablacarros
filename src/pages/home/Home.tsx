import background from "../../assets/imghome.png"

function Home() {
  return (
    <>
      <section
        className="relative w-full h-[75vh] flex items-center justify-center text-white bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}>

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            BlablaCarros
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Encontre ou ofereça caronas de forma simples, segura e econômica.
          </p>

          <button
          className={`bg-[var(--color-blablacarros-600)]
                      text-white
                      px-8 py-4
                      rounded-md
                      text-lg
                      font-semibold
                      hover:opacity-90
                      transition`}
         >
         Buscar Carona
        </button>
        </div>
      </section>
     
    </>
  )
}

export default Home