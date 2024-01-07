import React from "react";
import { Box, Skeleton } from "@mui/material";

const FilterSkeleton = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", marginX: "20px" }}>
      <Skeleton
        variant="circular"
        width={30}
        height={30}
        sx={{ marginX: "auto" }}
      ></Skeleton>
      <Skeleton variant="text" sx={{ fontSize: "1rem", width: "4rem" }} />
    </Box>
  );
};

export default FilterSkeleton;
