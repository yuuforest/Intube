import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import instance from "api/APIController";
import http from "api/Http";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { VerifyNickname } from "api/verifyNickname";
import { DeleteUser } from "components/user/login/DeleteUser";
import swal from "sweetalert2";
import "./UserUpdate.css";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  function changePassword() {
    navigate("/changepassword");
  }
  const validationSchema = yup.object({
    name: yup.string("문자를 입력해주세요"),
    nickname: yup
      .string("Enter your password")
      .min(2, "2글자 이상의 닉네임을 입력해주세요"),
    birth: yup
      .string("Enter your password")
      .length(8, "ex) 20000404")
      .matches(
        /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/,
        "올바른 형식이 아닙니다."
      ),
    phone: yup.string("Enter your password"),
    gender: yup.string("Enter your password"),
    introduction: yup
      .string("Enter your password")
      .min(5, "5글자 이상 입력해주세요"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], 'Must match "password" field value'),
  });

  const BEFORE_EMAIL = localStorage.getItem("email");
  const BEFORE_NICKNAME = localStorage.getItem("nickname");
  const BEFORE_INTRODUCTION = localStorage.getItem("introduction");
  const BEFORE_NAME = localStorage.getItem("name");
  const BEFORE_PHONE = localStorage.getItem("phone");
  const birth = localStorage.getItem("birth");
  const BEFORE_BIRTH =
    birth.substring(0, 4) + birth.substring(5, 7) + birth.substring(8);
  const BEFORE_GENDER = localStorage.getItem("gender");

  const formik = useFormik({
    initialValues: {
      nickname: BEFORE_NICKNAME,
      introduction: BEFORE_INTRODUCTION,
      gender: BEFORE_GENDER,
      name: BEFORE_NAME,
      phone: BEFORE_PHONE,
      birth: BEFORE_BIRTH,
      email: BEFORE_EMAIL,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (response) => {
      let birthAdd =
        response.birth.substring(0, 4) +
        "-" +
        response.birth.substring(4, 6) +
        "-" +
        response.birth.substring(6);
      const nicknameLast = nickname !== "" ? nickname : BEFORE_NICKNAME;
      let values = {
        birth: birthAdd,
        email: response.email,
        gender: response.gender,
        introduction: response.introduction,
        name: response.name,
        nickname: nicknameLast,
        // password: userInfo,
        phone: response.phone,
      };
      // alert(JSON.stringify(values, null, 2));
      instance
        .put("/user", JSON.stringify(values), {
          headers: {
            "Content-type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "https://intube.store:8443/api",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        })
        .then((values) => {
          console.log(values);
          if (values.data.statusCode === 200) {
            swal.fire(
              "회원정보가 수정되었습니다.",
              "다시 로그인 해주세요!",
              "success"
            );
            localStorage.clear();
            navigate("/");
          }
        })
        .catch((e) => {
          if (e.response.data.statusCode === 400) {
            swal.fire("", "잘못된 비밀번호입니다.", "error");
          }
          if (e.response.data.statusCode === 401) {
            swal.fire("", "권한 없음. 다시 로그인해주세요", "error");
            localStorage.clear();
            navigate("/"); // 에러페이지로 이동
          }
          if (e.response.data.statusCode === 403) {
            alert("403 Forbidden");
            swal.fire("", "403 Forbidden", "error");
            localStorage.clear();
            navigate("/"); // 에러페이지로 이동
          }
          if (e.response.data.statusCode === 500) {
            swal.fire("", "서버 에러 다시 로그인 해주세요", "error");

            localStorage.clear();
            navigate("/"); // 에러페이지로 이동
          }
        });
    },
  });
  const [image, setImg] = useState("");

  const onChangeImg = async (event) => {
    event.preventDefault();
    setImg(event.target.files[0]);
    console.log(userImg);
  };
  const [nickname, setNickname] = useState("");
  const nicknameChange = ({ target: { value } }) => setNickname(value);
  //닉네임 변경하기 함수
  const nicknameCheck = () => {
    if (nickname === "") {
      swal.fire("", "닉네임을 입력해주세요", "warning");
    } else {
      VerifyNickname(nickname);
    }
  };
  //이미지 변경 함수
  const handleImg = () => {
    const formData = new FormData();
    formData.append("image", image);
    console.log(localStorage.getItem("accessToken"));
    /*key 확인하기 */
    for (let key of formData.keys()) {
      console.log(key);
    }
    /* value 확인하기 */
    for (let value of formData.values()) {
      console.log(value);
    }
    http({
      url: "/user/image",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      data: formData,
    })
      .then(({ data }) => {
        // console.log(data);
        if (data.statusCode === 200) {
          console.log("변경완료");
          swal
            .fire({
              title: "프로필 사진이 변경되었습니다.",
              text: "메인으로 이동하시겠습니까?",
              icon: "success",

              confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
              confirmButtonText: "메인으로 이동", // confirm 버튼 텍스트 지정

              // reverseButtons: true, // 버튼 순서 거꾸로
            })
            .then((result) => {
              if (result.isConfirmed) {
                navigate("/"); // 에러페이지로 이동
              }
            });
        }
      })
      .catch((e) => {
        if (e.response.data.status === 400) {
          swal.fire("", "파일을 선택해주세요", "warning");
        }
        console.log(e);
      });
  };

  //이미지를 쓰기위해서 useeffect로 db에 있는 기존 이미지를 데리고 오기.
  const [userImg, setUserImg] = useState({ name: "" });
  useEffect(() => {
    getUser();
  }, [userImg]);

  const getUser = async () => {
    await http
      .get("/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setUserImg(
          `https://303-intube.s3.ap-northeast-2.amazonaws.com/${response.data.profile_url}`
        );
      })
      .catch((error) => {
        if (error.response.status === 401) {
          console.log("엑세스 토큰 없음~");
        }
      });
  };

  function deleteUser() {
    DeleteUser();
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Typography
              component="h1"
              variant="h4"
              sx={{
                mb: 2,
                // border: "1px black solid",
                display: "flex",
                justifyContent: "center",
              }}
            >
              회원 정보 수정
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={3}></Grid>
              <Grid item xs={9}>
                <img className="userImg" src={userImg} alt="왜안돼"></img>
              </Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={9}>
                <input
                  type="file"
                  accept="image/jpg,impge/png,image/jpeg,image/gif"
                  id="file"
                  // value={userImg || ""}
                  name="file"
                  // value={img || ""}
                  onChange={onChangeImg}
                ></input>
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={8}>
                <Button onClick={handleImg} variant="contained">
                  프로필 변경하기
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={changePassword}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  비밀번호 변경
                </Button>
              </Grid>
              <Grid item xs={12} sx={{ ml: 1, mb: -2 }}>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  휴대폰 번호
                </FormLabel>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="phone"
                  // label="휴대폰 번호"
                  id="phone"
                  required
                  fullWidth
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                  onBlur={formik.handleBlur}
                />
              </Grid>
              <Grid item xs={12} sx={{ ml: 1, mb: -2 }}>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  이메일
                </FormLabel>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  // label="이메일"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  onBlur={formik.handleBlur}
                  required
                  disabled
                />
              </Grid>
              <Grid item xs={12} sx={{ ml: 1, mb: -2 }}>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  이름
                </FormLabel>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  // label="이름"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12} sx={{ ml: 1, mb: -2 }}>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  생년월일
                </FormLabel>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="birth"
                  required
                  fullWidth
                  id="birth"
                  // label="생년월일"
                  // autoFocus
                  onChange={formik.handleChange}
                  value={formik.values.birth}
                  error={formik.touched.birth && Boolean(formik.errors.birth)}
                  helperText={formik.touched.birth && formik.errors.birth}
                  onBlur={formik.handleBlur}
                />
              </Grid>
              <Grid item xs={12} sx={{ ml: 1, mb: -2 }}>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  닉네임
                </FormLabel>
              </Grid>

              <Grid item xs={10}>
                <TextField
                  name="nickname"
                  fullWidth
                  id="nickname"
                  // label="변경하고 싶은 닉네임"
                  // autoFocus
                  onChange={nicknameChange}
                  value={nickname}
                  onBlur={formik.handleBlur}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="outlined"
                  name="nicknameAuthorize"
                  onClick={nicknameCheck}
                >
                  중복확인
                </Button>
              </Grid>
              <Grid item xs={12} sx={{ ml: 1 }}>
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    성별
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                  >
                    <FormControlLabel
                      value="F"
                      control={<Radio />}
                      label="여"
                    />
                    <FormControlLabel
                      value="M"
                      control={<Radio />}
                      label="남"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ ml: 1, mb: -2 }}>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  자기소개
                </FormLabel>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="introduction"
                  required
                  fullWidth
                  id="introduction"
                  // label="자기소개"
                  multiline
                  onChange={formik.handleChange}
                  value={formik.values.introduction}
                  error={
                    formik.touched.introduction &&
                    Boolean(formik.errors.introduction)
                  }
                  helperText={
                    formik.touched.introduction && formik.errors.introduction
                  }
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Button
              onClick={deleteUser}
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              회원탈퇴
            </Button>
          </form>
          <Grid item xs={12}></Grid>
        </Box>

        {/* </Box> */}
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
