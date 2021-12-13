import { Backdrop as MUIBackdrop, CircularProgress } from "@mui/material";

const Backdrop = () => {
  return (
    <MUIBackdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open
    >
      <CircularProgress color="inherit" />
    </MUIBackdrop>
  );
};

export default Backdrop;
