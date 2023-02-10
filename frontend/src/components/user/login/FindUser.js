import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import http from "api/Http";
import { useState } from "react";
import { useNavigate } from "react-router";
import EvaluatePerson from "components/user/login/EvaluatePerson";

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
  const navigate = useNavigate();

  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
    },
    // validationSchema: validationSchema,
    onSubmit: response => {
      let values = {
        // name: "지원석",
        // email: "jos9404@naver.com",
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
            alert(
              "임시 비밀번호가 이메일로 전송되었습니다. 이메일 확인 바랍니다."
            );

            navigate("/"); // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
          }
        })
        .catch(e => {
          if (e.response.data.statusCode === 404) {
            alert("등록된 회원이 아닙니다...");
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              아이디 / 비밀번호 찾기
            </Typography>

            <TextField
              margin="normal"
              autoComplete="name"
              name="name"
              required
              fullWidth
              id="name"
              label="Name"
              autoFocus
              value={idName}
              onChange={nameChange}
            />
            <TextField
              // margin="normal"
              name="phone"
              label="phone"
              id="phone"
              required
              fullWidth
              autoFocus
              value={idPhone}
              onChange={phoneChange}
            />
            <Grid container>
              <Grid item xs={4}>
                <Button type="submit" variant="contained" sx={{ mt: 1, mb: 2 }}>
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
              marginTop: 2,
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
                <Button type="submit" variant="contained" sx={{ mt: 1, mb: 2 }}>
                  비밀번호 찾기
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  onClick={openModal}
                  variant="contained"
                  sx={{ mt: 1, mb: 2 }}
                >
                  sweetalertTest
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <React.Fragment>
        {/* //header 부분에 텍스트를 입력한다. */}
        <EvaluatePerson
          open={modalOpen}
          close={closeModal}
          header="가제: 답변자님을 평가해주세요🙂🤗(완료버튼을 누르면 되돌릴 수 없습니다!)"
        >
          {/* // EvalPerson.js <main> {props.children} </main>에 내용이입력된다. 리액트 함수형 모달  */}
          이건 안나옴
        </EvaluatePerson>
      </React.Fragment>
    </ThemeProvider>
  );
}
