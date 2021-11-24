/** @jsx jsx */
import { jsx } from "theme-ui";
import Link from "next/link";

const Nav = () => (
  <header
    sx={{
      width: "100vw",
      bg: "secondary",
      borderBottom: "1px solid",
      borderColor: "secondary",
    }}
  >
    <Link href="/">
      <nav
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          height: "100%",
          color: "muted",
          fontSize: "2rem",
        }}
      >
        Standup Summary
      </nav>
    </Link>
  </header>
);

export default Nav;
