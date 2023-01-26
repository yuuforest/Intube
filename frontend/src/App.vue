<template>
  <v-app>
    <v-main>
      <the-header></the-header>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import TheHeader from "@/components/common/TheHeader.vue";
import ChatbotService from "@/api/chatbotService";
export default {
  components: { TheHeader },
  name: "App",
  data: () => ({}),
  created() {
    ChatbotService.boot({
      pluginKey: "ed1fa025-5bce-4243-b9d2-f7d84930428c", //please fill with your plugin key
    });
  },
};
</script>

<style>
@font-face {
  font-family: "LINESeedKR-Bd";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/LINESeedKR-Bd.woff2")
    format("woff2");
  font-weight: 700;
  font-style: normal;
}
@font-face {
  font-family: "TTCrownMychewR";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2205@1.0/TTCrownMychewR.woff2")
    format("woff2");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "Roboto-Medium";
  src: url("@/assets/fonts/Roboto-Medium.ttf");
}

* {
  font-family: "Roboto-Medium, LINESeedKR-Bd";
}
</style>
