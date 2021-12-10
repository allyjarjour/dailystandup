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
      <nav sx={{ variant: "nav" }}>Daily Standup</nav>
    </Link>
  </header>
);

export default Nav;
