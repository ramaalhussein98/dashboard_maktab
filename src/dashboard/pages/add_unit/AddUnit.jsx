import { useEffect, useReducer, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../../assets/dashboard/css/addAds.css";
import { Box, Button, Container } from "@mui/material";
import { WhiteLogo } from "../../../assets/dashboard/logos";
import {
  OfiicesNumberDetails,
  UnitDetails,
  UnitFeatures,
  UnitPrice,
} from "./components";
import { useTranslation } from "react-i18next";
import HomeDescription from "../add_ads_folder/add_ads_components/HomeDescription";
import { HomeImagesAdd } from "../add_ads_folder/add_ads_components";

const reducerFunc = (unit, action) => {
  switch (action.type) {
    case "unit_rooms":
      if (action.sub_type === "increase") {
        console.log(action);
        const newArr = unit.unit_rooms.map((ele) => {
          if (ele.id === action.id) {
            return {
              ...ele,
              number: action.number + 1,
            };
          }
          return ele;
        });
        return {
          ...unit,
          unit_rooms: newArr,
        };
      } else if (action.sub_type === "decrease") {
        const newArr = unit.unit_rooms.map((ele) => {
          if (ele.id === action.id) {
            return {
              ...ele,
              number: action.number - 1,
            };
          }
          return ele;
        });
        return {
          ...unit,
          unit_rooms: newArr,
        };
      } else if (action.sub_type === "add") {
        const newArr = action.arr.map((ele) => {
          return {
            id: ele.id,
            number: 0,
            ar_name: ele.ar_name,
            en_name: ele.en_name,
          };
        });
        return {
          ...unit,
          unit_rooms: newArr,
        };
      }
      break;
    case "title":
      return {
        ...unit,
        title: action?.title,
      };
    case "inspector_name":
      return {
        ...unit,
        viewer_name: action.value,
      };
    case "number_phone":
      return {
        ...unit,
        viewer_phone: action.value,
      };
    case "area":
      return {
        ...unit,
        space: action.value,
      };
    case "description":
      return {
        ...unit,
        description: action.value,
      };
    case "features": {
      const filteredArr = unit.features.filter((e) => e !== action.value);

      const valueIsInArr = unit.features.indexOf(action.value);

      if (valueIsInArr > -1) {
        return {
          ...unit,
          features: filteredArr,
        };
      } else {
        return {
          ...unit,
          features: [...unit.features, action.value],
        };
      }
    }
    case "facilities": {
      const filteredArr = unit.facilities.filter((e) => e !== action.value);

      const valueIsInArr = unit.facilities.indexOf(action.value);

      if (valueIsInArr > -1) {
        return {
          ...unit,
          facilities: filteredArr,
        };
      } else {
        return {
          ...unit,
          facilities: [...unit.facilities, action.value],
        };
      }
    }
    case "prices":
      if (action.sub_type === "add") {
        const newPrices = action.array.map((ele) => {
          return {
            type_res_id: ele.id,
            status: false,
            price: "",
          };
        });
        return {
          ...unit,
          prices: newPrices,
        };
      } else if (action.sub_type === "toggleStatus") {
        const updatedPrices = unit.prices.map((price) => {
          if (price.type_res_id === action.id) {
            // Toggle the status for the matching id
            return {
              ...price,
              status: !price.status,
            };
          }
          return price;
        });

        return {
          ...unit,
          prices: updatedPrices,
        };
      } else if (action.sub_type === "priceChange") {
        const updatedPrices = unit.prices.map((price) => {
          if (price.type_res_id === action.id) {
            // Toggle the status for the matching id
            return {
              ...price,
              price: action.value,
            };
          }
          return price;
        });

        return {
          ...unit,
          prices: updatedPrices,
        };
      }
      break;
    case "downPayment":
      return {
        ...unit,
        down_payment: action.value,
      };
    case "thumbnail":
      return {
        ...unit,
        thumbnail: action.value,
      };
    case "video":
      return {
        ...unit,
        video: action.value,
      };
    case "images":
      return {
        ...unit,
        images: [...unit.images, action.value],
      };
    case "unit":
      return {
        ...unit,
        type_down_payment: action.value,
      };
  }

  throw Error("Unknown action: " + action.type);
};

const AddUnit = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const searchData = JSON.parse(localStorage.getItem("searchData"));
  const roomDetails = JSON.parse(localStorage.getItem("roomDetails"));
  const unitsFeatures = JSON.parse(localStorage.getItem("unitsFeatures"));
  const unitsFacilities = JSON.parse(localStorage.getItem("unitsFacilities"));
  const { state } = location;
  const unitId = state && state.id;
  const unitTitle = state && state.title;

  const [unitsOptions, setUnitsOptions] = useState({
    categories: searchData?.categories,
    type_res: searchData?.type_res,
    typeAqars: searchData?.type_aqars,
    officeFeatures: searchData?.features,
    interfaces: searchData?.interface_aqars,
    facilities: unitsFacilities,
    roomDetails,
    unitsFeatures,
  });

  const [unit, dispatch] = useReducer(reducerFunc, {
    title: "",
    ads_id: unitId,
    viewer_name: "",
    viewer_phone: "",
    description: "",
    space: "",
    features: [],
    facilities: [],
    prices: [],
    unit_rooms: [],
    down_payment: "",
    type_down_payment: "",
    video: "",
    thumbnail: "",
    images: [],
  });
  console.log(unit);
  const [step, setStep] = useState(1);
  const [isLastStep, setIsLastStep] = useState();
  const [afterWidth, setAfterWidth] = useState(12.5);
  const [error, setError] = useState(false);
  const [images, setImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [readyImages, setReadyImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const hasPrevStep = step > 1;

  const handleNext = () => {
    setStep(step + 1);
    setAfterWidth(afterWidth + 12.5);
  };
  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
      setAfterWidth(afterWidth - 12.5);
    }
  };

  useEffect(() => {
    step === 8 ? setIsLastStep(10) : setIsLastStep(null);
  }, [step]);

  const renderStep = () => {
    //render both steps

    switch (step) {
      case 1:
        return (
          <UnitDetails
            unit={unit}
            dispatch={dispatch}
            facilities={unitsOptions.facilities}
          />
        );
      case 2:
        return (
          <OfiicesNumberDetails
            unit={unit}
            dispatch={dispatch}
            roomDetails={unitsOptions.roomDetails}
          />
        );
      case 3:
        return (
          <UnitFeatures
            unit={unit}
            dispatch={dispatch}
            features={unitsOptions.unitsFeatures}
          />
        );
      case 4:
        return <HomeDescription state={unit} dispatch={dispatch} />;
      case 5:
        return (
          <UnitPrice
            state={unit}
            dispatch={dispatch}
            type={0}
            pricesTypes={unitsOptions.type_res}
          />
        );
      case 6:
        return (
          <HomeImagesAdd
            step={step}
            images={images}
            setImages={setImages}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            deletedImages={deletedImages}
            setDeletedImages={setDeletedImages}
            readyImages={readyImages}
            setReadyImages={setReadyImages}
            state={unit}
            dispatch={dispatch}
          />
        );
      // case 7:
      //   return <MapAds />;
      // case 8:
      //   <ConfimLocation unit={unit} dispatch={dispatch} />;
      //   break;
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    console.log("ji");
  };

  return (
    <>
      <Box
        className="imgAddADsContainer"
        sx={{
          display: { xs: "none", lg: "block" },

          height: { xs: "calc(100vh - 125px)", md: "100vh" },
        }}
      >
        <img src={WhiteLogo} alt="logo" className="imgAddAds" />
        <p className="unitTiltle">تسجيل وحدة جديدة</p>
        <p className="unitTiltle2">للعقار: {unitTitle}</p>
      </Box>
      <Container
        sx={{ padding: { xs: "0" }, marginTop: { xs: "0rem", sm: "2rem" } }}
      >
        <Box
          className="addads-continer-box1"
          sx={{
            marginBlockStart: { xs: "0px", sm: "40px" },
            marginLeft: { lg: "1%" },
          }}
        >
          <Box sx={{ height: "100%" }}>
            <Box
              className="addads-continer-box2"
              sx={{
                borderRadius: { xs: "0", sm: "12px 12px 0px 0px" },
                paddingInline: { xs: "15px", md: "3%" },
                height: { xs: "100vh", sm: "calc(-40px + 100vh)" },
              }}
            >
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "var(--green-color)",
                  textAlign: lang === "ar" ? "right" : "left",
                }}
              >
                {t("dashboard.contract.Backtomainpage")}
              </Link>

              {/* Render the current step */}
              {renderStep()}
            </Box>
            <Box
              className="addads-custom-container"
              sx={{
                "&:after": {
                  width: `${afterWidth}%`,
                },
              }}
            >
              <Box className="custom-inner-element ">
                <Box
                  className="custom-flex-reverse-container"
                  sx={{
                    gap: { xs: "18px", md: "1rem 70px" },
                  }}
                >
                  {/* Prev and Next buttons */}
                  {step >= 1 && (
                    <Button
                      className="button-prev"
                      onClick={handlePrev}
                      disabled={!hasPrevStep}
                      sx={{
                        color: hasPrevStep
                          ? "var(--green-color)"
                          : "rgba(0, 0, 0, 0.26))",

                        border: `1px solid ${
                          hasPrevStep
                            ? "var(--green-color)"
                            : "rgba(0, 0, 0, 0.12)"
                        }`,
                        pointerEvents: hasPrevStep ? "auto" : "none",
                        "&:hover": {
                          background: "rgb(255, 255, 255)",
                          color: hasPrevStep
                            ? "var(--green-color)"
                            : "rgba(0, 0, 0, 0.26)",
                          transform: hasPrevStep ? "scale(1.02)" : "none",
                          transition: "transform 0.2s ease-in-out",
                        },
                      }}
                    >
                      {t("dashboard.new_order.main_btn2")}
                    </Button>
                  )}
                  {!isLastStep && (
                    <Button
                      className="button-next"
                      onClick={handleNext}
                      // disabled={loadingSubmit || hasNextStep || error}
                    >
                      {t("dashboard.new_order.main_btn1")}
                    </Button>
                  )}
                  {isLastStep && (
                    <Button
                      className="button-last"
                      onClick={handleSubmit}
                      disabled={error}
                    >
                      {t("dashboard.new_order.main_btn3")}
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default AddUnit;
