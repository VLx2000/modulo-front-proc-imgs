import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    /* 'https://projeto-api-gateway.herokuapp.com/' ||  */"/api",
});

export default axiosInstance;
