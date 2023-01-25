import axios from "axios";

// axios 객체 생성
export default axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    'Access-Control-Allow-Origin':'http://localhost:8080',
    // "Authorization" : "Bearer {accessToken}",
  },
  withCredentials : true

});