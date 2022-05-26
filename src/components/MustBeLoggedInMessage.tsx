import React from "react";
import { Image, Text, Flex, Button } from "theme-ui";
import { signIn } from "next-auth/react";

export default function MustBeLoggedInMessage() {
  return (
    <Flex sx={{ justifyContent: "center" }}>
      <Flex sx={{ flexDirection: "column" }}>
        <Text
          sx={{
            fontSize: 4,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Daily Standup
        </Text>
        <Image src="https://static.thenounproject.com/png/79533-200.png" />
        <Button
          mt={2}
          onClick={() =>
            signIn("github", { callbackUrl: process.env.NEXTAUTH_URL })
          }
        >
          Sign in with GitHub
        </Button>
      </Flex>
    </Flex>
  );
}
