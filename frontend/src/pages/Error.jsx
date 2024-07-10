import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error);
  return <p>There was an errror</p>;
};

export default Error;
