<template>
  <div>
    <v-row justify="center" class="mt-5">
      <v-btn @click="clickOne">1:1 인터뷰</v-btn>
    </v-row>
    <v-row justify="center" class="mt-5">
      <v-btn @click="clickN">1:N 인터뷰</v-btn>
    </v-row>
    <v-row justify="center" class="mt-5">
      <v-btn @click="clickAvatar">아바타 인터뷰</v-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  methods: {
    clickOne() {
      this.$emit("categoryName", "1:1");
    },
    clickN() {
      this.$emit("categoryName", "1:N");
    },
    clickAvatar() {
      this.$emit("categoryName", "아바타");
    },
  },
};
</script>

<style scoped></style>
