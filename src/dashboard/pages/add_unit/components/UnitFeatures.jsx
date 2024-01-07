import React, { useState } from "react";

import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const UnitFeatures = ({ unit, dispatch, features }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const handlePropertyClick = (propertyId) => {
    dispatch({ type: "features", value: propertyId });
  };
  return (
    <>
      <div className="UnitDetailsContainer">
        <p className="UnitDetailsTitle">
          {" "}
          مميزات الوحدة <span className="gary-color">اختياري</span>
        </p>
      </div>
      <Box
        sx={{
          display: "grid",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
        }}
      >
        {features?.map((property) => (
          <Box
            key={property.id}
            onClick={() => handlePropertyClick(property.id)}
            sx={{
              height: "100px",
              width: "100px",
              border: "1px solid gray",
              display: "flex",
              textAlign: "center",
              alignItems: "end",
              borderRadius: "12px",
              position: "relative",
              cursor: "pointer",
              padding: "10px 0px",
              marginBottom: "1rem",
              backgroundColor: unit.features.some(
                (item) => item === property.id
              )
                ? "var(--green-color)"
                : "transparent",
              transition: "background-color 0.3s, color 0.3s",
            }}
          >
            <img
              src={`https://dashboard.maktab.sa/${property.icon}`}
              alt="img"
              style={{
                position: "absolute",
                insetBlockStart: "15px",
                insetInlineStart: "14px",
                width: "36px",
              }}
            />
            <Typography
              sx={{
                width: "100%",
                textAlign: "center",
                fontSize: "15px",
                color: unit.features.some((item) => item === property.id)
                  ? "white"
                  : "black",
              }}
            >
              {lang === "ar" ? property.ar_name : property.en_name}
            </Typography>
            <input type="hidden" value={property.id} />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default UnitFeatures;
