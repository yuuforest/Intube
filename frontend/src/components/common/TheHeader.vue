<template>
  <div>
    <v-row class="pa-3">
      <v-col cols="4" class="d-flex align-center">
        <v-btn
          icon="mdi-menu"
          variant="flat"
          size="x-large"
          class="mr-3"
          @click.stop="drawer = !drawer"
        >
        </v-btn>
        <v-app-bar-title @click="moeveMain">
          <v-img src="@/assets/logo.png" width="130"></v-img>
        </v-app-bar-title>
      </v-col>
      <v-col cols="4" align-self="center">
        <v-text-field
          density="comfortable"
          variant="outlined"
          label="검색"
          append-inner-icon="mdi-magnify"
          single-line
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="4" class="header-menu d-flex">
        <v-btn
          icon
          variant="flat"
          size="x-large"
          class="mr-3"
          @click="moveInterview"
        >
          <v-tooltip activator="parent" location="bottom"
            >인터뷰 찾기</v-tooltip
          >
          <v-icon size="large">mdi-file-find-outline</v-icon>
        </v-btn>
        <v-btn
          icon
          variant="flat"
          size="x-large"
          class="mr-3"
          @click="moeveAnnouncement"
        >
          <v-tooltip activator="parent" location="bottom"
            >공고 올리기</v-tooltip
          >
          <v-icon size="large">mdi-bullhorn-outline</v-icon>
        </v-btn>

        <v-btn
          icon
          variant="flat"
          size="x-large"
          class="mr-3"
          @click="moveMyPage"
        >
          <v-tooltip activator="parent" location="bottom">마이페이지</v-tooltip>
          <v-icon size="large">mdi-account-outline</v-icon>
        </v-btn>
        <v-btn
          icon
          variant="flat"
          size="x-large"
          class="mr-3"
          @click="moveLogin"
        >
          <v-tooltip activator="parent" location="bottom">로그인</v-tooltip>
          <v-icon size="large">mdi-login</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <the-sidebar
      :openSidebar="drawer"
      @closeSidebar="closeSidebar"
    ></the-sidebar>
  </div>
</template>

<script>
import router from "@/router";
import TheSidebar from "@/components/common/TheSidebar.vue";
export default {
  name: "MainHeader",
  components: { TheSidebar },
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
    moveMyPage() {
      router.push("/mypage");
    },
    moveLogin() {
      router.push("/login");
    },
    closeSidebar() {
      this.drawer = false;
    },
  },
  data: () => ({
    drawer: false,
  }),
};
</script>

<style scoped>
.header-menu {
  justify-content: right;
}
</style>
