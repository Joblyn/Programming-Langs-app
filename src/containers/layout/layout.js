import React from "react";
import "./layout.scss";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import Personalise from "../../components/personalise/personalise";

export default function Layout() {
  const matches = useMediaQuery("(min-width: 960px)");

  return (
    <main className="flex flex-col relative lg:flex-row h-full" data-testid="layout-container">
      <div className="flex flex-row justify-center md:justify-start xl:pt-[50px] xl:pr-[84px] xl:pb-[150px] xl:pl-[151px] lg:pt-[50px] lg:px-[80px] lg:pb-[127px] sm:px-[125px] sm:pt-[50px]  sm:pb-0 pt-[50px] px-[30px] pb-0 page_container w-full lg:w-[calc(100%-349px)] xl:w-[calc(100%-500px)] min-h-screen h-screen overflow-y-auto scroll_bar">
        <Outlet />
      </div>
      {matches && (
        <div className="bg-lightgreen h-screen side_bar w-full overflow-y-auto scroll_bar">
          <Personalise />
        </div>
      )}
    </main>
  );
}
