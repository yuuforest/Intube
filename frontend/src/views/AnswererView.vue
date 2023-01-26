<template>
  <interview-list :interviews="interviews"></interview-list>
</template>

<script>
import InterviewList from "@/components/interview/InterviewList.vue";
import getList1 from "@/components/answerer/interview_list_state1.json";
import getList2 from "@/components/answerer/interview_list_state2.json";
export default {
  name: "AnswererView",
  components: { InterviewList },
  data() {
    return { interviews: [] };
  },
  created() {
    this.axios();
  },
  watch: {
    $route: {
      handler() {
        this.axios();
      },
    },
  },
  methods: {
    axios() {
      if (this.$route.query.state == 1) {
        this.interviews = getList1.interview_list;
      } else if (this.$route.query.state == 2) {
        this.interviews = getList2.interview_list;
      }
    },
  },
};
</script>

<style scoped></style>
