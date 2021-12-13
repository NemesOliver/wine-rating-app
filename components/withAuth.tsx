import { FunctionComponent, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../context/AuthContext";

const withAuth = (Component: FunctionComponent) => {
  return function Wrapper(props: any) {
    const Router = useRouter();
    const { isSignedIn } = useContext(AuthContext);

    //Check if we are on client
    if (typeof window !== "undefined") {
      if (!isSignedIn) {
        Router.replace("login");
        return null;
      }

      return <Component {...props} />;
    }

    return null;
  };
};

export default withAuth;
