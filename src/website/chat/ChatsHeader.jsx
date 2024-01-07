import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ChatContext from "../../context/chatContext";
import { ListItemDiv } from "../../mainComponents/MainPageStyles";

import VerifiedIcon from "@mui/icons-material/Verified";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router";
import { CircularProgress } from "@mui/material";
import UserContext from "../../context/userContext";
import { ThreeDots } from "react-loader-spinner";
import { LogoBig } from "../../assets/dashboard/logos";

export const ChatsHeader = ({
  setIsUserSelected,
  setShowMessages,
  showMessages,
}) => {
  const nav = useNavigate();

  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const {
    setRecipientId,
    contacts,
    isLoading,
    setUserKlickedData,
    setContacts,
  } = useContext(ChatContext);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const messagesWrapper = document.querySelector(".messages-wrapper");
      const messagesWrapperIcon = document.querySelector(".message-icon");
      if (
        messagesWrapper &&
        !messagesWrapper.contains(event.target) &&
        messagesWrapperIcon &&
        !messagesWrapperIcon.contains(event.target)
      ) {
        setShowMessages(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const seenFunction = async (id) => {
    const formData = new FormData();
    formData.append("id", id);
    // await myAxios.post(``, formData);
    const token = localStorage.getItem("user_token");
    const res = await axios.post(
      `https://dashboard.aqartik.com/api/chat/seen`,
      formData,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.data.status === 1) {
      setContacts(res.data.contacts);
      // setIsLoadingData(false);
    } else if (
      res.data.status === 0 &&
      res.data.message === "401 Unauthorized"
    ) {
      // setIsLoadingData(false);
      toast.error(
        lang === "ar"
          ? "غير مصرح، يرجى تسجيل الدخول"
          : "unauthorized, please login again"
      );
      localStorage.removeItem("user_token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("userMembership");
      localStorage.removeItem("userData");
      nav("/");
    } else {
    }
  };

  return (
    <div className="messages-wrapper">
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="var(--main-color)"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : (
        <>
          <h3>
            الرسائل
            {/* {t("messages_header.title")} */}
          </h3>
          {contacts?.length > 0
            ? contacts.map((ele) => {
                const messageDate =
                  ele?.lastMessage &&
                  new Date(ele?.lastMessage?.created_at)
                    .toISOString()
                    .slice(0, 10);
                return (
                  <ListItemDiv
                    $dir={lang}
                    onClick={() => {
                      setIsUserSelected(false);
                      setRecipientId(null);
                      setUserKlickedData(ele);
                      setShowMessages(false);
                      seenFunction(ele.lastMessage?.id);
                      setTimeout(() => {
                        setIsUserSelected(true);
                        setRecipientId(ele.id);
                      }, 500);
                    }}
                    key={ele.id}
                  >
                    <div
                      style={{
                        borderRadius: "50%",
                        width: "50px",
                        flex: "1",
                        border: "1px solid #cccccc",
                        height: "50px",
                      }}
                    >
                      <img
                        src={
                          LogoBig
                          // ele?.image?.name
                          //   ? `https://dashboard.aqartik.com/assets/images/users/logo/${ele?.image?.name}`
                          //   : "https://dashboard.aqartik.com/assets/images/users/logo/avatar.png"
                        }
                        alt=""
                        style={{
                          borderRadius: "50%",
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          objectPosition: "center",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        flex: "4",
                        gap: "4px",
                        marginTop: "16px",
                        width: "100%",
                      }}
                    >
                      <div>
                        <span style={{ fontWeight: 500 }}>
                          {/* {ele.username} */}
                          maktab
                        </span>
                        {ele.id === 1 && (
                          <VerifiedIcon
                            sx={{ color: "#14b183", fontSize: "13px" }}
                          />
                        )}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row-reverse",
                          justifyContent: "space-between",
                        }}
                      >
                        <span style={{ fontSize: "13px" }}>{messageDate}</span>
                        <p style={{ fontSize: "14px" }}>
                          {ele?.lastMessage.type === "action"
                            ? lang === "ar"
                              ? `تمت دعوتك من قبل ${
                                  JSON.parse(ele?.lastMessage.body).username
                                }`
                              : `You've been invited by ${
                                  JSON.parse(ele?.lastMessage.body).username
                                }`
                            : ele?.lastMessage.type === "html"
                            ? lang === "ar"
                              ? "اشعارات نظام"
                              : "system notification"
                            : ele?.lastMessage?.body?.length > 40
                            ? ele?.lastMessage?.body?.slice(0, 40) + "..."
                            : ele?.lastMessage?.body}
                        </p>
                      </div>
                    </div>
                  </ListItemDiv>
                );
              })
            : lang === "ar"
            ? "لايوجد رسائل لعرضها"
            : "no messages to show"}
        </>
      )}
    </div>
  );
};
