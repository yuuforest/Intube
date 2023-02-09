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
import { KAKAO_AUTH_URL } from "components/user/login/OAuth";

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

export default function SignIn() {
  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("올바른 이메일 형식이 아닙니다."),
    password: yup
      .string("Enter your password")
      // .min(8, "숫자+영문자+특수문자로 8글자 이상 입력해주세요")
      .matches(/[0-9]/, "비밀번호에 숫자가 포함되어야 합니다."),
    // .matches(/[^\w]/, "비밀번호에 특수문자가 포함되어야 합니다."),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: response => {
      let values = {
        email: response.email,
        password: response.password,
      };
      // alert(JSON.stringify(values, null, 2));
      http
        .post("/auth/login", JSON.stringify(values), {
          headers: {
            "Access-Control-Allow-Origin": "https://intube.store:8443/api",
          },
          withCredentials: true,
        })
        .then(({ data }) => {
          if (data.statusCode === 200) {
            localStorage.setItem("accessToken", data.accessToken);
            console.log(data);
            console.log("엑세스토큰 :", localStorage.getItem("accessToken"));
            window.location.replace("/"); // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
          }
        })
        .catch(e => {
          if (e.response.data.statusCode === 401) {
            alert("비밀번호가 틀렸습니다.");
          }
          if (e.response.data.statusCode === 404) {
            alert("등록된 회원이 아닙니다.");
          }
          console.log(e);
        });
    },
  });
  function kakaoLogin() {
    console.log("hi");
    window.location.replace(KAKAO_AUTH_URL);
    // let code = new URL(window.location.href);
    // console.log(code);
    // localStorage.setItem("code", code);
  }

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
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              onBlur={formik.handleBlur}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Grid container>
              <Grid item xs={4}>
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                  LOG IN
                </Button>
              </Grid>
              <Grid item xs={8}>
                <Button
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  // href={KAKAO_AUTH_URL}
                  onClick={kakaoLogin}
                >
                  Log in for Kakao
                </Button>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs>
                <Link href="/findUser" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </form>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
