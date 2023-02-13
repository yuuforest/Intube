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
import { useNavigate } from "react-router";
import instance from "api/APIController";
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

export default function CheckPassword() {
  function getUserInfo() {
    if (localStorage.getItem("accessToken") !== null) {
      instance
        .get("/user/me", {
          headers: {
            "Content-type": "application/json;charset=UTF-8",
            // Accept: "application/json",
            // "Access-Control-Allow-Origin": "http://localhost:8080",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        })
        .then(({ data }) => {
          console.log(data); // 토큰이 넘어올 것임
          if (data.statusCode === 200) {
            console.log("여기 회원정보있음.");
            localStorage.setItem("email", data.email);
            localStorage.setItem("nickname", data.nickname);
            localStorage.setItem("introduction", data.introduction);
            localStorage.setItem("gender", data.gender);
            localStorage.setItem("phone", data.phone);
            localStorage.setItem("name", data.name);
            localStorage.setItem("birth", data.birth);
            localStorage.setItem("profile_url", data.profile_url);
          }
        })
        .catch(e => {
          console.log(e);
          if (e.response.data.status === 401) {
            console.log("토큰만료");
          }
          if (e.response.data.status === 403) {
            console.log("권한 없음");
          }
        });
    } else {
      swal.fire({
        title: "",
        text: "로그인 되지 않았습니다!",
        icon: "error",
      });
      navigate("/");
    }
  }

  const navigate = useNavigate();
  const validationSchema = yup.object({
    password: yup
      .string("Enter your password")
      // .min(8, "숫자+영문자+특수문자로 8글자 이상 입력해주세요")
      .matches(/[0-9]/, "비밀번호에 숫자가 포함되어야 합니다."),
    // .matches(/[^\w]/, "비밀번호에 특수문자가 포함되어야 합니다."),
  });
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: response => {
      let values = {
        password: response.password,
        // // password: "1234",
        // password: "5678",
      };
      // alert(JSON.stringify(values, null, 2));
      instance
        .post("/auth/check-password", JSON.stringify(values), {
          headers: {
            "Access-Control-Allow-Origin": "https://intube.store:8443/api",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        })
        .then(Response => {
          console.log(Response);
          if (Response.data.statusCode === 200) {
            navigate("/userupdate"); // 비밀번호 확인 되었으니 회원정보 수정 창으로
          }
        })
        .catch(e => {
          if (e.response.data.statusCode === 400) {
            alert("비밀번호가 틀렸습니다.");
          }
          if (e.response.data.statusCode === 403) {
            alert("403 Forbidden");
            localStorage.clear();
            navigate("/"); // 에러페이지로 이동
          }
          console.log(e, "뭐가 문젠데");
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
              marginTop: 15,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              비밀번호 확인
            </Typography>

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="비밀번호를 입력해주세요"
              type="password"
              id="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Grid container>
              <Grid item xs={4}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2, mb: 2 }}
                  onClick={getUserInfo}
                >
                  비밀번호 확인
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
        <Copyright sx={{ mt: 4, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
