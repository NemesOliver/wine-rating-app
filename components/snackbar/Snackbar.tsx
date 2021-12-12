import { useContext } from "react";
import { SnackbarContext } from "../../context/SnackbarContext";
import { Snackbar as MUISnackbar, Alert, IconButton } from "@mui/material";

const Snackbar = () => {
  const { open, severity, message, setOpen } = useContext(SnackbarContext);

  return (
    <>
      <MUISnackbar
        sx={{ marginBottom: "4rem" }}
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {message}
        </Alert>
      </MUISnackbar>
    </>
  );
};

export default Snackbar;
