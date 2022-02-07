import { future } from "@theme-ui/presets";

const theme = {
  ...future,
  buttons: {
    primary: {
      bg: "primary",
      color: "muted",
      fontFamily: "inherit",
      fontWeight: "bold",
      cursor: "pointer",
      "&:hover": {
        bg: "#1155ed",
      },
    },
    skeleton: {
      bg: "#FFFFFF",
      color: "secondary",
      fontFamily: "inherit",
      fontWeight: "bold",
      border: "1px solid #c0c",
      "&:hover": {
        bg: "highlight",
        color: "muted",
      },
    },
  },
  forms: {
    input: {
      fontFamily: "inherit",
    },
  },
  header: {
    width: "100vw",
    bg: "secondary",
  },
  nav: {
    textAlign: "center",
    color: "muted",
    fontSize: "2rem",
    cursor: "pointer",
  },
  containers: {
    card: {
      boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
      border: "1px solid",
      borderColor: "muted",
      borderRadius: "4px",
      p: 2,
    },
    page: {
      width: "80%",
      mx: "auto",
      marginTop: "75px",
    },
    note: {
      display: "flex",
      m: "auto",
      width: "100%",
      maxWidth: "600px",
      justifyContent: "center",
      flexDirection: "column",
    },
  },
  styles: {
    ...future.styles,
  },
};

export default theme;
