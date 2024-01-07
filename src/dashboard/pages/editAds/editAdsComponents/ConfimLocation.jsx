import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  TextField,
} from "@mui/material";

import styles from "../../../../assets/dashboard/css/confirmLocation.module.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTranslation } from "react-i18next";

const ConfimLocation = ({ state, dispatch, interfaces }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const handleCityChange = (event) => {
    dispatch({ type: "city", value: event.target.value });
  };

  const handleNeighborhoodChange = (event) => {
    dispatch({ type: "neighborhood", value: event.target.value });
  };

  const handleRoadChange = (event) => {
    dispatch({ type: "street", value: event.target.value });
  };

  const handleInterfaceChange = (event) => {
    dispatch({ type: "interfaceId", value: event.target.value });
  };

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "600",
          marginBottom: "24px",
          marginTop: "8px",
          fontSize: { xs: "1.2rem", md: "1.5rem" },
        }}
      >
        {t("dashboard.property_location.title")}
      </Typography>

      <InputLabel sx={{ color: "black", fontWeight: "500", marginTop: "1rem" }}>
        {t("dashboard.property_location.label1")}
      </InputLabel>
      <TextField
        type="text"
        size="small"
        InputProps={{
          readOnly: state.city.length > 0 ? true : false,
        }}
        value={state.city}
        onChange={handleCityChange}
        sx={{
          width: "100%",
          borderRadius: "12px",
          textAlign: lang === "ar" ? "right" : "left",
          "&[readonly]": {
            backgroundColor: "lightgray",
            color: "darkgray",
          },
        }}
      />
      <InputLabel sx={{ color: "black", fontWeight: "500", marginTop: "1rem" }}>
        {t("dashboard.property_location.label2")}
      </InputLabel>
      <TextField
        type="text"
        size="small"
        InputProps={{
          readOnly: state.neighborhood.length > 0 ? true : false,
        }}
        value={state.neighborhood}
        onChange={handleNeighborhoodChange}
        sx={{
          width: "100%",
          borderRadius: "12px",
          textAlign: lang === "ar" ? "right" : "left",
        }}
      />
      <InputLabel sx={{ color: "black", fontWeight: "500", marginTop: "1rem" }}>
        {lang === "ar" ? "اسم الشارع" : "road name"}
      </InputLabel>
      <TextField
        type="text"
        size="small"
        value={state.street}
        onChange={handleRoadChange}
        sx={{
          width: "100%",
          borderRadius: "12px",
          textAlign: lang === "ar" ? "right" : "left",
          "&[readonly]": {
            backgroundColor: "lightgray",
            color: "darkgray",
          },
        }}
      />
      <InputLabel sx={{ color: "black", fontWeight: "500", marginTop: "1rem" }}>
        {t("dashboard.property_location.label3")}
      </InputLabel>
      <Typography sx={{ color: "gray", fontSize: "14px" }}>
        {t("dashboard.property_location.hint")}
      </Typography>
      <Select
        value={state.interface_id}
        onChange={handleInterfaceChange}
        label=""
        required
        IconComponent={ArrowDropDownIcon}
        className={`${styles.select} select`}
        classes={lang === "ar" && { icon: styles.selectIcon }}
        sx={{
          width: "100%",
          marginTop: ".2rem",
          padding: 0,
          borderRadius: "6px",
          textAlign: lang === "ar" ? "right" : "left",
          "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
            {
              padding: "10px 4px", // Remove padding from the input element
            },
        }}
      >
        {interfaces.map((interface_item) => (
          <MenuItem
            key={interface_item.id}
            value={interface_item.id}
            // className={
            //   selectedInterface === interface_item.en_name
            //     ? styles.selectedMenuItem
            //     : ""
            // }
          >
            {lang === "ar" ? interface_item.ar_name : interface_item.en_name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default ConfimLocation;
