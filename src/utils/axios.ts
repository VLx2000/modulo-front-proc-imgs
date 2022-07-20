import axios from "axios";

const axiosInstance = axios.create({ 
    baseURL: 'http://localhost:8080/v1' 
});

export default axiosInstance;