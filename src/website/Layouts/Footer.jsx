import React from "react";
import "../../assets/dashboard/css/layout.css";
import { Box, Container } from "@mui/material";
import LanguageBtn from "../../ui/LanguageBtn";
import { Twitter, FaceBook, Insatgram } from "../../assets/dashboard/icons";
import { Appstore, Googleplay } from "../../assets/dashboard/images";
import { Link } from "react-router-dom";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ContactsIcon from "@mui/icons-material/Contacts";
const settingData = JSON.parse(localStorage.getItem("settingData"));
const UlFirst = [
  {
    url: "/",
    label: "الرئيسية",
  },
  {
    url: "/all_deals",
    label: "جميع الإعلانات ",
  },
];
const UlThird = [
  {
    url: "#",
    label: "غرفة الأخبار ",
  },
  {
    url: "#",
    label: "ميزات جديدة ",
  },
  {
    url: "#",
    label: " الوظائف ",
  },
];
const SocailMediaLInks = [
  {
    src: "",
    icon: Insatgram,
  },
  {
    src: "",
    icon: Twitter,
  },
  {
    src: "",
    icon: FaceBook,
  },
];
const Footer = () => {
  return (
    <Box className="footerContainer">
      <Container
        sx={{
          maxWidth: "1400px !important",
          padding: { xs: "0px", sm: "24px" },
        }}
      >
        <Box className="FooterBox1">
          <section className="FooterSection">
            <span className="title">الدعم</span>
            <ul>
              <li style={{ margin: "10px 0px" }}>
                <Link to="/contact-us">
                  <ContactsIcon sx={{ marginLeft: "5px" }} />
                  <span>اتصل بنا</span>
                </Link>
              </li>
              <li style={{ margin: "10px 0px" }}>
                <span>
                  <PhoneIcon sx={{ marginLeft: "5px" }} />
                  {settingData?.contact_t3}
                </span>
              </li>
              <li style={{ margin: "10px 0px" }}>
                <span>
                  <EmailIcon sx={{ marginLeft: "5px" }} />
                  {settingData?.site_webmails}
                </span>
              </li>
            </ul>
          </section>
          <section className="FooterSection">
            <span className="title">الأقسام</span>
            <ul>
              {UlFirst.map((ele, index) => (
                <li key={index} style={{ margin: "10px 0px" }}>
                  <Link to={ele.url}>
                    <span>{ele.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section className="FooterSection">
            <span className="title">Maktab</span>
            <ul>
              {UlThird.map((ele, index) => (
                <li key={index} style={{ margin: "10px 0px" }}>
                  <a href={ele.url} />
                  <span>{ele.label}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="FooterSection">
            <span className="title">حمل الان</span>
            <ul>
              <li style={{ margin: "10px 0px" }}>
                <a href="#">
                  <img src={Googleplay} style={{ marginBottom: "10px" }} />
                </a>
                <a href="#">
                  <img src={Appstore} />
                </a>
              </li>
            </ul>
          </section>
        </Box>
        <Box className="FooterBox2">
          <div className="div1">
            <Box className="copyRightBox">© 2023 Maktab, Inc.</Box>
            <Box className="LanguageBox">
              <LanguageBtn />
              <ul className="socialmediaUl">
                {SocailMediaLInks.map((ele, index) => (
                  <li key={index} className="li1">
                    <a href={ele.src}>
                      <img src={ele.icon} style={{ width: "18px" }} />
                    </a>
                  </li>
                ))}
              </ul>
            </Box>
          </div>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
