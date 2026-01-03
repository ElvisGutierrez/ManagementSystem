import { useEffect } from "react";
import { api } from "./api/axios";

const TestApi = () => {
  useEffect(() => {
    api
      .get("/protected")
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  }, []);

  return <h1>Probando conexión Backend</h1>;
};

export default TestApi;
