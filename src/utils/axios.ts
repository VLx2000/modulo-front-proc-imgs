import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    /* 'https://projeto-api-gateway.herokuapp.com/' || */ "http://localhost:8080/",
});

export default axiosInstance;
