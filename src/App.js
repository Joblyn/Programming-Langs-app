import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import { Home, PageNotFound, Javascript, Python, Java, Name } from "./pages";
import Layout from "./containers/layout/layout";
import { RouteContext } from "./context/context";

function App() {
  const [route, setRoute] = useState();
  const [name, setName] = useState();
  return (
    <RouteContext.Provider value={{ route, setRoute, setName, name }}>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LANGS} exact element={<Layout />}>
          <Route path={ROUTES.NAME} exact element={<Name />} />
          <Route path={ROUTES.JAVA} exact element={<Java />} />
          <Route path={ROUTES.JAVASCRIPT} exact element={<Javascript />} />
          <Route path={ROUTES.PYTHON} exact element={<Python />} />
        </Route>
        <Route path={ROUTES.NOMATCH} element={<PageNotFound />} />
      </Routes>
    </RouteContext.Provider>
  );
}

export default App;
