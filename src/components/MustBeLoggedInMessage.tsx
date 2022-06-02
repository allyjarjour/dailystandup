import React from "react";
import { Image, Flex, Button } from "theme-ui";
import { signIn } from "next-auth/react";

export default function MustBeLoggedInMessage() {
  return (
    <Flex sx={{ justifyContent: "center" }}>
      <Flex sx={{ flexDirection: "column" }}>
        <Image src="./standup_summary.png" />
        <Button mt={2} onClick={signIn} width="200" sx={{ margin: "0 auto" }}>
          Sign In
        </Button>
      </Flex>
    </Flex>
  );
}
