import HeaderAnimado from "./headerMC";
import { Noticias, Etiqueta, Banners } from "./configuracion";
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Banner from "./banner";

const Noticia = ({ noticia, isFirst = false }) => {
    // Determinar si la noticia tiene enlace externo
    const isExternal = !!noticia.Link;
    const toPath = noticia.Link || `/noticia/${Noticias.indexOf(noticia)}`;

    return (
        <Link
            to={toPath}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="flex flex-col h-auto overflow-hidden mb-16 cursor-pointer hover:opacity-90 transition-opacity duration-300"
        >
            {/* Contenedor con padding consistente en desktop */}
            <div className={`flex flex-col mb-4 ${isFirst ? 'px-7 md:px-17' : 'px-7 md:px-17'}`}>
                {noticia.etiqueta !== undefined && noticia.etiqueta !== null && (
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
                                transition-all duration-300 mb-4 md:mr-7 md:mb-4 hover:opacity-90"
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

const noticiaEtiqueta = () => {
    const { etiqueta } = useParams();

    const [todas, setTodas] = useState([]);
    const [pagina, setPagina] = useState(1);

    const POR_PAGINA = 8;

    useEffect(() => {
        if (etiqueta !== undefined && Noticias.length > 0) {
            const filtradas = Noticias.filter(
                n => n.etiqueta === parseInt(etiqueta, 10)
            );

            setTodas(filtradas);
            setPagina(1); // reset al cambiar etiqueta
            console.log("Noticias filtradas por etiqueta:", etiqueta);
        }
    }, [etiqueta]);

    // cálculo de paginación
    const inicio = (pagina - 1) * POR_PAGINA;
    const fin = inicio + POR_PAGINA;

    const noticias = todas.slice(inicio, fin);
    const totalPaginas = Math.ceil(todas.length / POR_PAGINA);

    if (!todas.length) {
        return <div className="min-h-screen bg-black text-white">Cargando...</div>;
    }

    return (
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

                {/* CONTENIDO */}
                <div className="relative z-10 text-white">

                    {/* SOLO EN PAGINA 1 → noticia principal */}
                    {pagina === 1 && noticias[0] && (
                        <>
                            <Noticia noticia={noticias[0]} isFirst={true} />
                            {Banners[3] && <Banner banner={Banners[3]} />}
                        </>
                    )}

                    {/* LISTA */}
                    <div className="gap-16 mt-16 flex flex-col">
                        {noticias
                            .slice(pagina === 1 ? 1 : 0)
                            .map((n, i) => (
                                <Noticia 
                                    key={i} 
                                    noticia={n}
                                    isFirst={false}
                                />
                        ))}
                    </div>

                    {/* PAGINACION */}
                    <div className="flex justify-center items-center gap-6 mt-10 pb-10">
                        <button
                            onClick={() => setPagina(p => p - 1)}
                            disabled={pagina === 1}
                            className="px-4 py-2 bg-red-900 text-white disabled:opacity-50 hover:bg-red-800 transition-colors cursor-pointer disabled:cursor-not-allowed"
                        >
                            Anterior
                        </button>

                        <span className="text-white">
                            Página {pagina} de {totalPaginas}
                        </span>

                        <button
                            onClick={() => setPagina(p => p + 1)}
                            disabled={pagina === totalPaginas}
                            className="px-4 py-2 bg-red-900 text-white disabled:opacity-50 hover:bg-red-800 transition-colors cursor-pointer disabled:cursor-not-allowed"
                        >
                            Siguiente
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default noticiaEtiqueta;