<template>
  <v-card height="350px" @click="dialog = !dialog" v-bind="props">
    <v-card-item>
      <div class="text-overline mb-1 text-right">
        <v-chip :color="chip_color" size="small">
          {{ this.interview.category_name }} 인터뷰
        </v-chip>
      </div>
      <h2 class="mb-1">{{ this.interview.title }}</h2>
      <v-divider class="mb-1"></v-divider>
      <v-list density="compact">
        <v-list-item>
          <template v-slot:prepend>
            <v-icon icon="mdi-content-paste"></v-icon>
          </template>
          <p class="interview-list-item-content">
            {{ this.interview.description }}
          </p>
        </v-list-item>

        <v-list-item>
          <template v-slot:prepend>
            <v-icon icon="mdi-account"></v-icon>
          </template>
          {{ this.interview.start_standard_age }}~{{
            this.interview.end_standard_age
          }}세 {{ this.gender }}
        </v-list-item>

        <v-list-item>
          <template v-slot:prepend>
            <v-icon icon="mdi-clock"></v-icon>
          </template>
          <p v-if="this.interview.interview_state == 0">
            {{ this.interview.apply_start_time }} ~
            {{ this.interview.apply_end_time }}
          </p>
          <p v-if="this.interview.interview_state > 0">
            {{ this.interview.interview_time }}
          </p>
        </v-list-item>

        <v-list-item>
          <template v-slot:prepend>
            <v-icon icon="mdi-bitcoin"></v-icon>
          </template>
          {{ this.interview.point }}
        </v-list-item>
      </v-list>
    </v-card-item>
  </v-card>

  <interview-detail
    :openDialog="dialog"
    :interview="interview"
    @closeDialog="closeDialog"
  ></interview-detail>
</template>

<script>
import interviewDetail from "@/components/interview/InterviewDetail.vue";
export default {
  name: "InterviewListItem",
  props: { interview: Object },
  components: { interviewDetail },
  data() {
    return {
      gender: "",
      chip_color: "primary",
      dialog: false,
    };
  },
  created() {
    if (this.interview.gender == "W") this.gender = "여성";
    else if (this.interview.gender == "M") this.gender = "남성";
    else this.gender = "상관없음";

    if (this.interview.category_name == "1:1") this.chip_color = "green";
    else if (this.interview.category_name == "N:1") this.chip_color = "warning";
    else if (this.interview.category_name == "아바타")
      this.chip_color = "primary";
  },
  methods: {
    closeDialog() {
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
.interview-list-item-content {
  max-height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
