import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const NumberOffices = ({ id, label, dispatch, number }) => {
  const handleIncrease = () => {
    dispatch({ type: "unit_rooms", sub_type: "increase", id, number });
  };
  const handleDecrease = () => {
    dispatch({ type: "unit_rooms", sub_type: "decrease", id, number });
  };

  return (
    <div className="d-flex NumberBox">
      <span className="labelNumber">{label}</span>
      <div className="NumberBoxInput">
        <button
          className="btnStyle"
          onClick={handleDecrease}
          disabled={number === null || number === 0}
          style={{
            color:
              number === null || number === 0 ? "gray" : "var(--green-color)",
          }}
        >
          -
        </button>
        <input
          className="NumberInput"
          placeholder={number === null ? "لايوجد" : ""}
          value={number === null ? "" : number}
          readOnly
        />
        <button className="btnStyle" onClick={handleIncrease}>
          +
        </button>
      </div>
    </div>
  );
};

const OfiicesNumberDetails = ({ unit, dispatch, roomDetails }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    if (unit.unit_rooms.length === 0) {
      dispatch({ type: "unit_rooms", sub_type: "add", arr: roomDetails });
    }
  }, []);

  return (
    <>
      <div className="UnitDetailsContainer">
        <p className="UnitDetailsTitle">تفاصيل غرف المكتب</p>
      </div>
      {unit?.unit_rooms?.map((data) => (
        <NumberOffices
          key={data.id}
          label={lang === "ar" ? data.ar_name : data.en_name}
          id={data.id}
          number={data.number}
          unit={unit}
          dispatch={dispatch}
        />
      ))}
    </>
  );
};

export default OfiicesNumberDetails;
