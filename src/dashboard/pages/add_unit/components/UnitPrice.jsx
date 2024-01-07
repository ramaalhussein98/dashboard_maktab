import React, { useEffect, useState } from "react";
import { Divider, Switch, TextField } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import { useTranslation } from "react-i18next";

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "var(--green-color)",
    "&:hover": {
      backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "var(--green-color)",
  },
}));

const UnitPrice = ({
  state,
  dispatch,
  pricesTypes,
  type,
  parseFormattedNumber,
}) => {
  console.log(state);
  const isEditMode = type === 1;
  const isAddMode = type === 0;
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const [selectedUnit, setSelectedUnit] = useState(state.type_down_payment);

  useEffect(() => {
    dispatch({ type: "prices", sub_type: "add", array: pricesTypes });
  }, []);

  const handleToggleSwitch = (id) => {
    dispatch({ type: "prices", sub_type: "toggleStatus", id });
  };

  const handleInputChange = (id, value) => {
    dispatch({ type: "prices", sub_type: "priceChange", id, value });
  };

  const toggleUnit = (value) => {
    setSelectedUnit(value);
  };

  useEffect(() => {
    const unit = selectedUnit === "%" ? "percent" : "rial";
    dispatch({ type: "unit", value: unit });
  }, [selectedUnit]);

  const hadleVeiwerDetailsChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: name, value });
  };

  return (
    <>
      <div className="UnitDetailsContainer">
        <p className="UnitDetailsTitle">أسعار الوحدة</p>
        <span className="gary-color" style={{ width: "90%" }}>
          اكتب أسعار عقارك الأساسية تقدر تعدل الأسعار ونضيف عروض وخصومات لاحقا{" "}
        </span>
      </div>
      {/* for add section*/}
      {isAddMode &&
        state?.prices?.map((price) => {
          const matchedObj = pricesTypes?.find(
            (ele) => ele.id === price.type_res_id
          );
          return (
            <div key={matchedObj.id} className="CheckedBoxContainer">
              <p className="priceTitle">
                {lang === "ar" ? matchedObj?.ar_name : matchedObj?.en_name}
              </p>
              <input
                type="number"
                className="priceInput"
                value={price.price}
                onChange={(e) =>
                  handleInputChange(matchedObj.id, e.target.value)
                }
              />
              <GreenSwitch
                className="Switch1"
                checked={price.status}
                onChange={() => handleToggleSwitch(matchedObj.id)}
              />
            </div>
          );
        })}
      {/* for edit section*/}
      {isEditMode &&
        state?.prices?.map((price) => {
          return (
            <div key={price.type_res_id} className="CheckedBoxContainer">
              <p className="priceTitle">
                {lang === "ar" ? price?.ar_name : price?.en_name}
              </p>
              <input
                type="number"
                className="priceInput"
                value={parseFormattedNumber(price.price)}
                onChange={(e) =>
                  handleInputChange(price.type_res_id, e.target.value)
                }
              />
              <GreenSwitch
                className="Switch1"
                checked={price.status}
                onChange={() => handleToggleSwitch(price.type_res_id)}
              />
            </div>
          );
        })}
      <Divider sx={{ marginY: "1rem" }} />
      {/* <button onClick={logValues}>Log Values</button> */}
      <div className="CheckedBoxContainer">
        <p className="priceTitle">العربون</p>
        <div className="raabon">
          <input
            type="number"
            style={{
              width: "100%",
            }}
            value={state?.down_payment}
            className="priceInput"
            onChange={(e) =>
              dispatch({ type: "downPayment", value: e.target.value })
            }
          />
          <span className="span1">
            <span
              style={{
                backgroundColor: selectedUnit === "rial" ? "#eee" : "white",
              }}
              onClick={() => toggleUnit("rial")}
            >
              {lang === "ar" ? "ر.س" : "rial"}
            </span>
            <span
              style={{
                backgroundColor: selectedUnit === "percent" ? "#eee" : "white",
              }}
              onClick={() => toggleUnit("percent")}
            >
              %
            </span>
          </span>
        </div>
      </div>

      <label
        htmlFor="my-text-field"
        style={{ fontWeight: "500", marginBottom: "4px" }}
      >
        {lang === "ar" ? "اسم المعاين" : "inspector name "}
      </label>
      <TextField
        id="my-text-field"
        type="text"
        name="inspector_name"
        value={state?.viewer_name || ""}
        onChange={hadleVeiwerDetailsChange}
        size="small"
        // placeholder={t("dashboard.new_order.order_info.placeholder1")}
        sx={{
          width: "100%",
          borderRadius: "12px",
          marginBottom: "6px",
          textAlign: lang === "ar" ? "right" : "left",
          "&[readonly]": {
            backgroundColor: "lightgray",
            color: "darkgray",
          },
        }}
      />
      <label
        htmlFor="my-text-field"
        style={{ fontWeight: "500", marginBottom: "4px" }}
      >
        {lang === "ar" ? "رقم الهاتف" : "mobile number"}
      </label>
      <TextField
        id="my-text-field"
        type="text"
        name="number_phone"
        value={state?.viewer_phone || ""}
        onChange={hadleVeiwerDetailsChange}
        size="small"
        // placeholder={t("dashboard.new_order.order_info.placeholder1")}
        sx={{
          width: "100%",
          borderRadius: "12px",
          marginBottom: "6px",
          textAlign: lang === "ar" ? "right" : "left",
          "&[readonly]": {
            backgroundColor: "lightgray",
            color: "darkgray",
          },
        }}
      />
    </>
  );
};

export default UnitPrice;
