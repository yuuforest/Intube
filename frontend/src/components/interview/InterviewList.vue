<template>
  <v-row justify="center">
    <v-col cols="8">
      <v-row>
        <v-col
          v-for="interview in interviews"
          :key="interview.id"
          :interview="interview"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <interview-list-item :interview="interview"> </interview-list-item>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import InterviewListItem from "@/components/interview/InterviewListItem.vue";

export default {
  name: "InterviewList",
  components: { InterviewListItem },
  props: ["interviews"],
  data() {
    return {};
  },
  created() {
    console.log(this.interviews);
  },
};
</script>

<style scoped></style>
