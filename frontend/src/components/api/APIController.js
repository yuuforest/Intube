import axios from "axios";
// import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    withCredentials: true,
  },
});

instance.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] =
      "Bearer " + localStorage.getItem("accessToken");
    return config;
  },
  function (error) {
    console.log(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    console.log(response);

    return response;
  },
  function (error) {
    // const navigate = useNavigate();
    console.log(error);
    if (error.response.data.message === "Invalid Password") {
      // "Invalid Password"
      alert("비밀번호 오류");
    }
    if (error.response.status === 401) {
      axios
        .get(
          "http://localhost:8080/auth/issue",
          {
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
          },
          { withCredentials: true }
        )
        .then(
          ({ data }) => localStorage.setItem("accessToken", data.accessToken),
          console.log("엑세스토큰 :", localStorage.getItem("accessToken"))
          // console.log(data)
        )
        .catch(e => {
          if (e.response.data.statusCode === 401) {
            // navigate("/");
            localStorage.clear();
            alert("refreshToken 만료. 다시 로그인 해주세요");
            deleteCookie("refreshToken");
            window.location.replace("/");
          }
          console.log(e, "dfdfdffdfd");
        });
    }
  }
);
function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:10 GMT;";
}

export default instance;
