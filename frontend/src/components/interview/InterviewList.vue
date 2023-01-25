<template>
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
import InterviewListItem from "@/components/interview/InterviewListItem.vue";
import getList from "@/components/interview/interview_list.json";
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
