<template>
  <div>
    <mian-header></mian-header>
    <router-view />
  </div>
</template>

<script>
import mianHeader from "@/views/common/TheHeader.vue";
export default {
  components: { mianHeader },
};
</script>

<style lang="scss" scoped></style>
