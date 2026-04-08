function Noticia({ 
    titulo = "Título",
    texto = [],
    imagenSrc = "https://picsum.photos/900/400"
}) {
    return (

        <div className="flex flex-col h-auto overflow-hidden md:h-[80vh]">
            
            <h2 className="text-4xl font-deuschtlander mb-2 tracking-wide text-white">{titulo}</h2>
            {/* Contenedor del texto con imagen flotante */}
            <div className="relative">
                {imagenSrc && <img
                    src={imagenSrc}
                    alt="content visual"
                    className=" w-full h-auto md:float-right md:h-[45vh] md:w-auto md:max-w-3/5 rounded-lg 
                                transition-all duration-300"
                        // opcional, para limitar altura
                /> }

                
                {/* Texto que fluye alrededor de la imagen */}
                <div className="leading-relaxed space-y-1 p-1">
                    
                    {texto.map((parrafo, idx) => (
                        <p key={idx} className="text-gray-300 leading-relaxed font-altehaas">
                            {parrafo}
                        </p>
                    ))}
                </div>
                
                {/* Este div vacío limpia el float para que el fondo no se escape */}
                <div className="clear-both"></div>
            </div>
        </div>
    );
}


export default Noticia;