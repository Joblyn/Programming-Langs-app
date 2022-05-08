import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import { Home, PageNotFound, Assessment, Name } from "./pages";
import Layout from "./containers/layout/layout";
import { AppContext } from "./context/context";
import ReactGA from "react-ga";

// initialize google analytics
let TRACKING_ID;
if (window.location.hostname === "woshipfrontend.interviewblindspots.com") {
  TRACKING_ID = "G-QW0ZP2JZHF";
} else {
  if (window.location.hostname === "damp-shore-08296.herokuapp.com") {
    TRACKING_ID = "G-L3SYMZVBRR";
  } else {
    TRACKING_ID = "G-8WCMDG75N4";
  }
}
ReactGA.initialize(TRACKING_ID);

function App() {
  const [route, setRoute] = useState();
  const [name, setName] = useState();

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <AppContext.Provider value={{ route, setRoute, setName, name }}>
      <Routes>
        <Route index element={<Home />} />
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ASSESSMENT} exact element={<Layout />}>
          <Route path={ROUTES.NAME} exact element={<Name />} />
          <Route path={ROUTES.LANGUAGE} exact element={<Assessment />} />
        </Route>
        <Route path={ROUTES.NOMATCH} element={<PageNotFound />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
