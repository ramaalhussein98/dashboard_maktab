import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import CropeerImage from "./CropeerImage";
import DeleteIcon from "@mui/icons-material/Delete";
// import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
// import Image from "next/image";

// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const HomeImagesAdd = ({
  images,
  setImages,
  selectedImage,
  setSelectedImage,
  type,
  deletedImages,
  setDeletedImages,
  readyImages,
  setReadyImages,
  state,
  dispatch,
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [selectedVideoFile, setSelectedVideoFile] = useState(
    state?.video || null
  );

  useEffect(() => {
    // Update the formData when selectedImages or selectedVideoFile changes
    if (selectedVideoFile) {
      dispatch({ type: "video", value: selectedVideoFile });
      // setFormData((prevFormData) => ({
      //   ...prevFormData,
      //   video: selectedVideoFile,
      // }));
    }
  }, [selectedVideoFile]);

  const handleDeleteImage = (index) => {
    // setSelectedImages((prevImages) => {
    //   const updatedImages = [...prevImages];
    //   updatedImages.splice(index, 1);
    //   return updatedImages;
    // });
    // setImages((prevImages) => {
    //   const updatedImages = [...prevImages];
    //   updatedImages.splice(index, 1);
    //   return updatedImages;
    // });
  };

  const handleDeleteReadyImages = (index) => {
    setReadyImages((prevImages) => {
      const updatedImages = prevImages.filter((image) => image.id !== index);
      return updatedImages;
    });
    setDeletedImages((prev) => [...prev, index]);
  };

  // useEffect(() => {
  //   // setFormData((prevFormData) => ({
  //   //   ...prevFormData,
  //   //   images: selectedImages, // Append new blob to the array
  //   // }));
  // }, [selectedImages]);

  const handleVideoSelect = (event) => {
    const file = event.target.files[0];
    const video = document.createElement("video");
    const reader = new FileReader();

    reader.onload = function () {
      video.src = URL.createObjectURL(file);

      video.addEventListener("loadedmetadata", function () {
        const duration = video.duration;

        if (duration > 30) {
          toast.error("لايمكن تجاوز عدد الثواني المسموح به");
          setSelectedVideoFile(null);
        } else {
          setSelectedVideoFile(file);
        }

        // Optionally, you can remove the video element from the DOM
        video.remove();
      });
    };
    reader.readAsDataURL(file);
  };

  const handleButtonClick = () => {
    document.getElementById("video-input").click();
    if (selectedVideoFile) {
      // Clear the selected video file
      setSelectedVideoFile(null);
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "600",
          marginBottom: "24px",
          marginTop: "8px",
          fontSize: { xs: "1.2rem", md: "1.5rem" },
        }}
      >
        {t("dashboard.property_images.title")}
      </Typography>
      <Box sx={{ color: "rgb(118, 118, 118)" }}>
        <Typography sx={{ fontWeight: "600", fontSize: "16px" }}>
          {t("dashboard.property_images.desc1")}
        </Typography>
        <Typography sx={{ marginY: "8px" }}>
          {t("dashboard.property_images.desc2")}
        </Typography>
        <Typography> {t("dashboard.property_images.desc3")}</Typography>
      </Box>
      <Box sx={{ marginY: "14px", fontSize: "16px", fontWeight: "600" }}>
        <Typography variant="label">
          {t("dashboard.property_images.label1")}
        </Typography>
        <Typography
          sx={{
            fontWeight: "400",
            fontSize: "16px",
            color: "rgb(118, 118, 118)",
          }}
        >
          {lang === "ar"
            ? "عدد الثواني المسموح بها 30 ثانية"
            : "The number of seconds allowed is 30 seconds"}
        </Typography>
        <Box>
          <input
            id="video-input"
            type="file"
            accept="video/*"
            onChange={handleVideoSelect}
            style={{ display: "none" }}
          />
          <Button
            onClick={handleButtonClick}
            sx={{
              minWidth: "64px",
              padding: "6px 8px",
              width: "100%",
              height: "200px",
              border: "1px dashed gray",
              marginY: "1rem",
            }}
          >
            {selectedVideoFile ? (
              <video autoPlay style={{ width: "100%", height: "100%" }}>
                <source src={URL.createObjectURL(selectedVideoFile)} />
              </video>
            ) : (
              <Box
                sx={{
                  color: "rgb(118, 118, 118)",
                  fontSize: "1rem",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <VideoCallIcon
                  sx={{
                    width: "1.5em",
                    height: "1.5em",
                    color: "rgb(118, 118, 118)",
                    display: "block",
                    margin: "auto",
                  }}
                />
                <Typography> {t("dashboard.property_images.btn1")} </Typography>
              </Box>
            )}
          </Button>
        </Box>

        {type === 1 && (
          <>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "600",
                marginBottom: "24px",
                marginTop: "8px",
                fontSize: { xs: "1.2rem", md: "1.5rem" },
              }}
            >
              {" "}
              {lang === "ar"
                ? "الصور التي تم اضافتها"
                : "images that been added"}
            </Typography>
            <Box sx={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {readyImages.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    width: { xs: "250px", sm: "200px" },
                    height: "120px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    marginBottom: "1rem",
                    position: "relative",
                  }}
                >
                  <Typography
                    sx={{
                      position: "absolute",
                      top: "0rem",
                      left: "0rem",
                      color: "white",
                      padding: "0.2rem 0.4rem",

                      background: "rgba(0, 0, 0, 0.5)",
                      fontSize: "12px",
                      fontWeight: "600",
                      borderRadius: "12px 0px",
                      backgroundColor: "rgba(17, 17, 17, 0.47)",
                      width: "32px",
                      height: "24px",
                      textAlign: "center",
                    }}
                  >
                    {index + 1}
                  </Typography>

                  <img
                    key={index}
                    src={`https://www.dashboard.aqartik.com/assets/images/deal/image/${image.name}`}
                    alt={`Selected Image ${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <DeleteIcon
                    sx={{
                      position: "absolute",
                      top: "0rem",
                      right: "0rem",
                      color: "white",
                      cursor: "pointer",
                      // zIndex: 1,
                      padding: "4px",
                      borderRadius: "0px 0px 0px 12px",
                      background:
                        "radial-gradient(at left bottom, rgba(255, 0, 0, 0.67) 0%, rgba(255, 0, 0, 0.2) 75%)",
                    }}
                    onClick={() => handleDeleteReadyImages(image.id)}
                  />
                </Box>
              ))}
            </Box>
          </>
        )}

        <Typography variant="label">
          {" "}
          {t("dashboard.property_images.label2")}
        </Typography>
        <Typography sx={{ color: "rgb(118, 118, 118)", marginY: "8px" }}>
          {t("dashboard.property_images.hint1")}
        </Typography>
        <CropeerImage
          type={1}
          isFirstButton={true}
          setImages={setImages}
          selectedImage={selectedImage}
          state={state}
          dispatch={dispatch}
          setSelectedImage={setSelectedImage}
        />

        <Typography variant="label">
          {t("dashboard.property_images.label3")}
        </Typography>
        <Typography sx={{ color: "rgb(118, 118, 118)", marginY: "8px" }}>
          {t("dashboard.property_images.hint2")}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <CropeerImage
            type={2}
            width="200px"
            height="120px"
            maxImages={8}
            hasBackground={false} // Set hasBackground prop to false
            setImages={setImages}
            selectedImage={selectedImage}
            state={state}
            dispatch={dispatch}
            setSelectedImage={setSelectedImage}
          />

          {images.map((image, index) => (
            <Box
              key={index}
              sx={{
                width: { xs: "250px", sm: "200px" },
                height: "120px",
                borderRadius: "12px",
                overflow: "hidden",
                marginBottom: "1rem",
                position: "relative",
              }}
            >
              <Typography
                sx={{
                  position: "absolute",
                  top: "0rem",
                  left: "0rem",
                  color: "white",
                  padding: "0.2rem 0.4rem",

                  background: "rgba(0, 0, 0, 0.5)",
                  fontSize: "12px",
                  fontWeight: "600",
                  borderRadius: "12px 0px",
                  backgroundColor: "rgba(17, 17, 17, 0.47)",
                  width: "32px",
                  height: "24px",
                  textAlign: "center",
                }}
              >
                {index + 1}
              </Typography>

              <img
                key={index}
                src={image}
                alt={`Selected Image ${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <DeleteIcon
                sx={{
                  position: "absolute",
                  top: "0rem",
                  right: "0rem",
                  color: "white",
                  cursor: "pointer",
                  // zIndex: 1,
                  padding: "4px",
                  borderRadius: "0px 0px 0px 12px",
                  background:
                    "radial-gradient(at left bottom, rgba(255, 0, 0, 0.67) 0%, rgba(255, 0, 0, 0.2) 75%)",
                }}
                onClick={() => handleDeleteImage(index)}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default HomeImagesAdd;
