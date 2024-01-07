import { Box, Button, Modal, Paper, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";
import { useQueryHook } from "../../../../hooks/useQueryHook";
import myAxios from "../../../../api/myAxios";

const getData = async () => {
  const res = await myAxios.get("api/v1/user/units/aqars");
  return res.data.data;
};

const ChooseUnitModal = ({ open, onClose }) => {
  const { data: offices, isLoading } = useQueryHook(["all offices"], getData);
  const nav = useNavigate();
  const handleNavigateAddUnitPage = (id, title) => {
    console.log(id);
    nav("/addunit", { state: { id, title } });
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="custom-box2">
        <div className="d-flex">
          <span className="choose_unit">حدد العقار</span>
          <CloseIcon onClick={onClose} />
        </div>
        {offices?.map((data) => (
          <Paper
            className="paper_unit_style"
            key={data.id}
            onClick={() => handleNavigateAddUnitPage(data.id, data.title)}
          >
            <span className="unit_title">{data.title}</span>
            <ChevronLeftIcon />
          </Paper>
        ))}
      </Box>
    </Modal>
  );
};

export default ChooseUnitModal;
