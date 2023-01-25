<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="4">
        <h1>아이디/비밀번호 찾기</h1>
        <v-form>
          <div>
              <h2>아이디 찾기</h2>
              <v-text-field 
                v-model="email.name"
                :rules="[rules.required,]"
                label="name"
                variant="underlined"
              >
              </v-text-field>
              <v-text-field
              class="text-black"
                :append-inner-icon="'mdi-location-enter'"
                v-model="email.phone"
                :rules="[rules.required,]"
                label="phoneNumber"
                @click:append-inner="findEmailForm"
                variant="underlined"
              ></v-text-field>  
          </div>
        </v-form>
          <br>
        <v-form>
          <div>
              <h2>비밀번호 찾기</h2>
              <v-text-field 
              v-model="password.name"
              :rules="[rules.required,]"
              label="name"
              variant="underlined"
              ></v-text-field>
              <v-text-field
                :append-inner-icon="'mdi-location-enter'"
                v-model="password.email"
                :rules="[rules.required, rules.email]"
                label="Email"
                @click:append-inner="findPasswordForm"
                variant="underlined"
              ></v-text-field>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import http from "@/api/http"
export default {
 data: () => ({
    email :{
      name:'',
      phone:'',
    },
    password:{
      name:'',
      email:'',
    },
    rules: {
      required: value => !!value || 'Required.',
      email: value => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'Invalid e-mail.'},
      },
    }),
    methods: {
      clearAll(){
        this.email.name = '',
        this.email.phone = '',
        this.password.name = '',
        this.password.email = ''
      },
      findEmailForm(){
        let response = {
            // "name": this.email.name,
            // "phone": this.email.phone
            "name": "이영준",
            "phone": "slhyj95@naver.com"
          }
          console.log(response)
        try {
          // localStorage.clear()
          http.post("/user/password", JSON.stringify(response),{withCredentials:true})
          .then(({data})=> {
              if (data.statusCode === 200){
                console.log(data)
              }
            }
          )
          .catch(e => console.log(e,"로그인 오류", ), alert("이름 또는 휴대폰 번호가 일치하지 않습니다."))
        }catch(error){
          console.log(error);
          console.log('ERRORRORORROROR');
        }
      },
      findPasswordForm(){
        let response = {
            // "name": this.email.name,
            // "phone": this.email.phone
            "name": "이영준",
            "email": "01012341234"
          }
          console.log(response)
        try {
          http.post("/user/email", JSON.stringify(response))
          .then(({data})=> {
              if (data.statusCode === 200){
                console.log(data)
              }
            }
          )
          .catch(e => console.log(e,"로그인 오류", ), alert("이름 또는 이메일이 일치하지 않습니다."))
        }catch(error){
          console.log(error);
          console.log('ERRORRORORROROR');
        }
      }

    }
}
</script>

<style>

</style>