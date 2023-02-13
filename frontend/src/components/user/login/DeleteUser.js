import Swal from "sweetalert2";
import instance from "api/APIController";

export function DeleteUser() {
  function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:10 GMT;";
  }
  // const navigate = useNavigate();
  Swal.fire({
    title: "정말 탈퇴하시겠습니까?😥😥",
    // text: "확인을 위해 비밀번호를 입력해주세요",
    html: "탈퇴하시려면 '회원탈퇴에 동의합니다.'를 입력해주세요..",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    cancelButtonText: "취소하기",
    confirmButtonText: "탈퇴하기",
    showLoaderOnConfirm: true,

    preConfirm: password => {
      console.log(password);
      if (password === "회원탈퇴에 동의합니다.") {
        instance
          .delete("/user", {
            headers: {
              "Access-Control-Allow-Origin": "https://intube.store:8443/api",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            withCredentials: true,
          })
          .then(Response => {
            console.log(Response);
            if (Response.data.statusCode === 200) {
              localStorage.clear();
              deleteCookie("refreshToken");
              Swal.fire({
                title: "계정탈퇴 완료!!",
                text: "다음에 또 만나요🤗🤗",
                icon: "success",

                confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
                confirmButtonText: "메인으로 이동", // confirm 버튼 텍스트 지정
              }).then(result => {
                // 만약 Promise리턴을 받으면,
                if (result.isConfirmed) {
                  window.location.replace("/");
                }
              });
            }
          })
          .catch(e => {
            if (e.response.data.statusCode === 400) {
              alert("비밀번호가 틀렸습니다.");
            }
            if (e.response.data.statusCode === 403) {
              alert("403 Forbidden");
              localStorage.clear();
              deleteCookie("refreshToken");
            }
            console.log(e, "뭐가 문젠데");
          });
      } else {
        Swal.fire({
          title: "올바른 문장이 아닙니다.",
          text: "다시 입력해주세요",
          icon: "warning", // Alert 타입
        });
      }
    },
  });
}
