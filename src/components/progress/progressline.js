import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

function LinearProgressWithLabel(props) {
  const { count, totalCount } = props;
  return (
    <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <span className="ml-auto text-xl">
          {count+1}/{totalCount}
        </span>
      </Box>
    </Box>
  );
}

export default function ProgressLine(props) {
  const { count, totalCount } = props;
  const value = Math.round((100 / totalCount) * (count+1));

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={value} count={count} totalCount={totalCount} />
    </Box>
  );
}
