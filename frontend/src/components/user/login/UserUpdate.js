import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import instance from "components/api/APIController";

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
  const validationSchema = yup.object({
    password: yup
      .string("Enter your password")
      .min(8, "숫자+영문자+특수문자로 8글자 이상 입력해주세요")
      .matches(/[0-9]/, "비밀번호에 숫자가 포함되어야 합니다.")
      .matches(/[^\w]/, "비밀번호에 특수문자가 포함되어야 합니다."),
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
      password: "",
      introduction: BEFORE_INTRODUCTION,
      gender: BEFORE_GENDER,
      name: BEFORE_NAME,
      phone: BEFORE_PHONE,
      birth: BEFORE_BIRTH,
      passwordConfirm: "",
      email: BEFORE_EMAIL,
    },
    // validationSchema: validationSchema,
    onSubmit: response => {
      let values = {
        // "birth": this.birth,
        // "email": this.email,
        // "gender": this.gender,
        // "introduction": this.introduction,
        // "name": this.name,
        // "nickname": this.nickname,
        // "password": this.password,
        // "phone": this.phone,
        birth: "1994-04-26",
        email: "jos9404@naver.com",
        gender: "M",
        introduction: "안녕하세요 저는 착한 사람입니다.",
        name: "지원석",
        isEmailAuthorized: 1,
        isKakao: 1,
        nickname: "커플600일차",
        password: "1234",
        phone: "01099130059",
      };

      alert(JSON.stringify(values, null, 2));
      instance
        .put("http://localhost:8080/user", JSON.stringify(values), {
          headers: {
            "Content-type": "application/json;charset=UTF-8",
            // Accept: "application/json",
            "Access-Control-Allow-Origin": "http://localhost:8080",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        })
        .then(values => {
          console.log(values);
        })
        .catch(e => {
          if (e.response.data.statusCode === 400) {
            alert("잘못된 비밀번호입니다.");
          }
          if (e.response.data.statusCode === 401) {
            console.log("토큰 만료~~");
          }
          if (e.response.data.statusCode === 403) {
            console.log("엑세스 토큰을 주시오~~~");
          }
        });
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <form onSubmit={formik.handleSubmit}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar> */}
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
              회원정보 수정
            </Typography>
            <Grid container spacing={2}>
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
              {/* <Grid item xs={3}>
                <Button
                  variant="outlined"
                  endIcon={<VerifiedUserIcon />}
                  onClick={verifyEmail}
                >
                  인증하기
                </Button>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  fullWidth
                  id="checkNumber"
                  name="checkNumber"
                  label="인증번호 확인"
                  value={number}
                  onChange={numberChange}
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  type="submit"
                  variant="outlined"
                  onClick={verifyCheck}
                  // sx={{ mt: 3, mb: 2 }}
                >
                  인증번호확인
                </Button>
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passwordConfirm"
                  label="PasswordConfirm"
                  type="password"
                  id="passwordConfirm"
                  onChange={formik.handleChange}
                  value={formik.values.passwordConfirm}
                  // onBlur={formik.handleBlur}
                  error={
                    formik.touched.passwordConfirm &&
                    Boolean(formik.errors.passwordConfirm)
                  }
                  helperText={
                    formik.touched.passwordConfirm &&
                    formik.errors.passwordConfirm
                  }
                  onBlur={formik.handleBlur}
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
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </form>

        {/* </Box> */}
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
