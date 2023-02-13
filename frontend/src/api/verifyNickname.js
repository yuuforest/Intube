import http from "api/Http";

export async function VerifyNickname(nickname) {
  let params = {
    // email: "abcdq12345@naver.com",
    // number: "rqDsyUYU",
    nickname: nickname,
  };
  console.log(nickname);
  let test = await http
    .get(
      "https://intube.store:8443/api/user/nickname",
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
        alert("사용 가능한 닉네임입니다.");
      }
    })
    .catch(e => {
      if (e.response.data.statusCode === 409) {
        localStorage.setItem("nicknameAuthorize", false);
        alert("이미 있는 닉네임입니다.");
      }
      if (e.response.data.statusCode === 500) {
        localStorage.setItem("nicknameAuthorize", false);
        alert("서버 오류");
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
