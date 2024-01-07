import {
  Box,
  Divider,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Home1 } from "../../../assets/dashboard/images";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

const DownPrice = () => {
  const { t } = useTranslation();
  const [office, setOffice] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [unit, setUnit] = useState("%");
  const [price, setPrice] = useState(50);

  const handleOfficeChange = (event) => {
    setOffice(event.target.value);
  };

  const handleEditClick = () => {
    setShowEdit(true);
  };

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleSaveNewPrice = () => {
    setPrice(price);
    setShowEdit(false);
    Swal.fire({
      title: "تم تعديل السعر",

      icon: "success",
    });
  };
  return (
    <Box sx={{ padding: "20px" }}>
      <span className="title_price">{t("dashboard.pricesNav.link3")} </span>
      <Box
        className="d_flex_wrap"
        sx={{ marginY: "1rem", alignItems: "center" }}
      >
        <span className="font_bold"> {t("dashboard.prices.chooseOffice")}</span>
        <FormControl
          sx={{ minWidth: 120, width: "250px", backgroundColor: "white" }}
        >
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={office}
            onChange={handleOfficeChange}
            MenuProps={{
              getContentAnchorEl: null,
            }}
            IconComponent={ExpandMoreIcon}
          >
            <MenuItem value={10}>maktab</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Paper className="paper_style">
        <Box className="d_flex_space_between">
          <Typography className="title_price">maktab</Typography>
          {!showEdit && (
            <button className="edit_btn" onClick={handleEditClick}>
              {t("dashboard.outgoing_requests.edit_btn")}
            </button>
          )}
        </Box>
        <Paper className="paper_style">
          <Box className="d_flex_wrap">
            <Box className="container_img">
              <img src={Home1} alt="Home" />
            </Box>
            <Box className="flex_col_between">
              <Box className="title_125_700">Maktab</Box>

              <Box> {t("dashboard.prices.The_required_deposit")}</Box>

              {showEdit ? (
                <>
                  <Box sx={{ display: "flex", marginTop: "1rem" }}>
                    <Box className="changePriceBox">
                      <div className="price_percent_rial">
                        <input
                          value={price}
                          onChange={handlePriceChange}
                          style={{ outline: "none" }}
                        />
                        <span>{unit}</span>
                      </div>
                    </Box>
                    <Box className="price_or_rial">
                      <button
                        className={
                          unit === "ريال" ? "rial activePrice" : "rial"
                        }
                        onClick={() => handleUnitChange("ريال")}
                      >
                        ريال
                      </button>
                      <button
                        className={
                          unit === "%" ? "percent activePrice" : "percent"
                        }
                        onClick={() => handleUnitChange("%")}
                      >
                        %
                      </button>
                    </Box>
                  </Box>
                </>
              ) : (
                <p className="font_gray">{price}%</p>
              )}
            </Box>
          </Box>
          {showEdit && (
            <>
              <Divider sx={{ marginY: "2rem" }} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <button className="save_btn" onClick={handleSaveNewPrice}>
                  {t("dashboard.outgoing_requests.submit_btn")}
                </button>
                <button
                  className="cancel_btn"
                  onClick={() => setShowEdit(false)}
                >
                  {t("dashboard.outgoing_requests.cancel_btn")}
                </button>
              </Box>
            </>
          )}
        </Paper>
      </Paper>
    </Box>
  );
};

export default DownPrice;
