/** @jsx jsx */
import { jsx } from "theme-ui";

export default ({ content }) => (
  <div sx={{ height: `calc(100vh - 60px)` }}>
    <div
      sx={{
        variant: "containers.page",
        display: "flex",
        alignItems: "center",
        height: "100%",
      }}
    >
      <h1 sx={{ fontSize: 6, my: 0 }}>{content.title}</h1>
    </div>
  </div>
);

export const getStaticProps = () => {
  // get data from CMS

  return {
    props: {
      content: {
        title: "This is my really nice app",
      },
    },
  };
};
