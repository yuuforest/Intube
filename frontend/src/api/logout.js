import http from "api/Http";
export function logout() {
  function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:10 GMT;";
  }
  console.log("hi");
  console.log(localStorage.getItem("accessToken"));
  http
    .delete("/auth/logout", {
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        // Accept: "application/json",
        // "Access-Control-Allow-Origin": "http://localhost:8080",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      withCredentials: true,
    })
    .then(({ data }) => {
      console.log("엑세스토큰 기한 안에 로그아웃");
      if (data.statusCode === 200) {
        localStorage.clear();
        console.log("refreshToken" + document.cookie);
        deleteCookie("refreshToken");
        console.log(data);
        window.location.replace("/");
      }
    })
    .catch(e => {
      if (e.response.data.status === 400) {
        alert("비밀번호가 틀렸습니다.");
      }
      if (e.response.data.status === 403) {
        console.log("헤더에 토큰 안보낸 듯?????");
      }
      if (e.response.data.status === 404) {
        console.log("없는 유저");
      }
      if (e.response.data.status === 401) {
        http
          .get(
            "/auth/issue",
            {
              headers: {
                "Content-Type": "application/json; charset=utf-8",
              },
            },
            { withCredentials: true }
          )
          .then(
            ({ data }) => localStorage.setItem("accessToken", data.accessToken),
            console.log("엑세스토큰 재발급 다시 로그아웃 버튼 눌러주세요"),
            http
              .delete("/auth/logout", {
                headers: {
                  "Content-type": "application/json;charset=UTF-8",
                  // Accept: "application/json",
                  // "Access-Control-Allow-Origin": "http://localhost:8080",
                  Authorization: `Bearer ${localStorage.getItem(
                    "accessToken"
                  )}`,
                },
                withCredentials: true,
              })
              .then(({ data }) => {
                console.log("엑세스토큰 재발급 후 로그아웃 리다이렉트");
                if (data.statusCode === 200) {
                  localStorage.removeItem("accessToken");
                  console.log(data);
                  window.location.replace("/");
                }
              })
          )
          .catch(e => {
            if (e.response.data.statusCode === 401) {
              localStorage.clear();
              deleteCookie("refreshToken");
              console.log("refreshToken 만료. 다시 로그인 해주세요");
              window.location.replace("/");
            }
            console.log(e, "dfdfdffdfd");
          });
        // alert("등록된 회원이 아닙니다.");
      }
      console.log(e, "아오 ");
    });
}

// export default logout;
