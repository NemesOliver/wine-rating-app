import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import FloatingAddButton from "./floatingActionButton/FloatingAddButton";
import Navbar from "./navigation/Navbar";
import Snackbar from "./snackbar/Snackbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isSignedIn } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      {children}
      {isSignedIn && <FloatingAddButton />}
      <Snackbar />
    </>
  );
};

export default Layout;
