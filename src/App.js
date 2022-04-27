import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import { Home, PageNotFound, Assessment, Name } from "./pages";
import Layout from "./containers/layout/layout";
import { AppContext } from "./context/context";

function App() {
  const [route, setRoute] = useState();
  const [name, setName] = useState();

  return (
    <AppContext.Provider value={{ route, setRoute, setName, name }}>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ASSESSMENT} exact element={<Layout />}>
          <Route path={ROUTES.LANGUAGE} exact element={<Assessment />} />
          <Route path={ROUTES.NAME} exact element={<Name />} />
        </Route>
        <Route path={ROUTES.NOMATCH} element={<PageNotFound />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
