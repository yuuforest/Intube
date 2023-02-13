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
import http from "api/Http";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { verifySend } from "api/verifySend";
import { EmailCheck } from "api/verifyCheck";
import { VerifyNickname } from "api/verifyNickname";
import { useNavigate } from "react-router";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useState, useEffect } from "react";
import Timer from "components/user/login/Timer";
import swal from "sweetalert2";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        INTUBE
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
    }
  };
  const verifyEmail = () => {
    console.log(email);
    verifySend(email);
    setEmailSecret(true);
  };
  const verifyCheck = () => {
    EmailCheck(email, number);
  };
  const [emailSecret, setEmailSecret] = useState(false);
  const [timeRender, setTimeRender] = useState(false);
  const [email, setEmail] = useState("");
  const emailChange = ({ target: { value } }) => setEmail(value);
  const [number, setNumber] = useState("");
  const numberChange = ({ target: { value } }) => setNumber(value);
  const [nickname, setNickname] = useState("");
  const nicknameChange = ({ target: { value } }) => setNickname(value);
  useEffect(() => {
    setTimeRender(true);
  }, [verifyEmail]);
  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("올바른 이메일 형식이 아닙니다."),
    password: yup
      .string("Enter your password")
      // .min(8, "숫자+영문자+특수문자로 8글자 이상 입력해주세요")
      .matches(/[0-9]/, "비밀번호에 숫자가 포함되어야 합니다."),
    // .matches(/[^\w]/, "비밀번호에 특수문자가 포함되어야 합니다."),
    name: yup.string("문자를 입력해주세요"),
    nickname: yup
      .string("Enter your password")
      .min(2, "2글자 이상의 닉네임을 입력해주세요"),
    birth: yup
      .string("Enter your password")
      .length(10, "ex) 2000-01-01")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "올바른 형식이 아닙니다."
      ),
    phone: yup
      .string()
      .matches(/[0-9]/, "'-'를 제외한 휴대폰 번호를 입력해주세요"),
    gender: yup.string("Enter your password"),
    introduction: yup
      .string("Enter your password")
      .max(100, "100글자 이하로 입력해주세요"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], 'Must match "password" field value'),
    nicknameAuthorize: yup.boolean().oneOf([true], "닉네임 인증을 해주세요"),
  });
  // const abce = () => {
  //   formik.handleSubmit;
  // };
  const formik = useFormik({
    initialValues: {
      email: "",
      nickname: "",
      password: "",
      introduction: "",
      gender: "",
      name: "",
      phone: "",
      birth: "",
      passwordConfirm: "",
    },
    validationSchema: validationSchema,

    onSubmit: response => {
      if (localStorage.getItem("nicknameAuthorize")) {
        if (localStorage.getItem("emailAuthorize")) {
          let values = {
            birth: response.birth,
            email: email,
            // email: response.email,
            gender: response.gender,
            introduction: response.introduction,
            name: response.name,
            nickname: nickname,
            password: response.password,
            phone: response.phone,
            // birth: "1994-04-26",
            // email: "jos9404@naver.com",
            // gender: "M",
            // introduction: "안녕하세요 저는 착한 사람입니다.",
            // name: "지원석",
            isEmailAuthorized: 1,
            isKakao: 0,
            // nickname: "커플600일차",
            // password: "1234",
            // phone: "01099130059",
          };

          // alert(JSON.stringify(values, null, 2));
          http
            .post("/user", JSON.stringify(values), {
              headers: {
                "Access-Control-Allow-Origin": "https://intube.store:8443/api",
              },
              withCredentials: true,
            })
            .then(values => {
              console.log(values);
              localStorage.clear();
              swal.fire({
                title: "회원가입 되었습니다.",
                text: "환영합니다!!😁😀",
                icon: "success",

                confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
                confirmButtonText: "메인으로 이동", // confirm 버튼 텍스트 지정
              });
              // .then(result => {
              //   // 만약 Promise리턴을 받으면,
              //   if (result.isConfirmed) {
              //     window.location.replace("/");
              //   }
              // });
              navigate("/");
            })
            .catch(e => {
              if (e.response.data.statusCode === 409) {
                alert("이미 가입된 이메일입니다.");
              }
            });
        } else {
          alert("이메일 인증 해주세요");
        }
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
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
              회원가입
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={email}
                  onChange={emailChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  onBlur={formik.handleBlur}
                  required
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="outlined"
                  endIcon={<VerifiedUserIcon />}
                  onClick={() => {
                    verifyEmail();
                    setTimeRender(!timeRender);
                  }}
                  //
                >
                  인증하기
                </Button>
              </Grid>

              <Grid item xs={7}>
                {emailSecret ? (
                  <TextField
                    fullWidth
                    id="checkNumber"
                    name="checkNumber"
                    label="인증번호 확인"
                    value={number}
                    onChange={numberChange}
                  />
                ) : (
                  false
                )}
              </Grid>
              <Grid item xs={2}>
                {emailSecret ? timeRender ? <Timer /> : false : false}
              </Grid>
              <Grid item xs={3}>
                {emailSecret ? (
                  <Button
                    // type="submit"
                    variant="outlined"
                    onClick={verifyCheck}
                    // sx={{ mt: 3, mb: 2 }}
                  >
                    인증번호확인
                  </Button>
                ) : (
                  false
                )}
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

              <Grid item xs={10}>
                <TextField
                  name="nickname"
                  required
                  fullWidth
                  id="nickname"
                  label="닉네임"
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
              // disabled={!(formik.dirty && formik.isValid)}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/user/login" variant="body2">
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
