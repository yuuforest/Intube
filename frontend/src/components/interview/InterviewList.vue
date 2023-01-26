<template>
  <v-row justify="center">
    <v-col cols="10">
      <v-row>
        <v-col
          v-for="interview in interviews"
          :key="interview.id"
          cols="12"
          md="6"
          lg="4"
          xl="3"
        >
          <interview-list-item :interview="interview"></interview-list-item>
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
  props: { interviews: Array },
};
</script>

<style scoped></style>
