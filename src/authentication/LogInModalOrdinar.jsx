import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { KSA } from "../assets/dashboard/icons";
import { useTranslation } from "react-i18next";
import { myAxios } from "../api/myAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import axios from "axios";

// import { useAxiosConfig } from "../context/AxiosContext ";
import "../assets/dashboard/css/login.css";
import useDataFetcher from "../api/useDataFetcher ";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MobileScreenShareIcon from "@mui/icons-material/MobileScreenShare";
import UserContext from "../context/userContext";
import { useStateContext } from "../context/userContext";

const LogInModalOrdinar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOTP] = useState("");
  const [isValidOTP, setIsValidOTP] = useState(false);
  const [isOTPInvalid, setIsOTPInvalid] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [codeReceived, setCodeReceived] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [timer, setTimer] = useState(180);
  const [isCounterActive, setIsCounterActive] = useState(true);
  // const { setToken } = useAxiosConfig();
  const { data, isLoading, error, get, post } = useDataFetcher();
  const [loginMethod, setLoginMethod] = useState("");
  const { token, user, setUser, setTokenFun } = useStateContext();
  // const { setIsUserUpdated, setUserNameContext } = useContext(UserContext);
  // const { setIsUserUpdated } = useContext(UserContext);
  useEffect(() => {
    validatePhoneNumber();
  }, [phoneNumber]);
  const handleLoginMethod = (method) => {
    setLoginMethod(method);
    setStep(2); // Move to step 2 (OTP verification)
    setOTP(["", "", "", ""]); // Reset OTP input
    setIsValidOTP(false); // Reset OTP validation
    setResendDisabled(true); // Disable "Resend" button
    setResendCountdown(5); // Start the countdown
    setCodeReceived(false); // Reset the code received state

    // Make API call based on the chosen method (SMS or WhatsApp)
    try {
      const res = myAxios.post("api/v1/ordinaries/login", {
        type_message: method,
        phone: phoneNumber,
      });
    } catch (err) {
      // Handle API call error
    }
  };
  const renderLoginMethodStep = () => {
    return (
      <Box>
        <Typography>{t("loginmodal.choose_login_method")}</Typography>
        <Box sx={{ marginY: "2rem" }}>
          <Button
            className="whats"
            onClick={() => handleLoginMethod("whatsapp")}
          >
            <WhatsAppIcon className="svg1" />
            {t("loginmodal.whatsapp_option")}
          </Button>
          <Button
            onClick={() => handleLoginMethod("sms")}
            className="sms"
            sx={{ marginRight: "1rem" }}
          >
            <MobileScreenShareIcon className="svg1" />
            {t("loginmodal.sms_option")}
          </Button>
        </Box>
      </Box>
    );
  };
  const validatePhoneNumber = () => {
    const saudiNumberRegex = /^(05[0-9]{8}|5[0-9]{8})$/;
    const isValid = saudiNumberRegex.test(phoneNumber);
    setIsValidPhoneNumber(isValid);
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setPhoneNumber(newValue);
    setIsDisabled(false); // i add this to can rewrite the phone number unable disabled
    //  setTimeout(validatePhoneNumber, 300); // Call the debounceValidation after a delay when adding characters
  };

  const verifyOTP = async (e) => {
    // e.target.disabled = true;
    try {
      const res = await myAxios.post("api/v1/ordinaries/checkCode", {
        phone: phoneNumber,
        code: otp,
      });

      if (res.data.status === false) {
        toast.error(res.data.message);
        setIsDisabled(false);

        // navigate("/userDashbored");
      } else {
        toast.success(res?.data?.message);
        // console.log(res?.data.data.access_token);

        // localStorage.setItem("user_token", res?.data?.data?.access_token);
        localStorage.setItem("user_type", "ordinary");
        setTokenFun(res?.data?.data?.access_token);

        console.log("sucess");
        // const res2 = await myAxios.get("api/v1/ordinaries/profile"
        // , {
        //   headers: {
        //     apiKey: "3YMh-YqHw-x6xY-G1n4-UtsW-lFVm",
        //     authorization: `Bearer ${res?.data?.data?.access_token}`,
        //   },

        // setToken(res?.data?.data?.access_token);
        setIsDisabled(true);
        setTimeout(() => {
          navigate("/dashboard/my_info");
        }, 1000);
        // const res2 = await myAxios.get("/api/v1/user/profile");

        // const res2 = await axios.get(
        //   "https://dashboard.maktab.sa/api/v1/user/profile",
        //   {
        //     headers: {
        //       authorization: `Bearer ${res?.data?.access_token}`,
        //     },
        //   }
        // );

        // if (res2) {
        // setIsUserUpdated((prev) => prev + 1);

        // localStorage.setItem("userMembership", res2.data.user.membership_id);
        // localStorage.setItem("userId", res2.data?.user.id);
        // setUserNameContext(res2.data?.user.username);
        // setUserId(res2.data?.user.id);
        //   setTimeout(() => {
        //     navigate("/");
        //   }, 1000);
        // }
        // localStorage.setItem("user_token", res.data.access_token);
        // nav("/dashboard/home");
        // toast.success(res.data.message);
      }
    } catch (err) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      renderLoginMethodStep();
      setStep(3);
    } else if (step === 3) {
      // Handle logic for step 2 (OTP verification)
      verifyOTP();
    }
  };
  // useEffect(() => {
  //   // Automatically submit the form when the last OTP input is filled and OTP is valid
  //   if (step === 2 && otp.length === 4 && isValidOTP) {
  //     verifyOTP();
  //   }
  // }, [step, otp, isValidOTP]);

  const handleBack = () => {
    setStep(step - 1);
    setOTP("");
  };

  useEffect(() => {
    let countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          //console.log("finished");
          // try {
          //   const res = myAxios.post("/api/changeCode", {
          //     phone: phoneNumber,
          //   });
          //   console.log(res);
          // } catch (err) {
          //   console.log(err);
          // }
          setIsCounterActive(false);
          clearInterval(countdown);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => {
      clearInterval(countdown);
      setTimer(10);
      // after i change this to 180
    };
  }, [step, isCounterActive]);

  const handleResend = async () => {
    setIsCounterActive(true);
    //console.log(resend a gain)
    try {
      const res = await myAxios.post("api/v1/ordinaries/changeCode", {
        phone: phoneNumber,
      });
    } catch (err) {}
  };

  const formattedTime = `${Math.floor(timer / 60)
    .toString()
    .padStart(2, "0")}:${(timer % 60).toString().padStart(2, "0")}`;

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="LoginContaier">
        {step > 1 && (
          <Button
            className="btnBack"
            onClick={handleBack}
            sx={{
              textAlign: lang === "ar" ? "right" : "left",
            }}
          >
            {t("loginmodal.back_btn")}
          </Button>
        )}

        <Typography variant="h5" className="font_bold">
          {step === 1
            ? t("loginmodal.title2")
            : step === 2
            ? t("loginmodal.title_two")
            : t("loginmodal.title_three")}
        </Typography>
        <Typography sx={{ marginY: "1rem" }}>
          {step === 1 ? t("loginmodal.desc") : ""}
        </Typography>

        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
          {step === 1 && (
            <Box className="stepOneContainer">
              <Box className="stepOneinside">
                <label htmlFor="phoneNumber" className="phoneNumberLabel">
                  {t("loginmodal.input_label")}
                </label>
                <div className="ksaLogo">
                  <img src={KSA} alt="ksa" />
                </div>
                <TextField
                  id="phoneNumber"
                  type="text"
                  placeholder="051 2345 678"
                  value={phoneNumber}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {/* <PhoneIcon /> */}
                      </InputAdornment>
                    ),
                    inputMode: "numeric",
                  }}
                  sx={{
                    direction: "ltr",
                    border: "none",
                    width: "100%",
                    borderRadius: "10px",
                    marginTop: "-1rem",

                    "& fieldset": {
                      border: "none",
                    },
                    "& input[type=number]": {
                      MozAppearance: "textfield",
                    },
                    ".MuiInputBase-input": {
                      fontSize: "20px",
                      fontWeight: "700",
                    },
                    "& ::placeholder": {
                      fontSize: "20px",
                      fontWeight: "700",
                    },
                  }}
                />
              </Box>
            </Box>
          )}
          {step === 2 && renderLoginMethodStep()}
          {step === 3 && (
            <Box className="d_flex_space" sx={{ marginY: "2rem" }}>
              <Typography>
                {t("loginmodal.sended_message") + ` ` + phoneNumber}
              </Typography>
              {isOTPInvalid && (
                <Typography color="error">
                  {t("loginmodal.error_message")}
                </Typography>
              )}
            </Box>
          )}
          <Box className="d_flex_center">
            {step === 3 && (
              <Box className="steptwoConteiner">
                {Array.from({ length: 4 }).map((_, index) => {
                  const inputIndex = index;
                  return (
                    <TextField
                      key={index}
                      type="text"
                      value={otp[inputIndex] || ""}
                      onChange={(e) => {
                        const updatedOTP = [...otp];
                        updatedOTP[inputIndex] = e.target.value;
                        setOTP(updatedOTP.join(""));
                        setIsValidOTP(updatedOTP.join("").length === 4);

                        if (e.target.value && index < 3) {
                          const nextInput = document.getElementById(
                            `otp-input-${index + 1}`
                          );
                          nextInput && nextInput.focus();
                        }
                      }}
                      inputProps={{
                        maxLength: 1,
                        inputMode: "numeric",
                      }}
                      autoFocus={index === 0}
                      id={`otp-input-${index}`}
                      sx={{
                        width: "60px",
                        marginLeft: "0.5rem",
                        borderRadius: "12px",
                        "& input": {
                          textAlign: "center",
                          fontSize: "20px",
                          padding: "12px !important",
                          boxShadow: "1",
                          borderRadius: "12px",
                        },
                        "& .MuiInputBase-root": {
                          borderRadius: "12px",
                        },
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": {
                            borderColor: "#14b183",
                            paddingLeft: "30px",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#14b183",
                            color: "#171718",
                          },
                          "& .MuiInputBase-input-MuiOutlinedInput-input": {},
                        },
                      }}
                    />
                  );
                })}
              </Box>
            )}
          </Box>
          <Box className="d_flex_space">
            <Button
              type="submit"
              className="btnLoginSubmit"
              sx={{
                backgroundColor:
                  step === 1 && isValidPhoneNumber
                    ? "var(--green-color)"
                    : step === 2 && loginMethod
                    ? "var(--green-color)"
                    : isValidOTP
                    ? "var(--green-color)"
                    : "rgba(0, 0, 0, 0.12)",
                color:
                  step === 1 && isValidPhoneNumber
                    ? "white"
                    : step === 2 && loginMethod
                    ? "white"
                    : isValidOTP
                    ? "white"
                    : "rgba(0, 0, 0, 0.26)",
                "&:hover": {
                  color:
                    step === 1 && isValidPhoneNumber
                      ? "white"
                      : step === 2 && loginMethod
                      ? "white"
                      : isValidOTP
                      ? "white"
                      : "rgba(0, 0, 0, 0.26)",
                  backgroundColor:
                    step === 1 && isValidPhoneNumber
                      ? "var(--green-color)"
                      : step === 2 && loginMethod
                      ? "var(--green-color)"
                      : isValidOTP
                      ? "var(--green-color)"
                      : "rgba(0, 0, 0, 0.12)",
                },
              }}
            >
              {step === 1 || step === 2
                ? t("loginmodal.submit_btn")
                : t("loginmodal.submit_btn_2")}
            </Button>
          </Box>

          {step === 1 && (
            <Typography>
              {t("loginmodal.hint")}
              <b> {t("loginmodal.bold_hint")}</b>
            </Typography>
          )}

          {step === 2 && (
            <Box>
              {isCounterActive && (
                <Typography>
                  ({formattedTime} {t("loginmodal.seconds")})
                </Typography>
              )}
              {!isCounterActive && (
                <Button onClick={handleResend} sx={{ color: "black" }}>
                  {t("loginmodal.message")}
                </Button>
              )}
            </Box>
          )}
        </form>
      </Box>
    </Modal>
  );
};

export default LogInModalOrdinar;
