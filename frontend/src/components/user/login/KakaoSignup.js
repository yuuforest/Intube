import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import http from "api/Http";
import { useNavigate } from "react-router";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { VerifyNickname } from "api/verifyNickname";
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
  const nicknameCheck = () => {
    if (nickname === "") {
      alert("닉네임을 기입해주세요!");
    } else {
      VerifyNickname(nickname);
      setNicknameAuthorize(localStorage.getItem("nicknameAuthorize"));
      console.log(localStorage.getItem("nicknameAuthorize"));
      localStorage.removeItem("nicknameAuthorize");
    }
  };
  const [nicknameAuthorize, setNicknameAuthorize] = useState(false);
  const [nickname, setNickname] = useState("");
  const nicknameChange = ({ target: { value } }) => setNickname(value);

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("올바른 이메일 형식이 아닙니다."),
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
  const KAKAO_EMAIL = localStorage.getItem("kakaoEmail");
  // const KAKAO_GENDER = localStorage.getItem("kakaoGender");
  const KAKAO_NICKNAME = localStorage.getItem("kakaoNickname");
  const formik = useFormik({
    initialValues: {
      email: KAKAO_EMAIL,
      nickname: KAKAO_NICKNAME,
      password: "",
      introduction: "",
      gender: "",
      name: "",
      phone: "",
      birth: "",
      passwordConfirm: "",
    },
    validationSchema: validationSchema,
    onSubmit: (response) => {
      if (nicknameAuthorize) {
        let values = {
          birth: response.birth,
          email: response.email,
          gender: response.gender,
          introduction: response.introduction,
          name: response.name,
          nickname: response.nickname,
          password: response.password,
          phone: response.phone,
          isEmailAuthorized: 1,
          isKakao: 1,
          // birth: "1994-04-26",
          // email: "jos9404@naver.com",
          // gender: "M",
          // introduction: "안녕하세요 저는 착한 사람입니다.",
          // name: "지원석",
          // nickname: "커플600일차",
          // password: "1234",
          // phone: "01099130059",
        };
        alert(JSON.stringify(values, null, 2));
        http
          .post("/user", JSON.stringify(values), {
            headers: {
              "Content-type": "application/json;charset=UTF-8",
              // Accept: "application/json",
              "Access-Control-Allow-Origin": "https://intube.store:8443/api",
            },
            withCredentials: true,
          })
          .then((values) => {
            if (values.data.statusCode === 200) {
              const ACCESS_TOKEN = values.data.accessToken;

              localStorage.setItem("token", ACCESS_TOKEN); //예시로 로컬에 저장함
              localStorage.getItem("token");

              alert("회원가입 되었습니다.");
              navigate("/"); // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
            }
            // console.log(values);
            // navigate("/");
          })
          .catch((e) => {
            if (e.response.data.statusCode === 409) {
              alert("이미 가입된 이메일입니다.");
            }
          });
      } else {
        alert("닉네임 중복확인 해주세요");
      }
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  disabled
                  required
                />
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
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="birth"
                  required
                  fullWidth
                  id="birth"
                  label="birth"
                  autoFocus
                  onChange={formik.handleChange}
                  value={formik.values.birth}
                  error={formik.touched.birth && Boolean(formik.errors.birth)}
                  helperText={formik.touched.birth && formik.errors.birth}
                  onBlur={formik.handleBlur}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  name="nickname"
                  required
                  fullWidth
                  id="nickname"
                  label="닉네임"
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
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    Gender
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
                      label="Female"
                    />
                    <FormControlLabel
                      value="M"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                </FormControl>
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
