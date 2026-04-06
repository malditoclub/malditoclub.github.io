import HeaderAnimado from "./headerMC";
import { Noticias, Etiqueta } from "./configuracion";
import { useParams, Link } from 'react-router-dom'; // Agregar Link
import { useEffect, useState } from 'react';
import Banner from "./banner";

export const Noticia = ({ noticia, isFirst = false }) => {
    // Determinar si la noticia tiene enlace externo
    const isExternal = !!noticia.Link;
    const toPath = noticia.Link || `/noticia/${Noticias.indexOf(noticia)}`; // Asumiendo que cada noticia tiene un id

    return (
        <Link
            to={toPath}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="flex flex-col h-auto overflow-hidden mb-16 cursor-pointer hover:opacity-90 transition-opacity duration-300"
        >
            {/* Contenedor con padding consistente en desktop */}
            <div className={`flex flex-col mb-4 ${isFirst ? 'px-7 md:px-17' : 'px-7 md:px-17'}`}>
                {noticia.etiqueta && (
                    <Link
                        to={`/etiqueta/${noticia.etiqueta}`}
                        onClick={(e) => e.stopPropagation()} // Evitar que el click en la etiqueta active el Link padre
                        className="text-red-500/70 font-altehaas text-sm hover:text-red-500 transition-colors inline-block w-fit"
                    >
                        {`> ${Etiqueta[noticia.etiqueta - 1]?.name || 'Sin etiqueta'}`}
                    </Link>
                )}
                <h2 className="text-6xl font-deuschtlander tracking-wide text-white pt-4">
                    {noticia.titulo}
                </h2>
            </div>
            
            {/* Contenedor con imagen flotante y texto */}
            <div className={`${isFirst ? 'px-7 md:px-17' : 'px-7 md:px-17'}`}>
                {noticia.imagen && (
                    <img
                        src={`/assets/${noticia.imagen}`}
                        alt="content visual"
                        className="w-full h-auto md:float-left md:h-[45vh] md:w-auto md:max-w-1/2 rounded-lg 
                                transition-all duration-300 mb-4 md:mr-7 md:mb-4"
                    />
                )}
                
                {/* Texto que fluye alrededor de la imagen */}
                <div className="leading-relaxed space-y-4">
                    {noticia.texto.map((parrafo, idx) => (
                        <p key={idx} className="text-gray-300 leading-relaxed font-altehaas">
                            {parrafo}
                        </p>
                    ))}
                </div>
                
                {/* Limpia el float */}
                <div className="clear-both"></div>
            </div>
        </Link>
    );
};

const noticiaPrincipal = () => {
    const { id } = useParams(); // Obtiene el parámetro de la URL
    const [noticias, setNoticias] = useState(null);
    
    useEffect(() => {
        if (id !== undefined && Noticias.length > 0) {
            const index = parseInt(id);
            setNoticias(Noticias.slice(index, index + 8));
        }
    }, [id]);

    if (!noticias) {
        return <div className="min-h-screen bg-black text-white">Cargando...</div>;
    }

    return (
        <div className="min-h-screen bg-black"> 
            <HeaderAnimado />
            <div className="relative min-h-screen bg-black ">
                <div 
                    className="absolute inset-0 opacity-50 bg-repeat-y bg-center "
                    style={{ 
                        backgroundImage: `url('/assets/RS-Texture-01.jpg')`,
                        backgroundSize: 'cover'
                    }}
                />
                <div className="relative z-10 text-white">
                    {/* Primera noticia con padding consistente */}
                    <Noticia noticia={noticias[0]} isFirst={true} />
                    <Banner />
                </div>
                <div className="relative z-10 text-white gap-16 mt-16 flex flex-col">
                    {noticias.slice(1).map((n, i) => (
                        <Noticia key={i} noticia={n} isFirst={false} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default noticiaPrincipal;