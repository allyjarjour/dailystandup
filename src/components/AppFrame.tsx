import React from "react";
import { useSession, signOut } from "next-auth/react";
import { Spinner } from "theme-ui";
import MustBeLoggedInMessage from "./MustBeLoggedInMessage";
import { Box } from "theme-ui";
import { getUserData, getUserEmail } from "../requests/requests";
import { useQuery } from "react-query";

export default function AppFrame({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const { data: session, status } = useSession();
  const { isLoading, data: emailData } = useQuery(
    "userEmail",
    () => getUserEmail(session.accessToken),
    {
      enabled: !!session?.accessToken,
      onError: signOut,
    }
  );
  const email = emailData?.email;
  const { isLoading: areNotesLoading } = useQuery(
    "userData",
    () => getUserData(email),
    {
      enabled: !!email,
    }
  );

  const getAppFrameContent = () => {
    if (isLoading || areNotesLoading) {
      return <Spinner sx={{ variant: "spinner" }} />;
    }
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
