import React, { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { Box, TextField } from "@mui/material";
import { Input } from "postcss";
import { useTranslation } from "react-i18next";

const CreditCard = () => {
  const { t, i18n } = useTranslation();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [focus, setFocus] = useState("");

  const handleInputFocus = (e) => {
    setFocus(e.target.name);
  };
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s/g, "");
    if (/^\d*$/.test(value) && value.length <= 16) {
      setCardNumber(value.replace(/(.{4})/g, "$1 ").trim());
    }
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value;
    if (value.length === 2 && expiry.length === 1) {
      value += "/";
    }
    if (value.length > 5) {
      value = value.slice(0, 5);
    }
    setExpiry(value);
  };

  const handleCvcChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,3}$/.test(value)) {
      setCvc(value);
    }
  };

  return (
    <Box sx={{ marginY: "2rem" }}>
      <Cards
        number={cardNumber}
        name={name}
        expiry={expiry}
        cvc={cvc}
        focused={focus}
      />
      <form style={{ marginTop: "1rem" }}>
        <Box className="flex_space_wrap">
          <Box
            sx={{
              width: { xs: "90%", md: "48%" },
              marginTop: "1rem",
              marginX: "auto",
            }}
          >
            <span>{t("creditCard.cardNumber")} </span>
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="0000 0000 0000 0000"
              variant="outlined"
              name="number"
              onFocus={handleInputFocus}
              className="inputCreditcard"
            />
          </Box>
          <Box
            sx={{
              width: { xs: "90%", md: "48%" },
              marginTop: "1rem",
              marginX: "auto",
            }}
          >
            <span> {t("creditCard.expireddate")} </span>
            <input
              type="text" // Keep the type as 'text' here
              value={expiry}
              onChange={handleExpiryChange}
              variant="outlined"
              placeholder="MM/YY" // Set the desired format for the placeholder
              name="expiry"
              onFocus={handleInputFocus}
              className="inputCreditcard"
            />
          </Box>
          <Box
            sx={{
              width: { xs: "90%", md: "48%" },
              marginTop: "1rem",
              marginX: "auto",
            }}
          >
            <span> CVC </span>
            <input
              type="text"
              value={cvc}
              placeholder="123"
              onChange={handleCvcChange}
              label="CVC"
              variant="outlined"
              name="cvc"
              onFocus={handleInputFocus}
              className="inputCreditcard"
            />
          </Box>
          <Box
            sx={{
              width: { xs: "90%", md: "48%" },
              marginTop: "1rem",
              marginX: "auto",
            }}
          >
            <span> {t("creditCard.cardname")}</span>
            <input
              type="text"
              value={name}
              placeholder={t("dashboard.incoming_orders.card1.label1")}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              name="name"
              onFocus={handleInputFocus}
              className="inputCreditcard"
            />
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default CreditCard;
