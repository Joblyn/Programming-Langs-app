import React from "react";
import "./layout.scss";
import { Routes, Route } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { Javascript, Python, Java, Name } from "../../pages";

export default function Layout() {
  return (
    <main className="flex flex-row">
      <div className="flex flex-row justify-center md:justify-start xl:pt-[50px] xl:pr-[84px] xl:pb-[150px] xl:pl-[151px] lg:pt-[50px] lg:px-[80px] lg:pb-[127px] sm:pt-[50px] sm:px-125px sm:pb-0 pt-[50px] px-[50px] pb-0 page_container w-full md:w-[60%] min-h-screen">
        <Routes>
          <Route path={ROUTES.NAME} exact element={<Name />} />
          <Route path={ROUTES.JAVA} exact element={<Java />} />
          <Route path={ROUTES.JAVASCRIPT} exact element={<Javascript />} />
          <Route path={ROUTES.PYTHON} exact element={<Python />} />
        </Routes>
      </div>
      <div className="hidden md:block w-[40%] bg-lightgreen min-h-screen"></div>
    </main>
  );
}
