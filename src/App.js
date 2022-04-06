import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import { Home } from "./pages";
import Layout from "./containers/layout/layout";
import { RouteContext } from "./context/context";

function App() {
  const [route, setRoute] = useState();
  const [name, setName] = useState();
  return (
    <RouteContext.Provider value={{ route, setRoute, setName, name }}>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
      </Routes>
      <Layout />
    </RouteContext.Provider>
  );
}

export default App;
