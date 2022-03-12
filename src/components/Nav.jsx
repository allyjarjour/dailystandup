/** @jsx jsx */
import { jsx } from "theme-ui";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import UserDetails from "./UserDetails";
import { Flex, Button, Grid, Box } from "theme-ui";
import React from "react";

const Nav = () => {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  return isLoggedIn ? (
    <div sx={{ position: "fixed", top: 0, zIndex: 10, overflow: "hidden" }}>
      <header
        sx={{
          variant: "header",
        }}
      >
        <Grid columns={[3, "1fr 2fr 1fr"]}>
          <Box />
          <Link href="/">
            <nav sx={{ variant: "nav" }}>Daily Standup</nav>
          </Link>
          <Flex sx={{ marginLeft: "auto" }}>
            <UserDetails
              name={session?.user?.name}
              avatarSrc={session?.user?.image}
            />
            <Button onClick={signOut}>Logout</Button>
          </Flex>
        </Grid>
      </header>
      <div sx={{ width: "100%", bg: "#FFF", height: "10px" }} />
    </div>
  ) : (
    <React.Fragment />
  );
};

export default Nav;
