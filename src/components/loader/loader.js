import React from "react";
import { CircularProgress } from "@mui/material";

export default function Loader() {
  return (
    <div className="h-[80vh] w-full relative flex items-center justify-center">
      <CircularProgress color="success" size={25} />
    </div>
  );
}
