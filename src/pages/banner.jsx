import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Banner = () => {
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

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col justify-center items-center w-full"
    >
      {/* Contenedor principal con altura responsive */}
      <div className={`
        relative
        
        max-h-[20vh]
        ${isMobile ? 'w-full' : 'w-3/5'}
        overflow-hidden
        rounded
      `}>
        
      {/* Fondo de imagen solo en móvil (cuando está fusionada) */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ 
            scale: imageLoaded ? 1 : 1.1,
            opacity: imageLoaded ? 0.5 : 0 
          }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://picsum.photos/600/400"
            alt="fondo"
            onLoad={() => setImageLoaded(true)}
            className="w-full h-full object-cover"
          />
          {/* Overlay oscuro para mejorar legibilidad del texto */}
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>

        {/* Grid para desktop: texto 30% | imagen 70% */}
        <div className={`
          relative z-10
          grid
          w-full h-full
          grid-cols-1
        `}>
          
          {/* TEXTO - siempre visible */}
          <motion.div
            variants={textVariants}
            className={`
              flex flex-col
              px-6 py-8 
              bg-transparent text-white
              relative z-10
            `}
          >
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-4xl font-bold"
              >
                Bienvenido a Maldito Club
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-gray-200 leading-relaxed mt-4"
              >
                Comunicación irresponsable.
              </motion.p>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

export default Banner;