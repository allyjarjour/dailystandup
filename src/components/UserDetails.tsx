/** @jsx jsx */
import { jsx } from "theme-ui";
import { Avatar, Flex, Text } from "theme-ui";
import { isMobile } from "react-device-detect";

type UserDetailsProps = {
  avatarSrc: string;
  name: string;
};

export default function UserDetails({
  avatarSrc,
  name,
}: UserDetailsProps): JSX.Element {
  return (
    <Flex sx={{ alignItems: "center", marginRight: "5px" }}>
      {avatarSrc && <Avatar src={avatarSrc} />}
      {!isMobile && <Text m={2}>{name}</Text>}
    </Flex>
  );
}
