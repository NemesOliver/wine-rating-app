import { FunctionComponent, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../context/AuthContext";
import Backdrop from "./backdrop/Backdrop";

const withAuth = (Component: FunctionComponent) => {
  return function Wrapper(props: any) {
    const Router = useRouter();
    const { isSignedIn } = useContext(AuthContext);

    //Check if we are on client
    if (typeof window !== "undefined") {
      // if loading show loader
      if (isSignedIn === null) {
        return <Backdrop />;
      }

      // if no user redirect to /login
      if (!isSignedIn) {
        Router.replace("login");
        return null;
      }

      // if logged in
      return <Component {...props} />;
    }

    return null;
  };
};

export default withAuth;
