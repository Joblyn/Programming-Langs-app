import "./App.css";
import { Routes, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import { Home, Javascript, Python } from './pages';

function App() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.JAVASCRIPT} exact element={<Javascript />} />
      <Route path={ROUTES.PYTHON} exact element={<Python />} />      
    </Routes>
  );
}

export default App;
