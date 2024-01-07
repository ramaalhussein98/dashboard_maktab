import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Box, Button, Paper } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import LanguageIcon from '@mui/icons-material/Language';
import "../assets/dashboard/css/language.css";
import { KSA, US } from "../assets/dashboard/icons";

const LanguageBtn = () => {
  const { i18n } = useTranslation();
  const languageRef = useRef();
  const [showPaper, setShowPaper] = useState(false);
  const toggleshowPaper = () => {
    setShowPaper(!showPaper);
  };
  const toggleLanguage = () => {
    const currentLanguage = i18n.language;
    const newLanguage = currentLanguage === "en" ? "ar" : "en";
    i18n.changeLanguage(newLanguage);
    document.documentElement.lang = newLanguage;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setShowPaper(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <Box ref={languageRef}>
      <Button onClick={toggleshowPaper}>
        <LanguageIcon sx={{ color: "black" }} />
        {/* <img src={languageImg} alt="language" style={{ width: "16px" }} /> */}
      </Button>
      {showPaper && (
        <Paper className="languagePaperBox">
          <Box onClick={toggleLanguage}>
            {i18n.language === "ar" ? "English" : "Arabic"}
          </Box>
          <img
            src={i18n.language === "ar" ? US : KSA}
            alt="us"
            className="imgFlag"
          />
        </Paper>
      )}
    </Box>
  );
};

export default LanguageBtn;
