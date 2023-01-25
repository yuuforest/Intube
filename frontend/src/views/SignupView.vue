<template>
  <form >
    <v-row justify="center">
    <v-col cols="4">
        <h1>회원가입</h1>
        
            <p>sns계정으로 간편하게 회원가입</p>
            <v-img src="@/assets/kakaoLogin.png" width="50" @click="kakao"></v-img>
            <hr>
        
            <h2>이메일</h2>
            <v-text-field 
            v-model="email"
            :rules="[rules.required, rules.email]"
            label="E-mail"
            variant="underlined"
            ></v-text-field>
            <v-btn
            @click="emailValidate"
            variant = "outlined"
            >
            인증하기
            </v-btn>  

        <br>
        
            <!-- <h2>휴대폰 번호</h2>
            <p>'-'를 배고 입력해주세요 ex)01023458757</p>
            <v-text-field 
            v-model="phone"
            :rules="[rules.required,]"
            label="phone number"
            variant="underlined"
            ></v-text-field>
            <v-btn
            class="mr-4"
            @click="phoneValidate"
            >
            인증하기
            </v-btn>              -->
         <br>
            <h2>비밀번호</h2>
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
        
        
            <h2>비밀번호 확인</h2>
            <v-text-field 
            v-model="passwordcheck"
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
        
      
          <h2>이름</h2>
            <v-text-field 
            v-model="name"
            :rules="[rules.required,]"
            label="name"
            variant="underlined"
            ></v-text-field>
        
        
          <h2>닉네임</h2>
            <v-text-field 
            v-model="nickname"
            :rules="[rules.required,]"
            label="nickName"
            variant="underlined"
            ></v-text-field>
        
        
          <h2>성별</h2>
          <v-radio-group
          v-model="inline"
          inline
          >
          <v-radio
            label="남"
            value="M"
          ></v-radio>
          <v-radio
            label="여"
            value="F"
          ></v-radio>
      </v-radio-group>
        <br>
        
          <h2>생년월일</h2>
          <p>8자리로 입력해주세요. ex)19980616</p>
          <v-text-field 
            v-model="birth"
            :rules="[rules.required,]"
            label="birth"
            variant="underlined"
          ></v-text-field>
        
        
            <h2>자기소개</h2>
            <v-text-field 
            v-model="introduction"
            :rules="[rules.required,]"
            
          ></v-text-field>

            <v-btn
            class="mr-4"
            @click="submitForm"
            >
            회원가입하기
            </v-btn>      

    </v-col>
    </v-row>
  </form>
</template>

<script>
import http from "@/api/http"
export default {
 data: () => ({
      email: '',
      password: '',
      birth:'',
      gender: '',
      introduction:'',
      name:'',
      nickname:'',
      phone:'',
      passwordcheck:'',
      show1: false,
      inline: null,
      rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 4 || 'Min 4 characters',
            email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'},
            },

    }),

    methods:{
      kakao(){
        console.log('hi')
      },
      emailValidate(){

      },
      submitForm(){
        let response = {
          // "birth": this.birth,
          // "email": this.email,
          // "gender": this.gender,
          // "introduction": this.introduction,
          // "name": this.name,
          // "nickname": this.nickname,
          // "password": this.password,
          // "phone": this.phone,
          "birth": 19970713,
          "email": "slhyj95@naver.com",
          "gender": "M",
          "introduction": "안녕하세요 저는 착한 사람입니다.",
          "name": "이영준",
          "nickname": "커플13일차",
          "password": 1234,
          "phone": "01012341234"
        }
        console.log(response)
        try {
          // localStorage.clear()
          http.post("/api/users", JSON.stringify(response),{withCredentials:true})
          .then(({data})=> {
              if (data.statusCode === 200){
                console.log(data)   
              }
            }
          )
          .catch(e => console.log(e,"회원가입 오류", ),alert("ERRORRRRR"))
        }catch(error){
          console.log(error);
          console.log('ERRORRORORROROR');
        }
      },
    }
}
</script>

<style>

</style>