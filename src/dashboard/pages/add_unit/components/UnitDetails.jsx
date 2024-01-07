import { Box, Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const UnitDetails = ({ unit, dispatch, facilities }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const handlePropertyClick = (propertyId) => {
    dispatch({ type: "facilities", value: propertyId });
  };
  return (
    <div className="UnitDetailsContainer">
      <p className="UnitDetailsTitle">تفاصيل الوحدة</p>
      <div className="unitNameBox">
        <p className="unitName">اسم وحدتك</p>
        <input
          type="text"
          placeholder="ادخل اسم عقارك الذي سيظهر للضيوف"
          className="unitInput"
          value={unit.title}
          onChange={(event) =>
            dispatch({ type: "title", title: event.target.value })
          }
        />
      </div>
      <Divider sx={{ marginY: "2rem" }} />
      <div className="unitNameBox">
        <p className="unitName"> مساحة عقارك</p>
        <div className="d-flex">
          <input
            type="number"
            placeholder=" المساحة"
            className="unitInput"
            style={{ width: "6rem" }}
            value={unit.space}
            onChange={(event) =>
              dispatch({ type: "area", value: event.target.value })
            }
          />
          <span className="spanSquare">متر مربع</span>
        </div>
      </div>
      <Divider sx={{ marginY: "2rem" }} />
      <div className="unitNameBox">
        <p className="unitName"> مرافق عقارك الرئيسية</p>
        <Box
          sx={{
            display: "grid",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
          }}
        >
          {facilities.map((property) => (
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
                backgroundColor: unit.facilities.some(
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
                  color: unit.facilities.some((item) => item === property.id)
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
      </div>
    </div>
  );
};

export default UnitDetails;
