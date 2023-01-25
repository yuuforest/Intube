<template>
    <v-card class="card">
      <form>
        <div id='headLine'>
          <v-img id="logo" src="@/assets/logo.png" width="150"></v-img>
          <h1>에 로그인 하기</h1>
        </div>
        <div class="textField">
          <v-text-field 
          v-model="email"
          :rules="[rules.required, rules.email]"
          label="Email"
          variant="underlined"
          ></v-text-field>

          <v-text-field 
          v-model="password"
          :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          hint="At least 4 characters"
          counter
          @click:append-inner="show1 = !show1"
          variant="underlined"
          ></v-text-field>
        </div>   
        <div class="textField">
          <v-btn
            class="mr-4"
            @click="test1"
          >
            login
          </v-btn>
          <v-btn
            class="mr-4"
            @click="loginKakao"
          >
            LOGIN FOR KAKAO
          </v-btn>
          <v-btn
            class="mr-4"
            @click="loginTest"
          >
            loginTest
          </v-btn>
        </div>

        <div class="textField">
          <!-- <p @click="goFindIdPassword">아이디 또는 암호를 잊으셨나요?</p> -->
          <router-link  to="/findIdPassword">아이디 또는 암호를 잊으셨나요?</router-link>
        </div>
<!-- style=text-decoration:none -->
        <div class="textField">
          <span>아이디가 없으신가요? 
            <router-link to="/signup">회원가입하기</router-link>
          </span>    
        </div>

      </form>
    </v-card>
</template>

<script>
import http from "@/api/http"
  export default {
    data: () => ({
      email: '',
      password: '',
      show1: false,
      rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 4 || 'Min 4 characters',
            email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'},
            // emailMatch: () => (`The email and password you entered don't match`),
            // pass: value => this.WrongPassword(value)
            },

    }),


    methods: {
      test1(){
        let response1 = {
          // "email": this.email,
          // "password": this.password
          "email": "slhyj95@naver.com",
          "password": '1234'
        }
        console.log(response1)
        // try {
          // localStorage.clear()
          http.post("/auth/login", JSON.stringify(response1),{withCredentials:true})
          // .then(response =>{
          //   console.log(response)
          // })
          .then(({data})=> {
              if (data.statusCode === 200){
                localStorage.setItem("accessToken",data.accessToken),
                console.log(data),    
                console.log("엑세스토큰 :",localStorage.getItem("accessToken"))
              }
            }
          )
          .catch(e => {
            if (e.response.data.statusCode === 401) {
              alert("비밀번호가 틀렸습니다.")
            }
            if (e.response.data.statusCode === 404) {
              alert("등록된 회원이 아닙니다.")
            } 
            console.log(e)
          })
        // }catch(e){
        //   console.log(e);
        //   console.log('ERRORRORORROROR');
        //   alert("아이디 또는 비밀번호 오류입니다.")
        // }
      },
      loginKakao(){
        console.log('hi')
      },
      loginTest(){
        http.get("/api/users/me", {
          headers: {
            Authorization : `Bearer ${localStorage.getItem('accessToken')}`,
            }
          },{withCredentials:true})
          .then(({data}) => console.log(data)
          )
          .catch(e => {
            if (e.response.data.status === 401) {
              this.resetAccessToken()
              // alert("엑세스토큰 만료")
            }
            // if (e.response.data.statusCode === 404) {
            //   alert("등록된 회원이 아닙니다.")
            // } 
            console.log(e)
          })
      },
      resetAccessToken() {
          http.get("/auth/issue")
            .then(({data}) => localStorage.setItem("accessToken", data.accessToken),
            console.log("엑세스토큰 :",localStorage.getItem("accessToken"))
            )
            .catch(e => {
              if (e.response.data.statusCode === 401) {
                  alert("refreshToken 만료. 다시 로그인 해주세요")
              }
              console.log(e,"dfdfdffdfd")
            }
          )      
    },
  }
  }
</script>

<style>
#backboard{
  background-color: ffffff;
}
.card{
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 29px 104px;
gap: 20px;

position: absolute;
width: 873px;
height: 433.16px;
left: 299px;
top: 150px;

border-radius: 20px;
}
#headLine{
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  /* border: 1px solid black; */

}
#logo{
  /* border: 1px solid black; */
  width: 50px;
  padding: 0;
  margin: 5px;
}
.textField{
  color: black;
  margin-top: 10px;
}

a {
  text-decoration: none;
  color: darkblue;
}
</style>
