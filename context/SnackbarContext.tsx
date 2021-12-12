import { createContext, ReactNode, useState } from "react";

export const SnackbarContext = createContext({} as any);

interface SnackbarContextProps {
  children: ReactNode;
}

const SnackbarContextProvider = ({ children }: SnackbarContextProps) => {
  const [severity, setSeverity] = useState("info");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const triggerSnackbar = (severity: string, msg: string) => {
    setOpen(true);
    setMessage(msg);
    setSeverity(severity);
  };

  return (
    <SnackbarContext.Provider
      value={{ triggerSnackbar, severity, message, open, setOpen }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarContextProvider;
