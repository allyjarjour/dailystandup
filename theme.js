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
    },
    skeleton: {
      bg: "muted",
      color: "primary",
      fontFamily: "inherit",
      fontWeight: "bold",
    },
  },
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    height: "100%",
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
