import Navbar from "./navigation/Navbar";
import Snackbar from "./snackbar/Snackbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      {children}
      <Snackbar />
    </>
  );
};

export default Layout;
