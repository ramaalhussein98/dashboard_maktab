import React, { useState } from "react";
import "../../../assets/dashboard/css/prices.css";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Home1 } from "../../../assets/dashboard/images";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
const PriceCard = ({ img, day, prices, editMode, handleInputChange }) => {
  const { t } = useTranslation();
  return (
    <Paper
      className="paper_style2"
      sx={{ padding: { xs: "10px !important", md: "24px !important" } }}
    >
      <Box className="d_flex_wrap">
        <Box className="container_img">
          <img src={img} alt="Home" />
        </Box>
        <Box className="container_days">
          <span className="title_price">{day}</span>
          <Box className="Box_days">
            {prices.map((price, index) => (
              <Box key={index}>
                <p className="font_bold">
                  {index === 0
                    ? "ساعة"
                    : index === 1
                    ? "يومي"
                    : index === 2
                    ? "أسبوعي"
                    : index === 3
                    ? "شهري"
                    : index === 4
                    ? "سنوي"
                    : ""}
                </p>
                <div className="space"></div>
                {editMode ? (
                  <input
                    className="font_gray_Input"
                    value={price}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                ) : (
                  <p className="font_gray">{price}</p>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

const MainPrices = () => {
  const { t } = useTranslation();
  <Typography className="title_price">
    {" "}
    {t("dashboard.pricesNav.link1")}
  </Typography>;
  return (
    <Box>
      <MainPriceItem />
      <MainPriceItem />
      <MainPriceItem />
    </Box>
  );
};

const MainPriceItem = () => {
  const { t } = useTranslation();
  const initialPrices = [
    [1000, 1000, 20, 1000, 1000],
    [2000, 3000, 20, 4000, 1000],
  ];
  const [editMode, setEditMode] = useState(false);
  const [prices, setPrices] = useState(initialPrices);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleInputChange = (e, cardIndex, priceIndex) => {
    const newPrices = [...prices];
    newPrices[cardIndex][priceIndex] = e.target.value;
    setPrices(newPrices);
  };

  const handleSaveChanges = () => {
    // Perform save operation here
    setEditMode(false); // Disable edit mode after saving
    Swal.fire({
      title: "تم تعديل الأسعار",

      icon: "success",
    });
  };
  return (
    <Box sx={{ padding: { xs: "5px", md: "20px" } }}>
      {/* this will repeat */}
      <Paper
        className="paper_style"
        sx={{ padding: { xs: "10px !important", md: "24px !important" } }}
      >
        <Box className="d_flex_space_between">
          <Typography className="title_price">maktab</Typography>
          <button className="edit_btn" onClick={handleEditClick}>
            {t("dashboard.outgoing_requests.edit_btn")}
          </button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            justifyContent: "space-between",
          }}
        >
          <PriceCard
            img={Home1}
            day="33"
            prices={prices[0]}
            editMode={editMode}
            handleInputChange={(e, index) => handleInputChange(e, 0, index)}
          />
          <PriceCard
            img={Home1}
            day="33"
            prices={prices[1]}
            editMode={editMode}
            handleInputChange={(e, index) => handleInputChange(e, 1, index)}
          />
        </Box>
        {editMode && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <button className="cancel_btn" onClick={() => setEditMode(false)}>
              {t("dashboard.outgoing_requests.cancel_btn")}
            </button>
            <button className="save_btn" onClick={handleSaveChanges}>
              {t("dashboard.outgoing_requests.submit_btn")}
            </button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};
export default MainPrices;
