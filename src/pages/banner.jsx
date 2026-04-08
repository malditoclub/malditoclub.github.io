import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Banner = ({banner}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es móvil por el ancho de pantalla
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Determinar si el banner es clickeable
  console.log(banner.link);
  const hasLink = banner.link;
  
  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Contenido del banner
  const BannerContent = () => (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col justify-center items-center w-full"
    >
      {/* Contenedor principal - ancho responsive */}
      <div className={`
        relative
        ${isMobile ? 'w-full' : 'w-3/5'}
        h-[17vh]
        overflow-hidden
        rounded-lg
        shadow-xl
      `}>
        
        {/* Fondo de imagen */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ 
            scale: imageLoaded ? 1 : 1.1,
            opacity: imageLoaded ? 1 : 0 
          }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={banner.imagenSrc}
            alt={banner.titulo}
            onLoad={() => setImageLoaded(true)}
            className="w-full h-full object-cover"
          />
          {/* Overlay oscuro para mejorar legibilidad del texto */}
          <div 
            className="absolute inset-0 bg-black"
            style={{ opacity: 0.5 }}
          />
        </motion.div>

        {/* Texto centrado */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <div className="text-center px-6 py-8 text-white">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl md:text-4xl font-bold"
            >
              {banner.titulo}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-gray-200 leading-relaxed mt-2 md:mt-4 text-sm md:text-base"
            >
              {banner.subtitulo}
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Si el banner es clickeable, envolver en Link
  if (hasLink) {
    return (
      <Link
        to={banner.link}
        target={ "_blank" }
        rel={ "noopener noreferrer" }
        className="block cursor-pointer hover:opacity-90 transition-opacity duration-300"
      >
        <BannerContent />
      </Link>
    );
  }

  // Si no es clickeable, renderizar normalmente
  return <BannerContent />;
};

export default Banner;