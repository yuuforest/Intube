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
export default {
  components: { TheHeader },
  name: "App",
  data: () => ({}),
};
</script>
