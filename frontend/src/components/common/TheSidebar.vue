<template>
  <v-navigation-drawer v-model="drawer" location="left" temporary width="300">
    <div class="d-flex align-center pa-3">
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
    </div>

    <v-list nav>
      <div class="pa-3">
        <v-btn
          rounded="lg"
          variant="flat"
          size="x-large"
          class="sidebar-menu pa-0"
          width="100%"
          @click="moveMyPage"
        >
          <v-icon
            icon="mdi-account-outline"
            class="mr-6 ml-2"
            size="x-large"
          ></v-icon>
          <div class="sidebar-menu-item">마이페이지</div>
        </v-btn>
      </div>

      <div class="pa-3">
        <v-btn
          rounded="lg"
          variant="flat"
          size="x-large"
          class="sidebar-menu pa-0"
          width="100%"
          @click="moveInterview"
        >
          <v-icon
            icon="mdi-file-find-outline"
            class="mr-6 ml-2"
            size="x-large"
          ></v-icon>
          <div class="sidebar-menu-item">인터뷰찾기</div>
        </v-btn>
      </div>

      <div class="pa-3">
        <v-btn
          rounded="lg"
          variant="flat"
          size="x-large"
          class="sidebar-menu pa-0"
          width="100%"
          @click="moeveAnnouncement"
        >
          <v-icon
            icon="mdi-bullhorn-outline"
            class="mr-6 ml-2"
            size="x-large"
          ></v-icon>
          <div class="sidebar-menu-item">공고올리기</div>
        </v-btn>
      </div>

      <v-divider class="my-3"></v-divider>

      <div class="pa-3">
        <v-btn
          rounded="lg"
          variant="flat"
          size="x-large"
          class="sidebar-menu pa-0"
          width="100%"
          @click="moveAnswerer(2)"
        >
          <v-icon
            icon="mdi-handshake-outline"
            class="mr-6 ml-2"
            size="x-large"
          ></v-icon>
          <div class="sidebar-menu-item">매칭인터뷰</div>
        </v-btn>
      </div>

      <div class="pa-3">
        <v-btn
          rounded="lg"
          variant="flat"
          size="x-large"
          class="sidebar-menu pa-0"
          width="100%"
          @click="moveAnswerer(1)"
        >
          <v-icon
            icon="mdi-file-document-edit-outline"
            class="mr-6 ml-2"
            size="x-large"
          ></v-icon>
          <div class="sidebar-menu-item">신청인터뷰</div>
        </v-btn>
      </div>

      <div class="pa-3">
        <v-btn
          rounded="lg"
          variant="flat"
          size="x-large"
          class="sidebar-menu pa-0"
          width="100%"
        >
          <v-icon
            icon="mdi-file-document-multiple-outline"
            class="mr-6 ml-2"
            size="x-large"
          ></v-icon>
          <div class="sidebar-menu-item">완료인터뷰</div>
        </v-btn>
      </div>

      <v-divider class="my-3"></v-divider>

      <div class="pa-3">
        <v-btn
          rounded="lg"
          variant="flat"
          size="x-large"
          class="sidebar-menu pa-0"
          width="100%"
        >
          <v-icon
            icon="mdi-video-outline"
            class="mr-6 ml-2"
            size="x-large"
          ></v-icon>
          <div class="sidebar-menu-item">인터뷰진행</div>
        </v-btn>
      </div>

      <div class="pa-3">
        <v-btn
          rounded="lg"
          variant="flat"
          size="x-large"
          class="sidebar-menu pa-0"
          width="100%"
        >
          <v-icon
            icon="mdi-account-multiple-plus-outline"
            class="mr-6 ml-2"
            size="x-large"
          ></v-icon>
          <div class="sidebar-menu-item">인터뷰모집</div>
        </v-btn>
      </div>

      <div class="pa-3">
        <v-btn
          rounded="lg"
          variant="flat"
          size="x-large"
          class="sidebar-menu pa-0"
          width="100%"
        >
          <v-icon
            icon="mdi-file-video-outline"
            class="mr-6 ml-2"
            size="x-large"
          ></v-icon>
          <div class="sidebar-menu-item">인터뷰결과</div>
        </v-btn>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import router from "@/router";
import { computed } from "vue";
export default {
  props: {
    openSidebar: Boolean,
  },
  setup(props, { emit }) {
    const drawer = computed({
      get: () => props.openSidebar,
      set: (value) => emit("closeSidebar", value),
    });

    return {
      drawer,
    };
  },
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
    moveAnswerer(state) {
      router.push({
        name: "answerer",
        query: { state: state },
      });
    },
  },
};
</script>

<style scoped>
.sidebar-menu {
  justify-content: left;
}
.sidebar-menu-item {
  font-family: Roboto-Medium;
  font-size: 18px;
}
</style>
