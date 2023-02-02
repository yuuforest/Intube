import axios from "axios";
import { useNavigate } from "react-router";

export function logout() {
  console.log("hi");
  axios
    .delete("http://localhost:8080/auth/logout", {
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        // Accept: "application/json",
        // "Access-Control-Allow-Origin": "http://localhost:8080",
        Authentication: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      withCredentials: true,
    })
    .then(({ data }) => {
      console.log("왜 안됀얄어리ㅏ너ㅏ러");
      const navigate = useNavigate();
      if (data.statusCode === 200) {
        localStorage.removeItem("accessToken");
        console.log(data);
        navigate("/"); // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
      }
    })
    .catch(e => {
      if (e.response.data.statusCode === 400) {
        alert("비밀번호가 틀렸습니다.");
      }
      if (e.response.data.statusCode === 401) {
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
            console.log("엑세스토큰 :", localStorage.getItem("accessToken")),
            alert("엑세스토큰 재발급 다시 로그아웃 버튼 눌러주세요")
            // console.log(data)
          )
          .catch(e => {
            const navigate = useNavigate();
            if (e.response.data.statusCode === 401) {
              // navigate("/");
              localStorage.clear();
              alert("refreshToken 만료. 다시 로그인 해주세요");
              navigate("/");
            }
            console.log(e, "dfdfdffdfd");
          });
        // alert("등록된 회원이 아닙니다.");
      }
      console.log(e, "아오");
    });
}

// export default logout;
