import React from "react";
import { useSession } from "next-auth/react";
import { Spinner } from "theme-ui";
import MustBeLoggedInMessage from "./MustBeLoggedInMessage";
import { Box } from "theme-ui";
import { getUserEmail } from "../requests/requests";
import { useQuery, QueryClient } from "react-query";

export default function AppFrame({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const { data: session, status } = useSession();
  const { data: emailData } = useQuery(
    "userEmail",
    () => getUserEmail(session.accessToken),
    {
      enabled: !!session?.accessToken,
    }
  );

  React.useEffect(() => {
    !emailData?.email && console.log("signOut");
  }, [emailData?.email]);

  const getAppFrameContent = () => {
    switch (status) {
      case "loading":
        return <Spinner sx={{ variant: "spinner" }} />;
      case "authenticated":
        return children;
      default:
        return <MustBeLoggedInMessage />;
    }
  };

  return <Box sx={{ variant: "containers.page" }}>{getAppFrameContent()}</Box>;
}
