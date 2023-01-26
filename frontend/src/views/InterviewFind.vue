<template>
  <interview-list :interviews="interviews"></interview-list>
</template>

<script>
import InterviewList from "@/components/interview/InterviewList.vue";
import getList from "@/components/interview/interview_list.json";
export default {
  name: "InterviewFind",
  components: { InterviewList },
  data() {
    return { interviews: getList.interview_list };
  },
};
</script>

<style scoped></style>
