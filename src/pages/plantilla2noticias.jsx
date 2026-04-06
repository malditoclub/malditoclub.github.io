import MiniNoticia from "./miniNoticia.jsx";
import Noticia from "./noticia2.jsx";
import { Noticias } from "./configuracion";
import { Link, useNavigate } from "react-router-dom";

const Plantilla2noticias = () => {
    const navigate = useNavigate();

    const handleNoticiaClick = (e, index) => {
        // Solo para enlaces externos, si el usuario hace click normal
        const noticia = Noticias[index];
        if (noticia.Link) {
            // Para enlaces externos, prevenir comportamiento por defecto
            // y usar window.location (o dejar que el Link lo maneje)
            if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                e.preventDefault();
                window.location.href = noticia.Link;
            }
        }
        // Para enlaces internos, el Link maneja todo automáticamente
    };

    return(
        <div className="min-h-auto gap-2 max-w-4x1 p-4"> 
            <section>
                <div className="                   
                grid
                grid-cols-1
                md:grid-cols-[2fr_1fr]
                grid-rows-1
                gap-1
                ">
                    {/* Noticia Principal */}
                    {(() => {
                        const noticia = Noticias[3];
                        const isExternal = !!noticia.Link;
                        const toPath = noticia.Link || `/noticia/3`;
                        
                        return (
                            <Link
                                to={toPath}
                                target={isExternal ? "_blank" : undefined}
                                rel={isExternal ? "noopener noreferrer" : undefined}
                                onClick={(e) => handleNoticiaClick(e, 3)}
                                className="flex w-full md:h-[60vh] overflow-hidden cursor-pointer"
                            >
                                <Noticia
                                    titulo={noticia.titulo}
                                    texto={noticia.texto}
                                    imagenSrc={`/assets/${noticia.imagen}`}
                                />
                            </Link>
                        );
                    })()}
                
                    <div className="flex flex-col gap-2">
                        {[4, 5, 6].map((index) => {
                            const noticia = Noticias[index];
                            const isExternal = !!noticia.Link;
                            const toPath = noticia.Link || `/noticia/${index}`;
                            
                            return (
                                <Link
                                    key={index}
                                    to={toPath}
                                    target={isExternal ? "_blank" : undefined}
                                    rel={isExternal ? "noopener noreferrer" : undefined}
                                    onClick={(e) => handleNoticiaClick(e, index)}
                                    className={`
                                        block
                                        md:h-[25vh] transition duration-300 
                                        hover:shadow-xl hover:scale-[1.01] rounded-3xl
                                        text-white overflow-hidden hover:ring-2 hover:ring-red-800 hover:ring-opacity-50
                                    `}
                                >
                                    <MiniNoticia
                                        titulo={noticia.titulo}
                                        imagenSrc={`/assets/${noticia.imagen}`}
                                    />
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Plantilla2noticias;