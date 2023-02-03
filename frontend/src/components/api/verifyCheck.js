import axios from "axios";

export function emailCheck(email, number) {
  let values = {
    // email: "abcdq12345@naver.com",
    // number: "rqDsyUYU",
    email: email,
    number: number,
  };
  console.log("hi");
  axios
    .post("http://localhost:8080/auth/check-email", JSON.stringify(values), {
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
      withCredentials: true,
    })
    .then(({ data }) => {
      //   const navigate = useNavigate();
      if (data.statusCode === 200) {
        alert("인증되었습니다.");
      }
    })
    .catch(e => {
      if (e.response.data.statusCode === 401) {
        alert("인증 오류");
      }
      console.log(e, "아오");
    });
}
