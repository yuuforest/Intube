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
  <v-row justify="center">
    <v-col cols="8">
      <v-row>
        <v-col
          v-for="interview in interviews"
          :key="interview.id"
          :interview="interview"
          cols="4"
        >
          <interview-list-item :interview="interview"> </interview-list-item>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import InterviewListItem from "@/views/interview/InterviewListItem.vue";
import getList from "@/views/interview/interview_list.json";
export default {
  name: "InterviewList",
  components: { InterviewListItem },
  data() {
    return {
      interviews: getList.interview_list,
    };
  },
};
</script>

<style scoped></style>
