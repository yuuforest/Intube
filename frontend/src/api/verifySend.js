import http from "api/Http";
import swal from "sweetalert2";

export function verifySend(email) {
  let values = {
    email: email,
  };
  console.log("hi");
  http
    .post("/auth/send-email", JSON.stringify(values), {
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
      withCredentials: true,
    })
    .then(({ data }) => {
      if (data.statusCode === 200) {
        swal.fire({
          title: "",
          text: "인증번호가 발송되었습니다. 메일을 확인해주세요",
          icon: "info",
        });
      }
    })
    .catch(e => {
      if (e.response.data.statusCode === 400) {
        swal.fire({
          title: "",
          text: "이메일 형식이 아닙니다.",
          icon: "error",
        });
      }
      if (e.response.data.statusCode === 409) {
        swal.fire({
          title: "",
          text: "이미 가입된 이메일입니다.",
          icon: "error",
        });
      }
      console.log(e, "아오");
    });
}
