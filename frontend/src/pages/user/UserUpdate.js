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
import instance from "components/api/APIController";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";

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
      .length(10, "ex) 2000-04-04")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
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
  const BEFORE_BIRTH = localStorage.getItem("birth");
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
    validationSchema: validationSchema,
    onSubmit: response => {
      let values = {
        birth: response.birth,
        email: response.email,
        gender: response.gender,
        introduction: response.introduction,
        name: response.name,
        nickname: response.nickname,
        password: localStorage.getItem("password"),
        phone: response.phone,
        // birth: "1994-04-26",
        // email: "jos9404@naver.com",
        // gender: "M",
        // introduction: "안녕하세요 저는 착한 사람입니다.",
        // name: "지원석",
        // nickname: "커플600일차",
        // password: localStorage.getItem("password"),
        // phone: "01099130059",
      };
      alert(JSON.stringify(values, null, 2));
      instance
        .put("http://i8a303.p.ssafy.io:8081/user", JSON.stringify(values), {
          headers: {
            "Content-type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "http://i8a303.p.ssafy.io:8081",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        })
        .then(values => {
          console.log(values);
          if (values.data.statusCode === 200) {
            alert("비밀번호가 변경되었습니다. 다시 로그인해주세요");
            navigate("/");
          }
        })
        .catch(e => {
          if (e.response.data.statusCode === 400) {
            alert("잘못된 비밀번호입니다.");
          }
          if (e.response.data.statusCode === 401) {
            console.log("권한 없음. 다시 로그인해주세요");
            localStorage.clear();
            navigate("/"); // 에러페이지로 이동
          }
          if (e.response.data.statusCode === 403) {
            alert("403 Forbidden");
            localStorage.clear();
            navigate("/"); // 에러페이지로 이동
          }
          if (e.response.data.statusCode === 500) {
            console.log("서버 에러. 다시 로그인해주세요");
            localStorage.clear();
            navigate("/"); // 에러페이지로 이동
          }
        });
    },
  });
  const [image, setImg] = useState("");

  const onChangeImg = async event => {
    event.preventDefault();
    // console.log(event);
    // console.log("image", event.target.files[0]);
    setImg(event.target.files[0]);
    // const formData = new FormData();
    // formData.append();
    // console.log(formData);
    // const response = await axios.post(
    //   "http://i8a303.p.ssafy.io:8081/user/image",
    //   {
    //     headers: {
    //       // "Content-Type": "application/json; charset=utf-8",
    //       "Content-Type": "multipart/form-data",
    //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //     },
    //   },
    //   { withCredentials: true },
    //   formData
    // );
    // console.log(response);
  };

  const handleImg = () => {
    const formData = new FormData();
    formData.append("image", image);
    // console.log(image);
    /*key 확인하기 */
    for (let key of formData.keys()) {
      console.log(key);
    }
    /* value 확인하기 */
    for (let value of formData.values()) {
      console.log(value);
    }
    axios
      .post(
        "http://i8a303.p.ssafy.io:8081/user/image",
        {
          headers: {
            accept: "application/json;charset=utf-8",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
        { withCredentials: true },
        formData
      )
      .then(({ data }) => {
        console.log(data);
        if (data.statusCode === 200) {
        }
      })
      .catch(e => {
        if (e.response.data.statusCode === 400) {
          alert("비밀번호가 틀렸습니다.");
        }
        console.log(e);
      });
  };
  React.useEffect(() => {});
  function deleteUser() {}

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
            {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar> */}
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
              회원정보 수정
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <img src={localStorage.getItem("profile_url")} alt="dfdf"></img>
              </Grid>
              <Grid item xs={6}>
                <input
                  type="file"
                  accept="image/jpg,impge/png,image/jpeg,image/gif"
                  id="file"
                  // value={image}
                  name="file"
                  // value={img || ""}
                  onChange={onChangeImg}
                ></input>
              </Grid>
              <Grid item xs={6}>
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
              <Grid item xs={12}>
                <TextField
                  name="phone"
                  label="phone"
                  id="phone"
                  required
                  fullWidth
                  autoFocus
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                  onBlur={formik.handleBlur}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  onBlur={formik.handleBlur}
                  required
                  disabled
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="birth"
                  required
                  fullWidth
                  id="birth"
                  label="birth"
                  // autoFocus
                  onChange={formik.handleChange}
                  value={formik.values.birth}
                  error={formik.touched.birth && Boolean(formik.errors.birth)}
                  helperText={formik.touched.birth && formik.errors.birth}
                  onBlur={formik.handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="nickname"
                  required
                  fullWidth
                  id="nickname"
                  label="nickname"
                  // autoFocus
                  onChange={formik.handleChange}
                  value={formik.values.nickname}
                  error={
                    formik.touched.nickname && Boolean(formik.errors.nickname)
                  }
                  helperText={formik.touched.nickname && formik.errors.nickname}
                  onBlur={formik.handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="gender"
                  label="gender"
                  id="gender"
                  onChange={formik.handleChange}
                  value={formik.values.gender}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="introduction"
                  required
                  fullWidth
                  id="introduction"
                  label="introduction"
                  autoFocus
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
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
          <Grid item xs={12}></Grid>
        </Box>

        {/* </Box> */}
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
