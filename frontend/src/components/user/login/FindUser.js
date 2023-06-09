import * as React from "react";
import Avatar from "@mui/material/Avatar";
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
import http from "api/Http";
import { useState } from "react";
import { useNavigate } from "react-router";
import swal from "sweetalert2";
import Header from "components/common/Header";

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

export default function SignIn() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
    },
    // validationSchema: validationSchema,
    onSubmit: response => {
      let values = {
        name: response.name,
        email: response.email,
      };
      // alert(JSON.stringify(values, null, 2));
      http
        .post("/user/find-password", JSON.stringify(values), {
          headers: {
            "Access-Control-Allow-Origin": "https://intube.store:8443/api",
          },
          withCredentials: true,
        })
        .then(({ data }) => {
          if (data.statusCode === 200) {
            console.log(data);
            swal.fire(
              "임시 비밀번호가 이메일로 전송되었습니다.",
              "이메일을 확인해주세요",
              "info"
            );
            navigate("/"); // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
          }
        })
        .catch(e => {
          if (e.response.data.statusCode === 404) {
            swal.fire("", "등록된 회원이 아닙니다.", "error");
          }
          console.log(e);
        });
    },
  });
  const [idName, setIdName] = useState("");
  const [idPhone, setIdPhone] = useState("");
  const [check, setCheck] = useState(false);
  const [id, setId] = useState("");

  const nameChange = ({ target: { value } }) => setIdName(value);
  const phoneChange = ({ target: { value } }) => setIdPhone(value);

  const findEmail = event => {
    event.preventDefault();
    let values = {
      name: idName,
      phone: idPhone,
      // name: "지원석",
      // phone: "01099130059",
    };
    // alert(JSON.stringify(values, null, 2));
    http
      .post("/user/find-email", JSON.stringify(values), {
        headers: {
          "Access-Control-Allow-Origin": "https://intube.store:8443/api",
        },
        withCredentials: true,
      })
      .then(({ data }) => {
        if (data.statusCode === 200) {
          console.log(data);
          setId(data.email);
          setCheck(true);
        }
      })
      .catch(e => {
        // if (e.response.data.statusCode === 401) {
        //   alert("비밀번호가 틀렸습니다.");
        // }
        if (e.response.data.statusCode === 404) {
          alert("등록된 회원이 아닙니다.");
        }
        console.log(e);
      });
  };

  return (
    <div>
      <Header></Header>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <form onSubmit={findEmail}>
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
                아이디 / 비밀번호 찾기
              </Typography>

              <TextField
                margin="normal"
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                label="이름"
                autoFocus
                value={idName}
                onChange={nameChange}
              />
              <TextField
                // margin="normal"
                name="phone"
                label="휴대폰 번호"
                id="phone"
                required
                fullWidth
                autoFocus
                value={idPhone}
                onChange={phoneChange}
              />
              <Grid container>
                <Grid item xs={4}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}
                  >
                    아이디 찾기
                  </Button>
                </Grid>
                <Grid item xs={4} sx={{ mt: 1.5, mb: 2 }}>
                  {check && <span>{id}</span>}
                </Grid>
              </Grid>
            </Box>
          </form>

          <form onSubmit={formik.handleSubmit}>
            <CssBaseline />
            <Box
              sx={{
                marginTop: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                label="이름"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                onBlur={formik.handleBlur}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="이메일 주소"
                name="email"
                autoComplete="email"
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                onBlur={formik.handleBlur}
              />
              <Grid container>
                <Grid item xs={4}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 1, mb: 2 }}
                  >
                    비밀번호 찾기
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </form>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}
