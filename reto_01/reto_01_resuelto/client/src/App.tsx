import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //Importo el router de React.
import UserForm from "./components/UserForm"; //Importo mi componente creado.

function App() {
  return (
    <>
      <Router>
        <div className="app">
          <Routes>
            <Route index element={<UserForm />} />{" "}
            {/* El componente "UserForm" se muestra como landing page. */}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
