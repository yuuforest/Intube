import http from "api/Http";

export function verifySend(email) {
  let values = {
    email: email,
  };
  console.log("hi");
  http
    .post(
      "https://intube.store:8443/api/auth/send-email",
      JSON.stringify(values),
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
        },
        withCredentials: true,
      }
    )
    .then(({ data }) => {
      if (data.statusCode === 200) {
        alert("인증번호가 발송되었습니다. 메일을 확인해주세요");
      }
    })
    .catch(e => {
      if (e.response.data.statusCode === 400) {
        alert("이메일 형식이 아닙니다.");
      }
      if (e.response.data.statusCode === 409) {
        alert("중복된 이메일 입니다.");
      }
      console.log(e, "아오");
    });
}
