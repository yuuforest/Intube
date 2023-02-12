import Swal from "sweetalert2";

export function DeleteUser() {
  Swal.fire({
    title: "정말 탈퇴하시겠습니까?😥😥",
    // text: "확인을 위해 비밀번호를 입력해주세요",
    html:
      "You can use <b>bold text</b>, " +
      '<a href="//sweetalert2.github.io">links</a> ' +
      "and other HTML tags",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Look up",
    showLoaderOnConfirm: true,
    preConfirm: password => {
      return fetch(`//api.github.com/users/${password}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .catch(error => {
          Swal.showValidationMessage(`Request failed: ${error}`);
        });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then(result => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `${result.value.login}'s avatar`,
        // imageUrl: result.value.avatar_url,
      });
    }
  });
}
