import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useMotionValueEvent, useMotionValue } from 'framer-motion';
import { Link } from "react-router-dom"; // Importar Link
import { LinksItems, Etiqueta } from "./configuracion";

function HeaderAnimado() {
  const { scrollY } = useScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint de Tailwind
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll redondeado
  const roundedScrollY = useMotionValue(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const rounded = Math.round(latest);
    if (Math.abs(rounded - roundedScrollY.get()) > 2) {
      roundedScrollY.set(rounded);
    }
  });

  // En móvil, desactivamos las animaciones de scroll para el header
  const scrollRange = [30, 150];
  
  // Usamos diferentes valores para móvil y desktop
  const headerHeight = useTransform(
    roundedScrollY, 
    scrollRange, 
    isMobile ? [60, 60] : [110, 60] // En móvil, altura fija
  );

  const opacityLarge = useTransform(
    roundedScrollY, 
    scrollRange, 
    isMobile ? [0, 0] : [1, 0] // En móvil, logo grande siempre invisible
  );
  
  const opacitySmall = useTransform(
    roundedScrollY, 
    scrollRange, 
    isMobile ? [1, 1] : [0, 1] // En móvil, logo pequeño siempre visible
  );

  const logoLeft = useTransform(
    roundedScrollY, 
    scrollRange, 
    isMobile ? ["16px", "16px"] : ["50%", "72px"] // En móvil, posición fija
  );

  const menuOpacity = useTransform(
    roundedScrollY, 
    scrollRange, 
    isMobile ? [1, 1] : [0, 1] // En móvil, menú siempre visible
  );

  return (
    <>
      <motion.header
        className="sticky top-0 z-50 w-full bg-black shadow-sm flex flex-col items-center"
        style={{ height: headerHeight }}
      >
        <div className="w-full h-full flex items-center text-white">
          {/* BOTON MENU - Siempre clickeable */}
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl z-10 p-1"
            style={{ 
              opacity:1,
              pointerEvents: 'auto' // Asegurar que sea clickeable
            }}
          >
            {menuOpen ? "✕" : "☰"}
          </motion.button>
          {/* LOGO ICONO - Para móvil siempre visible, para desktop animado */}
          <motion.img
            src={`/assets/logoSmall.png`} 
            className={`absolute h-10 w-auto ${isMobile ? ' justify-self-start' : ''}`}
            style={isMobile ? {
              opacity: 1
            } : {
              opacity: opacitySmall,
              left: logoLeft,
              top: "50%",
              translateY: "-50%"
            }}
          />

          {/* LOGO EXTENDIDO - Solo en desktop */}
          {!isMobile && (
            <motion.div className="absolute flex flex-col items-center justify-center"
                  style={{
                  opacity: opacityLarge,
                  left: "50%",
                  top: "50%",
                  translateX: "-50%",
                  translateY: "-50%"
                }}>
              <motion.img
                src={`/assets/logoExtendido.png`}
                className="h-16 w-auto"
              />

                <nav className="flex text-lg">
                  {LinksItems.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link 
                        to={item.href}
                        className="hover:text-red-600 px-1 py-1 inline-block"
                        onClick={() => setMenuOpen(false)} // cerrar menú al hacer click
                      >
                        <motion.img
                          src={item.logo}
                          alt="content visual"
                          className="max-h-7 w-auto"
                        />
                      </Link>
                    </motion.div>
                  ))}
                </nav>
            </motion.div>
          )}

        </div>
      </motion.header>

      {/* MENU LATERAL - Mejorado para móvil */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* FONDO OSCURO */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* PANEL - Ancho responsivo */}
            <motion.div
              className="fixed top-0 left-0 h-full bg-black shadow-xl z-50 p-6"
              style={{ 
                width: isMobile ? '85%' : '256px', // 85% en móvil, 256px en desktop
                maxWidth: '300px' // Nunca más de 300px
              }}
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
            >
              <nav className="flex flex-col gap-6 text-lg mt-12">
                {Etiqueta.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.05, x: 4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      to={"/etiqueta/" + item.id}
                      className="hover:text-red-600 transition px-2 py-1 text-white inline-block w-full"
                      onClick={() => setMenuOpen(false)} // cerrar menú al hacer click
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default HeaderAnimado;