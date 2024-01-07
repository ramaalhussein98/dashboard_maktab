import { styled } from "styled-components";

export const Main = styled.main`
  min-height: 100vh;
  background-image: url("https://aqartik.com/static/media/house.182bf263bece13573163.jpg");
`;

export const Header = styled.header`
  .messages-container {
    position: relative;
    padding: 16px 8px;

    .counter {
      position: absolute;
      // inset: 0px;
      top: 5px;
      left: ${(prop) => (prop.$dir === "en" ? "5px" : "")};
      right: ${(prop) => (prop.$dir === "ar" ? "5px" : "")};
      background-color: #f00;
      color: white;
      width: 18px;
      height: 18px;
      cursor: pointer;
      border-radius: 50%;
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .message-icon {
    font-size: 28px;
    cursor: pointer;
    color: black
  }

  .messages-wrapper {
    position: absolute;
    top: 90px;
    background: rgb(255, 255, 255);
    box-shadow: 0px 6px 12px rgba(110, 110, 110, 0.3);
    padding: 16px;
    color: black;
    border-radius: 8px;
    width: 300px;
    height: 450px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;

    gap: 8px;
    left: ${(prop) => (prop.$dir === "ar" ? "-70px" : "")};
    right: ${(prop) => (prop.$dir === "en" ? "-70px" : "")};
    z-index: 10;

    .loader {
      position: absolute;
      top: 40%;
      left: 40%;
      transform: translate(-50%, -50%);
    }
  }
`;

export const ListItemDiv = styled.article`
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 16px;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  border-bottom: 1px solid #eee;

  .verifyIcon {
    position: absolute;
    top: 1rem;
    left: ${(prop) => (prop.$dir === "ar" ? "1rem" : "")};
    right: ${(prop) => (prop.$dir === "en" ? "1rem" : "")};
    /* left: 1rem; */
  }

  &:hover {
    background-color: #dbd8d8;
  }
`;

export const ChatDialogStyle = styled.div`
  position: fixed;
  /* background-color: #201f1f; */
  background: rgba(248, 247, 247, 0.81);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(8.6px);
  /* background-color: white;
  box-shadow: 0px -6px 24px rgba(150, 150, 150, 0.3); */
  bottom: 0px;
  width: 350px;
  height: 440px;
  right: ${(prop) => (prop.$dir === "ar" ? "50px" : "")};
  left: ${(prop) => (prop.$dir === "en" ? "50px" : "")};
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 100000;
  overflow: visible;
  @media (max-width: 768px) {
    width: 320px;
    height: 430px;
    right: ${(prop) => (prop.$dir === "ar" ? "10px" : "")};
    left: ${(prop) => (prop.$dir === "en" ? "10px" : "")};
    /* transform: translateX(-50%); */
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #c9c6c6;
    padding: 32px 16px;

    .header-data {
      display: flex;
      align-items: center;
      gap: 8px;

      img {
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 50%;
      }
    }

    .close-icon {
      cursor: pointer;
      border-radius: 50%;
      font-size: 29px;
      background-color: transparent;
      transition: all 0.1s ease-in;
      color: #a1a0a0;
      &:hover {
        /* background-color: #524f4f;*/
        color: #363535;
      }
    }
  }

  main {
    padding: 16px 8px;
    height: 350px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .message-container {
      display: flex;
      gap: 4px;
      max-width: 80%;

      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        object-fit: cover;
        align-self: flex-end;
      }
    }
    .send-container {
      align-self: flex-start;
    }
    .recieve-container {
      align-self: flex-end;
    }

    .message {
      padding: 12px 8px;
      border-radius: 16px;
      font-size: 14px;
      position: relative;
    }

    .sended-message {
      background-color: #c3f1bb;
      color: black;
    }

    .recieved-message {
      background-color: #ffffff;
      color: black;
    }
    .custom-message {
      background-color: #f0f0f0;
      color: #534f4f;
    }

    .customized-msg {
      display: flex;
      flex-direction: column;

      .msg-btns-con {
        display: flex;
        width: 100%;
        gap: 1.3rem;
        margin-top: 4px;

        .msg-btn {
          flex: 1;
          border-radius: 10px;
          border: none;
          outline: none;
          padding: 6px;
          cursor: pointer;
          text-decoration: none;
          &.btn-success {
            background-color: #14b183;
            color: white;
            text-align: center;
          }

          &.btn-deny {
            background-color: #e32222;
            color: white;
            text-align: center;
            font-size: 14px;
          }
        }
      }
    }
  }

  footer {
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    flex-direction: column;

    .selected-file {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
    }

    .footer-container {
      display: flex;
      width: 100%;
      align-items: center;
      gap: 8px;
      textarea {
        height: 50px;
        background-color: transparent;
        border: 1px solid #c9c6c6;
        /* border: none; */
        outline: none;
        padding: 10px 12px;
        border-radius: 12px;
        resize: none;
        flex: 1;
      }
      button {
        background-color: transparent;
        border: none;
        outline: none;
        color: white;
        cursor: pointer;

        svg {
          color: #14b183;
          /* color: #e3af22; */
        }
      }
    }
  }
`;
