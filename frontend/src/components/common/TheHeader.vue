<template>
  <div>
    <v-app-bar elevation="2">
      <v-app-bar-title @click="moeveMain">
        <v-img src="@/assets/logo.png" width="150"></v-img>
      </v-app-bar-title>
      <div id="nav-bar">
        <h2 @click="moeveAnnouncement">공고 올리기</h2>
        <h2 @click="moveInterview">인터뷰 찾기</h2>
        <h2>마이페이지</h2>
        <v-icon icon="mdi-login"></v-icon>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import router from "@/router";
export default {
  name: "MainHeader",
  methods: {
    moveInterview() {
      router.push("/interview");
    },
    moeveAnnouncement() {
      router.push("/announcement/type");
    },
    moeveMain() {
      router.push("/");
    },
  },
};
</script>

<style scoped>
#instanceLine {
  border: 2px solid black;
}

#nav-bar {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-inline: 10px;
  gap: 40px;
  width: 570px;
  height: 60px;
}
</style>
