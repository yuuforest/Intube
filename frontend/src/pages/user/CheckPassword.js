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
import APIController from "../../components/api/APIController";
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

export default function SignIn() {
  function getUserInfo() {
    instance
      .get("http://localhost:8080/user/me", {
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
        }
      })
      .catch(e => {
        if (e.response.data.status === 401) {
          console.log("토큰만료");
        }
        if (e.response.data.status === 403) {
          console.log("권한 없음");
        }
      });
  }

  const navigate = useNavigate();
  const validationSchema = yup.object({
    password: yup
      .string("Enter your password")
      .min(8, "숫자+영문자+특수문자로 8글자 이상 입력해주세요")
      .matches(/[0-9]/, "비밀번호에 숫자가 포함되어야 합니다.")
      .matches(/[^\w]/, "비밀번호에 특수문자가 포함되어야 합니다."),
  });
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    // validationSchema: validationSchema,
    onSubmit: response => {
      let values = {
        // password: this.password,
        password: "1234",
      };
      alert(JSON.stringify(values, null, 2));
      APIController.post(
        "http://localhost:8080/auth/check-password",
        JSON.stringify(values),
        {
          headers: {
            "Content-type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "http://localhost:8080",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        }
      )
        .then(Response => {
          console.log(Response);
          if (Response.data.statusCode === 200) {
            navigate("/userupdate"); // 비밀번호 확인 되었으니 회원정보 수정 창으로
            console.log(localStorage.getItem("email"));
          }
        })
        .catch(e => {
          if (e.response.data.statusCode === 400) {
            alert("비밀번호가 틀렸습니다.");
          }
          if (e.response.data.statusCode === 403) {
            alert("403 Forbidden");
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
              비밀번호 확인
            </Typography>

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
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
                  sx={{ mt: 3, mb: 2 }}
                  onClick={getUserInfo}
                >
                  비밀번호 확인
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
