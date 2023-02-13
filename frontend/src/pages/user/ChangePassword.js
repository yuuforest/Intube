import React from "react";
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
import instance from "api/APIController";
import { useNavigate } from "react-router";
import swal from "sweetalert2";
// import { useEffect, useState } from "react";
// import http from "api/Http";

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

export default function ChangePassword() {
  // const [userInfo, setUserInfo] = useState({ name: "" });
  // useEffect(() => {
  //   getUser();
  // }, []);
  // const getUser = () => {
  //   http
  //     .get("/user/me", {
  //       headers: {
  //         "Content-type": "application/json;charset=UTF-8",
  //         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //       },
  //     })
  //     .then(response => {
  //       setUserInfo(response.data);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // };
  const navigate = useNavigate();

  const validationSchema = yup.object({
    password: yup
      .string("비밀번호를 입력해주세요")
      // .min(8, "숫자+영문자+특수문자로 8글자 이상 입력해주세요")
      .matches(/[0-9]/, "비밀번호에 숫자가 포함되어야 합니다."),
    // .matches(/[^\w]/, "비밀번호에 특수문자가 포함되어야 합니다."),
    newpassword: yup
      .string("비밀번호를 입력해주세요")
      // .min(8, "숫자+영문자+특수문자로 8글자 이상 입력해주세요")
      .matches(/[0-9]/, "비밀번호에 숫자가 포함되어야 합니다."),
    // .matches(/[^\w]/, "비밀번호에 특수문자가 포함되어야 합니다."),

    newpasswordConfirm: yup
      .string()
      .oneOf([yup.ref("newpassword"), null], "비밀번호가 일치하지 않습니다."),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      newpassword: "",
      newpasswordConfirm: "",
    },
    validationSchema: validationSchema,
    onSubmit: response => {
      // let values = {
      //   password: "1234",
      //   newpassword: "01099130059",
      //   newpasswordConfirm: "",
      //   password: response.password,
      //   newpassword: response.newpassword,
      //   newpasswordConfirm: response.newpasswordConfirm,
      // };
      let data = {
        // password: "1234",
        // password: "5678",
        // newPassword: "1234",
        // newpassword: "5678",
        email: localStorage.getItem("email"),
        password: response.password,
        newPassword: response.newpasswordConfirm,
      };

      // alert(JSON.stringify(data, null, 2));
      console.log(localStorage.getItem("accessToken"));
      instance
        .put("/user/password", JSON.stringify(data), {
          headers: {
            "Access-Control-Allow-Origin": "https://intube.store:8443/api",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        })
        .then(values => {
          if (values.data.statusCode === 200) {
            swal.fire(
              "비밀번호가 변경되었습니다.",
              "다시 로그인해주세요",
              "success"
            );
            localStorage.clear();
            navigate("/");
          }
        })
        .catch(e => {
          console.log(e);
          if (e.response.data.status === 401) {
            console.log("인증실패 다시 로그인해주세요");
            localStorage.clear();
            navigate("/");
            // 에러페이지로 이동
          }
          if (e.response.data.status === 400) {
            console.log("잘못된 비밀번호 입니다."); // 에러페이지로 이동
          }
          if (e.response.data.status === 403) {
            alert("403 Forbidden");
            localStorage.clear();
            navigate("/"); // 에러페이지로 이동
          }
          if (e.response.data.status === 500) {
            console.log("서버 에러 다시 로그인해주세요");
            localStorage.clear();
            navigate("/"); // 에러페이지로 이동
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
              비밀번호 변경
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="현재 비밀번호"
                  type="password"
                  id="password"
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
                  name="newpassword"
                  label="새로운 비밀번호"
                  type="password"
                  id="newpassword"
                  onChange={formik.handleChange}
                  value={formik.values.newpassword}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.newpassword &&
                    Boolean(formik.errors.newpassword)
                  }
                  helperText={
                    formik.touched.newpassword && formik.errors.newpassword
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="newpasswordConfirm"
                  label="새로운 비밀번호 확인"
                  type="password"
                  id="newpasswordConfirm"
                  onChange={formik.handleChange}
                  value={formik.values.newpasswordConfirm}
                  // onBlur={formik.handleBlur}
                  error={
                    formik.touched.newpasswordConfirm &&
                    Boolean(formik.errors.newpasswordConfirm)
                  }
                  helperText={
                    formik.touched.newpasswordConfirm &&
                    formik.errors.newpasswordConfirm
                  }
                  onBlur={formik.handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  비밀번호 변경하기
                </Button>
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
