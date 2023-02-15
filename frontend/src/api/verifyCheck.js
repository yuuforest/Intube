import http from "api/Http";

export function EmailCheck(email, number) {
  let values = {
    // email: "abcdq12345@naver.com",
    // number: "rqDsyUYU",
    email: email,
    authKey: number,
  };
  console.log("hi");
  console.log(email);
  console.log(number);
  http
    .post("/auth/check-email", JSON.stringify(values), {
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
      withCredentials: true,
    })
    .then(({ data }) => {
      //   const navigate = useNavigate();
      if (data.statusCode === 200) {
        alert("인증되었습니다.");
        localStorage.setItem("emailAuthorize", true);
      }
    })
    .catch(e => {
      if (e.response.data.statusCode === 401) {
        // localStorage.setItem("emailAuthorize", false);
        alert("인증 오류");
      }
      console.log(e, "아오");
    });
}
