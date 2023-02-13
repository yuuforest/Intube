import axios from "axios";
// import { useNavigate } from "react-router";

const http = axios.create({
  baseURL: "https://intube.store/api",
  headers: {
    "Content-type": "application/json;charset=UTF-8",
  },
});
export default http;
