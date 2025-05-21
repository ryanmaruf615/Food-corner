import { Helmet } from "react-helmet";

const ReactHelemt = ({ title }: { title: string }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>Food-Corner {title}</title>
    </Helmet>
  );
};

export default ReactHelemt;
