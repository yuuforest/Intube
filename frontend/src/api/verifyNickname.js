import http from "api/Http";
import swal from "sweetalert2";
import { useNavigate } from "react-router";

export async function VerifyNickname(nickname) {
  const navigate = useNavigate();
  let params = {
    // email: "abcdq12345@naver.com",
    // number: "rqDsyUYU",
    nickname: nickname,
  };
  console.log(nickname);
  let test = await http
    .get(
      "/user/nickname",
      { params },
      {
        headers: {
          "Content-type": "application/json;charset=UTF-8",
        },
        withCredentials: true,
      }
    )
    .then(({ data }) => {
      if (data.statusCode === 200) {
        localStorage.setItem("nicknameAuthorize", true);
        console.log(localStorage.getItem("nicknameAuthorize"));
        swal.fire({
          title: "",
          text: "사용 가능한 닉네임입니다!",
          icon: "success",
        });
      }
    })
    .catch(e => {
      if (e.response.data.statusCode === 409) {
        localStorage.setItem("nicknameAuthorize", false);
        swal.fire({
          title: "",
          text: "이미 있는 닉네임입니다.",
          icon: "error",
        });
      }
      if (e.response.data.statusCode === 500) {
        localStorage.setItem("nicknameAuthorize", false);
        swal.fire({
          title: "서버오류",
          text: "메인으로 이동합니다.",
          icon: "error",
        });
        navigate("/");
      }
      console.log(e, "아오");
    });

  return test;
}
// const Verify = async params => {
//   // let response;
//   try {
//     const response = await axios.get(
//       "http://localhost:8080/user/nickname",
//       { params },
//       {
//         headers: {
//           "Content-type": "application/json;charset=UTF-8",
//         },
//         withCredentials: true,
//       }
//     );
//     // data.then(function (res) {
//     //   response = JSON.stringify(res);
//     //   console.log(response);
//     //   console.log(res);
//     // });
//     const data = response.data;
//     console.log(data);
//     console.log(response);
//   } catch (e) {}
// };

// export default Verify;
