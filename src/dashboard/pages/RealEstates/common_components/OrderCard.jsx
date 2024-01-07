import React from "react";
import { Box, Typography } from "@mui/material";

const OrderCard = ({ title, change, children, className }) => {
  return (
    <Box
      sx={{
        border: className === "edit" ? "" : "1px solid rgb(234, 234, 234)",
        borderRadius: "10px",
        padding:
          className === "edit"
            ? { xs: "1.5rem 0", sm: "1.5rem 0" }
            : { xs: "1.5rem", sm: "1.5rem 2.5rem" },
        marginBottom: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <Typography sx={{ fontWeight: "600", fontSize: "1.2rem" }}>
          {title}
        </Typography>
        {change && (
          <Typography
            sx={{
              color: "var(--main-color)",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            {change}
          </Typography>
        )}
      </Box>
      {children}
    </Box>
  );
};

export default OrderCard;
