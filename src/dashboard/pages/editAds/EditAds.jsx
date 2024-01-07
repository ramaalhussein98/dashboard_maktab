import { useEffect, useReducer, useState } from "react";
import { Button, Container, Box } from "@mui/material";
import {
  HomeImagesAdd,
  HomeDetails,
  HomeInformation,
  CatgouryAds,
  ConfimLocation,
  MapAds,
  HomeDescription,
  OfficeDetailsNumbers,
} from "./editAdsComponents";
import Services from "./editAdsComponents/services/Services";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { WhiteLogo } from "../../../assets/dashboard/logos";
import AddLicensedAdvertising from "./editAdsComponents/AddLicensedAdvertising";
import "../../../assets/dashboard/css/addAds.css";
import UnitPrice from "../add_unit/components/UnitPrice";
import myAxios from "../../../api/myAxios";
import { toast } from "react-toastify";

const reducerFunc = (state, action) => {
  switch (action.type) {
    case "license_number":
      return {
        ...state,
        license_number: action.value,
      };
    case "title":
      return {
        ...state,
        title: action?.title,
      };
    case "categoryId":
      return {
        ...state,
        category_id: action.categoryId,
      };
    case "inspector_name":
      return {
        ...state,
        viewer_name: action.value,
      };
    case "number_phone":
      return {
        ...state,
        viewer_phone: action.value,
      };
    case "advertiserRelationship":
      if (action.value !== "option3") {
        return {
          ...state,
          advertiser_relationship: action.value,
          advertiser_relationship_type: "",
        };
      } else {
        return {
          ...state,
          advertiser_relationship: action.value,
        };
      }
    case "advertiser_relationship_type":
      return {
        ...state,
        advertiser_relationship_type: action.value,
      };
    case "aqarTypeId":
      return {
        ...state,
        type_aqar_id: action.value,
      };
    case "width":
      return {
        ...state,
        width: action.value,
      };
    case "height":
      return {
        ...state,
        height: action.value,
      };
    case "area":
      return {
        ...state,
        area: action.value,
      };
    case "furnished":
      return {
        ...state,
        furnished: action.value,
      };
    case "details":
      if (action.data.type === "remove") {
        // Remove the object with the same en_name
        const updatedDetails = state.details.filter(
          (obj) => obj.en_name !== action.data.object.en_name
        );

        return {
          ...state,
          details: updatedDetails,
        };
      } else if (action.data.type === "add") {
        // Check if the array already contains an object with the same en_name
        const existingObjectIndex = state.details.findIndex(
          (obj) => obj.en_name === action.data.object.en_name
        );

        if (existingObjectIndex !== -1) {
          // If the object with the same en_name exists, update its values
          const updatedDetails = state.details.map((obj, index) => {
            if (index === existingObjectIndex) {
              return {
                ...obj,
                // Update the properties you want to change here
                status: action.data.object.status,
                number_details: action.data.object.number_details,
              };
            }
            return obj;
          });

          return {
            ...state,
            details: updatedDetails,
          };
        } else {
          // If the object with the same en_name doesn't exist, add it
          return {
            ...state,
            details: [...state.details, action.data.object],
          };
        }
      }
      break;
    case "description":
      return {
        ...state,
        description: action.value,
      };
    case "features":
      if (action.sub_type === "add") {
        const filteredArr = state.features.filter(
          (e) => Number(e?.feature_id) !== action.value
        );

        const valueIsInArr2 = state.features.findIndex(
          (ele) => Number(ele?.feature_id) === action.value
        );

        if (valueIsInArr2 > -1) {
          return {
            ...state,
            features: filteredArr,
          };
        } else {
          return {
            ...state,
            features: [...state.features, { feature_id: action.value }],
          };
        }
      } else if (action.sub_type === "initial") {
        return {
          ...state,
          features: action.array,
        };
      }
      break;
    case "services":
      if (action.sub_type === "add") {
        return {
          ...state,
          services: [
            ...state.services,
            {
              id: Math.floor(Math.random() * 100) + 1,
              ar_name: "",
              en_name: "",
              price: "",
              service_toggle: true,
              status: false,
              type: "random",
            },
          ],
        };
      } else if (action.sub_type === "remove") {
        const updatedBoxes = [...state.services];
        updatedBoxes.splice(action.index, 1);
        return {
          ...state,
          services: updatedBoxes,
        };
      } else if (action.sub_type === "toggle") {
        const updatedBoxes = [...state.services];
        updatedBoxes[action.index].service_toggle = action.toggleNewVal;

        return {
          ...state,
          services: updatedBoxes,
        };
      } else if (action.sub_type === "changeService") {
        const updatedServices = [...state.services];
        const { name, value } = action;
        const indexToUpdate = action.index;

        if (indexToUpdate !== -1) {
          // Update the specific property
          updatedServices[indexToUpdate][name] = value;

          return {
            ...state,
            services: updatedServices,
          };
        }
      }
      break;
    case "mapClick":
      return {
        ...state,
        lat: action.clickedPosition.lat,
        lng: action.clickedPosition.lng,
        zoom: action.clickedPosition.zoom,
      };
    case "city":
      return {
        ...state,
        city: action.value,
      };
    case "neighborhood":
      return {
        ...state,
        neighborhood: action.value,
      };
    case "street":
      return {
        ...state,
        street: action.value,
      };
    case "interfaceId":
      return {
        ...state,
        interface_id: action.value,
      };
    case "prices":
      if (action.sub_type === "add") {
        const pricesArray = state.prices;
        const newPrices = action?.array.map((typeResItem) => {
          const priceItem = pricesArray?.find(
            (item) => item.type_res_id === typeResItem.id.toString()
          );
          if (priceItem) {
            return {
              ...priceItem,
              en_name: typeResItem.en_name,
              ar_name: typeResItem.ar_name,
              status: typeResItem.status === "1" ? true : false,
            };
          } else {
            const status = state?.prices?.find(
              (e) => e.type_res_id === typeResItem.id
            )?.status;
            return {
              price: "",
              status: status || false,
              type_res_id: typeResItem.id.toString(),
              en_name: typeResItem.en_name,
              ar_name: typeResItem.ar_name,
            };
          }
        });
        console.log(newPrices);
        return {
          ...state,
          prices: newPrices,
        };
      } else if (action.sub_type === "toggleStatus") {
        const updatedPrices = state.prices.map((price) => {
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
          ...state,
          prices: updatedPrices,
        };
      } else if (action.sub_type === "priceChange") {
        const updatedPrices = state.prices.map((price) => {
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
          ...state,
          prices: updatedPrices,
        };
      }
      break;
    case "downPayment":
      return {
        ...state,
        down_payment: action.value,
      };
    case "thumbnail":
      return {
        ...state,
        thumbnail: action.value,
      };
    case "video":
      return {
        ...state,
        video: action.value,
      };
    case "images":
      if (action.sub_type === "add") {
        return {
          ...state,
          images: [...state.images, action.value],
        };
      } else if (action.sub_type === "remove") {
        const updatedImages = [...state.images];
        updatedImages.splice(action.value, 1);
        return {
          ...state,
          images: updatedImages,
        };
      }
      break;
    case "unit":
      return {
        ...state,
        type_down_payment: action.value,
      };
    case "deletedFiles":
      return {
        ...state,
        delete_files: [...state.delete_files, action.value],
      };
  }

  throw Error("Unknown action: " + action.type);
};

const EditAds = () => {
  let officeData = useLocation().state.office;
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const searchData = JSON.parse(localStorage.getItem("searchData"));
  const [step, setStep] = useState(1);
  const [isLastStep, setIsLastStep] = useState();
  const [afterWidth, setAfterWidth] = useState(10);

  const [officeOptions, setOfficeOptions] = useState({
    categories: searchData?.category_aqar,
    type_res: searchData?.type_res,
    typeAqars: searchData?.type_aqars,
    officeFeatures: searchData?.featurea_ads,
    interfaces: searchData?.interface_aqars,
  });
  const [error, setError] = useState(false);

  const [images, setImages] = useState([]);
  const [selectedCheckLicense, setSelectedCheckLicense] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [readyImages, setReadyImages] = useState(
    officeData.ads_files.filter((ele) => ele.type_file === "image")
  );
  const [selectedImage, setSelectedImage] = useState();
  const parseFormattedNumber = (formattedValue) => {
    if (!formattedValue) return NaN;

    // Remove thousand separators and any other non-numeric characters
    const cleanedValue = formattedValue.replace(/[^0-9.-]/g, "");

    // Parse the cleaned value into a number
    const number = parseFloat(cleanedValue);

    return isNaN(number) ? NaN : number;
  };
  const [state, dispatch] = useReducer(reducerFunc, {
    license_number: officeData.license_number,
    title: officeData.title,
    category_id: Number(officeData.category_id),
    viewer_name: officeData.viewer_name,
    viewer_phone: officeData.viewer_phone,
    advertiser_relationship: officeData.advertiser_relationship,
    advertiser_relationship_type: officeData.advertiser_relationship_type,
    area: parseFormattedNumber(officeData.space),
    width: parseFormattedNumber(officeData.width),
    height: parseFormattedNumber(officeData.height),
    furnished: officeData.furnisher,
    type_aqar_id: officeData.type_aqar.id,
    details: officeData.ads_details,
    description: officeData.description,
    features: [],
    services: officeData.services,
    lat: Number(officeData.location.lat),
    lng: Number(officeData.location.lng),
    zoom: officeData.location.zoom,
    prices: officeData.ads_prices,
    down_payment: parseFormattedNumber(officeData.down_payment),
    type_down_payment: officeData.type_down_payment,
    city: officeData.location.city,
    neighborhood: officeData.location.neighborhood,
    street: officeData.location.street,
    interface_id: officeData.interface_aqar.id,
    video: officeData.ads_files.find((ele) => ele.type_file === "video")?.path,
    videoId: officeData.ads_files.find((ele) => ele.type_file === "video")?.id,
    thumbnail: officeData.main_image,
    images: [],
    delete_files: [],
  });
  console.log(state);
  //handling steps errors
  useEffect(() => {
    switch (step) {
      case 2:
        if (state.title.length === 0 || state.category_id.length === 0) {
          setError(true);
        } else {
          setError(false);
        }
        break;
      case 3:
        if (
          state.area.length === 0 ||
          state.width.length === 0 ||
          state.height.length === 0 ||
          state.advertiser_relationship.length === 0 ||
          state.advertiser_relationship.length === 0 ||
          state.furnished.length === 0 ||
          state.type_aqar_id.length === 0
        ) {
          setError(true);
        } else {
          setError(false);
        }
        break;
      case 4:
        if (
          state.details &&
          Array.isArray(state.details) &&
          state.details.length >= 2
        ) {
          const targetId1 = "floors";
          const targetId2 = "office Age";
          const countMatchingIds = state.details.filter(
            (obj) => obj?.en_name === targetId1 || obj?.en_name === targetId2
          ).length;

          if (countMatchingIds >= 2) {
            setError(false);
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
        break;
      case 5:
        if (state.description.length === 0) {
          setError(true);
        } else {
          setError(false);
        }
        break;
      case 7:
        if (state.lat.length === 0 || state.lng.length === 0) {
          setError(true);
        } else {
          setError(false);
        }
        break;
      case 8:
        if (Array.isArray(state.prices)) {
          const log = state.prices.filter((e) => e.status === true);
          if (log.length > 0) {
            const log2 = log.find((e) => e.price.length === 0);
            if (log2) {
              setError(true);
            } else {
              setError(false);
            }
          } else {
            setError(true);
          }
        } else {
          setError(false);
        }
        break;
      case 9:
        if (
          state.city.length === 0 ||
          state.neighborhood.length === 0 ||
          state.street.length === 0 ||
          state.interface_id.length === 0
        ) {
          setError(true);
        } else {
          setError(false);
        }
        break;
      case 10:
        if (state.thumbnail.length === 0) {
          setError(true);
        } else {
          setError(false);
        }
        break;
    }
  }, [step, state]);

  useEffect(() => {
    step === 10 ? setIsLastStep(10) : setIsLastStep(null);
  }, [step]);

  const hasPrevStep = step > 1;

  const handleNext = () => {
    setStep(step + 1);
    setAfterWidth(afterWidth + 10);
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
      setAfterWidth(afterWidth - 10);
    }
  };

  const handleSubmit = async () => {
    const formDataSend = new FormData();
    // Iterate through properties of formData and append each property to sendForm
    for (const property in state) {
      if (property === "furnished") {
        formDataSend.append("furnisher", state[property]);
      } else if (property === "area") {
        formDataSend.append("space", state[property]);
      } else if (property === "thumbnail") {
        if (state[property].length > 0) {
          continue;
        } else {
          formDataSend.append("main_image", state[property].file);
        }
      } else if (property === "prices") {
        const filteredPrices = state[property].filter(
          (price) => price.status === true
        );
        filteredPrices?.map((e, i) => {
          formDataSend.append(`prices[${i}][type_res_id]`, e.type_res_id);
          formDataSend.append(`prices[${i}][price]`, Number(e.price));
          formDataSend.append(`prices[${i}][status]`, e.status);

          e.id && formDataSend.append(`prices[${i}][id]`, e?.id);
        });
      } else if (property === "details") {
        state[property]?.map((e, i) => {
          formDataSend.append(`details[${i}][ar_name]`, e.ar_name);
          formDataSend.append(`details[${i}][en_name]`, e.en_name);
          formDataSend.append(
            `details[${i}][number_details]`,
            e.number_details === "أرضي" ? 0 : Number(e.number_details)
          );
          formDataSend.append(`details[${i}][status]`, e.status);
          formDataSend.append(`details[${i}][details_id]`, e.id);
        });
      } else if (property === "services") {
        state[property]?.map((e, i) => {
          formDataSend.append(`services[${i}][ar_name]`, e.ar_name);
          formDataSend.append(`services[${i}][en_name]`, e.en_name);
          formDataSend.append(`services[${i}][status]`, e.service_toggle);
          formDataSend.append(`services[${i}][price]`, e.price);
          !e?.type && formDataSend.append(`services[${i}][id]`, e.id);
        });
      } else if (property === "features") {
        state[property]?.map((e, i) => {
          formDataSend.append(`features[${i}][id]`, e?.feature_id);
        });
      } else if (
        property === "images" ||
        property === "delete_files" ||
        property === "video"
      ) {
        continue;
      } else {
        formDataSend.append(property, state[property]);
      }
    }

    const address =
      state.city + ", " + state.neighborhood + ", " + state.street;

    formDataSend.append("address", address);
    try {
      const res = await myAxios
        .post(`api/v1/user/offices/update/${officeData.id}`, formDataSend)
        .then((result) => {
          if (result.data.status === true) {
            const addFilesData = new FormData();
            const id = result.data.data.id;
            console.log(result.data.message);
            toast.success(result.data.message);

            state.images.forEach((file) => {
              addFilesData.append("images[]", file);
            });
            if (state.video) {
              if (typeof state.video !== "string") {
                addFilesData.append("video", state.video);
              }
            }
            const addFiles = myAxios
              .post(`api/v1/user/offices/addFiles/${id}`, addFilesData)
              .then((res) => {
                if (res.data.status === false) {
                  toast.error(
                    "فشل في رفع الملفات يرجى العودة للمكتب والمحاولة مرة اخرى"
                  );
                } else {
                  toast.success("تم رفع الملفات بنجاح");
                }
              });
          }
        });
    } catch (error) {
      console.error("Error sending FormData:", error);
    }
  };
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <AddLicensedAdvertising
            selectedCheckLicense={selectedCheckLicense}
            setSelectedCheckLicense={setSelectedCheckLicense}
            licenseNumber={licenseNumber}
            state={state}
            dispatch={dispatch}
            setLicenseNumber={setLicenseNumber}
          />
        );
      case 2:
        return (
          <CatgouryAds
            categories={officeOptions.categories}
            dispatch={dispatch}
            state={state}
          />
        );
      case 3:
        return (
          <HomeInformation
            typeAqars={officeOptions.typeAqars}
            type_res={officeOptions.type_res}
            state={state}
            dispatch={dispatch}
          />
        );
      case 4:
        return <OfficeDetailsNumbers dispatch={dispatch} state={state} />;
      case 5:
        return <HomeDescription state={state} dispatch={dispatch} />;
      case 6:
        return (
          <Services
            officeFeatures={officeData.featurea_ads}
            features={officeOptions.officeFeatures}
            state={state}
            dispatch={dispatch}
          />
        );
      case 7:
        return <MapAds state={state} dispatch={dispatch} />;
      case 8:
        return (
          <UnitPrice
            state={state}
            type={1}
            parseFormattedNumber={parseFormattedNumber}
            dispatch={dispatch}
            pricesTypes={officeOptions.type_res}
          />
        );
      case 9:
        return (
          <ConfimLocation
            state={state}
            dispatch={dispatch}
            interfaces={officeOptions.interfaces}
          />
        );
      case 10:
        return (
          <HomeImagesAdd
            officeId={officeData.id}
            step={step}
            images={images}
            setImages={setImages}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            readyImages={readyImages}
            setReadyImages={setReadyImages}
            state={state}
            dispatch={dispatch}
          />
        );
      default:
        return null;
    }
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
                      disabled={error}
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

export default EditAds;
