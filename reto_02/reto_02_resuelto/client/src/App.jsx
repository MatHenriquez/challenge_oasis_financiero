import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //Importo el router de React.
import Main from "./components/Main"; //Importo mi componente creado.

function App() {
  return (
    <>
      <Router>
        <div className="app">
          <Routes>
            <Route index element={<Main/>} />{" "}
            {/* El componente "UserForm" se muestra como landing page. */}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
