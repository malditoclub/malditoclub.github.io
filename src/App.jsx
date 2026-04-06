import {
  HashRouter as Router,
  Routes,
  Route
} from 'react-router-dom';


import NoticiaPrincipal from "./pages/noticiaPrincipal.jsx";
import NoticiaEtiqueta from "./pages/noticiaEtiqueta.jsx";
import MalditoClubEstandar from "./pages/malditoClubEstandar.jsx";


function App() { 
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MalditoClubEstandar />} />
          <Route path="/noticia/:id" element={<NoticiaPrincipal />} />
          <Route path="/etiqueta/:etiqueta" element={<NoticiaEtiqueta />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

/*
function App() {
  return <Home />;
}
*/