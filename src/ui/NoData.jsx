import { Box, Typography } from "@mui/material";
import React from "react";
import HourglassDisabledIcon from "@mui/icons-material/HourglassDisabled";
import { useTranslation } from "react-i18next";

const NoData = () => {
    const {t , i18n} = useTranslation()
    const lang = i18n.language
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "70%" },
        height: "400px",
        // boxShadow: "1",
        backgroundColor: "white",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <HourglassDisabledIcon sx={{ fontSize: "4rem", marginBottom: "2rem" , color:"#ddd"}} />
      <Typography sx={{ fontSize: "25px", color: "#ddd" }}>
        {lang === "ar" ? "لا يوجد عقارات معروضة" : "there is no Ads"}
      </Typography>
    </Box>
  );
};

export default NoData;
