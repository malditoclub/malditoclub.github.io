
import HeaderAnimado from "./headerMC";
import Body from "./body";
import Banner from "./banner";
import Plantilla2noticias from "./plantilla2noticias";
import { Noticia } from "./noticiaPrincipal";
import { Noticias } from "./configuracion";


const malditoClubEstandar = () => {


  return (
    // [#A30000]
    <div className="min-h-screen bg-black "> 

      <HeaderAnimado />
      <div className="relative min-h-screen bg-black">
          {/* Imagen superior */}
        <div 
          className="absolute inset-0 opacity-50 
                    bg-repeat-y bg-center"
          style={{ 
            backgroundImage: `url('/assets/RS-Texture-01.jpg')`,
            backgroundSize: 'contain'  /* o 'contain' o un valor específico */
          }}
        />
        
        <div className="relative z-10 text-white">
          <div className="md:w-full md:h-[20vh]"></div>
          <Body/>
          <div className="md:w-full md:h-[10vh]"></div>
          <Banner/>
          <Plantilla2noticias/>
          <div className="md:w-full md:h-[10vh]"></div>
          <Banner 
            titulo="Título personalizado"
            subtitulo="Subtítulo personalizado"
            imagenSrc="/assets/mi-imagen.jpg"
          />
          <Noticia noticia={Noticias[7]} />
          <Noticia noticia={Noticias[8]} />
          <Noticia noticia={Noticias[9]} />
          <Noticia noticia={Noticias[10]} />
          <div className="md:w-full md:h-[20vh]"></div>
        </div>
      </div>

    </div>
  );
};


export default malditoClubEstandar;