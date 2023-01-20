<template>
  <v-row justify="center">
    <v-col cols="4">
      <div class="text-h4 text-center my-10">인터뷰 찾기</div>
      <v-text-field
        density="compact"
        variant="solo"
        label="Search templates"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col cols="8">
      <v-tabs
        fixed-tabs
        bg-color="indigo"
        next-icon="mdi-arrow-right-bold-box-outline"
        prev-icon="mdi-arrow-left-bold-box-outline"
      >
        <v-tab> 전체 </v-tab>
        <v-tab> 1:1 인터뷰 </v-tab>
        <v-tab> 1:N 인터뷰 </v-tab>
        <v-tab> 아바타 인터뷰 </v-tab>
      </v-tabs>
    </v-col>
  </v-row>
  <interview-list></interview-list>
</template>

<script>
import InterviewList from "@/components/interview/InterviewList.vue";
export default {
  name: "InterviewFind",
  components: { InterviewList },
  data() {
    return {};
  },
};
</script>

<style scoped></style>
