// OfficeBoxNumbers.jsx
import { Box, Paper } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const OfficeBoxNumbers = ({
  title,
  numbers,
  dispatch,
  state,
  ar_name,
  en_name,
  status,
}) => {
  const [showMoreNumberBox, setShowMoreNumberBox] = useState(false);
  const [selectedBox, setSelectedBox] = useState(() => {
    const existingObject = state?.details.find(
      (obj) => obj.en_name === en_name
    );
    return existingObject ? existingObject.number_details - 1 : null;
  });
  const { t } = useTranslation();
  const handleBoxClick = (number, index) => {
    if (selectedBox === index) {
      setSelectedBox(null);
      dispatch({
        type: "details",
        data: {
          type: "remove",
          object: {
            ar_name: ar_name,
            en_name: en_name,
            status: status,
            number_details: number,
          },
        },
      });
    } else {
      setSelectedBox(index);
      dispatch({
        type: "details",
        data: {
          type: "add",
          object: {
            ar_name: ar_name,
            en_name: en_name,
            status: status,
            number_details: number,
          },
        },
      });
    }
    if (showMoreNumberBox && index < 5) {
      setShowMoreNumberBox(false);
    }
  };

  return (
    <Box>
      <span style={{ fontWeight: "500" }}>{title}</span>
      <div className="BoxNumberDetails">
        {numbers.map((number, index) => (
          <Box
            key={index}
            onClick={() => handleBoxClick(number, index)}
            className={
              selectedBox === index ? "selectedBox BoxStyle" : "BoxStyle"
            }
          >
            {number}
          </Box>
        ))}
        <div style={{ position: "relative" }}>
          <Box
            className="BoxStyle moreBox"
            onClick={() => setShowMoreNumberBox(!showMoreNumberBox)}
          >
            {t("dashboard.contract.more")}
          </Box>
          {showMoreNumberBox && (
            <Paper className="moreNumberBox">
              {[6, 8, 9, "+10"].map((number, index) => (
                <div
                  key={index}
                  onClick={() => handleBoxClick(number, index + 5)}
                  className={
                    selectedBox === index + 5
                      ? "selectedBox BoxStyleMore"
                      : "BoxStyleMore"
                  }
                >
                  <Box sx={{ width: "100%" }}>{number}</Box>
                </div>
              ))}
            </Paper>
          )}
        </div>
      </div>
    </Box>
  );
};

export default OfficeBoxNumbers;
