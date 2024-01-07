import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

const CounterNumbers = () => {
  const { t } = useTranslation();
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [number3, setNumber3] = useState(0);
  const [number4, setNumber4] = useState(0);

  const props1 = useSpring({ number1, from: { number1: 0 } });
  const props2 = useSpring({ number2, from: { number2: 0 } });
  const props3 = useSpring({ number3, from: { number3: 0 } });
  const props4 = useSpring({ number4, from: { number4: 0 } });

  // Update the numbers to your desired values and handle when to trigger the animations
  React.useEffect(() => {
    setNumber1(50);
    setNumber2(8);
    setNumber3(5);
    setNumber4(20);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",

          alignItems: "center",
        }}
      >
        <p className="text-xl">
          حيا الله <span className="font-bold text-primary">وائل الديري</span>
        </p>
        <p style={{ fontWeight: "bold", color: "var(--main-color)" }}>
          أهلا بك في مكتب
        </p>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontWeight: "500" }}>
          {t("dashboard.homepage.Numberoftenants")}
        </div>
        <animated.div
          style={{
            color: "var(--green-color)",
            fontWeight: "600",
            fontSize: "40px",
          }}
        >
          {props1.number1.interpolate((val) => Math.floor(val))}
        </animated.div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontWeight: "500" }}>
          {t("dashboard.homepage.Numberofinvoices")}
        </div>
        <animated.div
          style={{ color: "black", fontWeight: "600", fontSize: "40px" }}
        >
          {props2.number2.interpolate((val) => Math.floor(val))}
        </animated.div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontWeight: "500" }}>
          {t("dashboard.homepage.Numberofcontracts")}
        </div>
        <animated.div
          style={{ color: "red", fontWeight: "600", fontSize: "40px" }}
        >
          {props3.number3.interpolate((val) => Math.floor(val))}
        </animated.div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontWeight: "500" }}>
          {t("dashboard.homepage.Youroutstandingbalance")}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <animated.div
            style={{
              color: "var(--green-color)",
              fontWeight: "600",
              fontSize: "40px",
            }}
          >
            {props4.number4.interpolate((val) => Math.floor(val))}
          </animated.div>{" "}
          <span
            style={{
              fontWeight: "600",
              fontSize: "20px",
            }}
          >
            {t("Rial")}
          </span>
        </div>
      </div>
    </Box>
  );
};

export default CounterNumbers;
