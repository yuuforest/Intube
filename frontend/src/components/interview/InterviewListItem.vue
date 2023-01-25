<template>
  <v-card class="mx-auto" max-width="344" variant="outlined">
    <v-card-item>
      <div>
        <h2 class="mb-1">{{ this.interview.title }}</h2>
        <v-divider class="mb-1"></v-divider>
        <div class="text-caption">
          <p>내용 : {{ this.interview.description }}</p>
          <p>
            모집 기간 : {{ this.interview.apply_start_time }} ~
            {{ this.interview.apply_end_time }}
          </p>
          <p>
            대상자 : {{ this.interview.start_standard_age }}~{{
              this.interview.end_standard_age
            }}세
            {{ this.gender }}
          </p>
          <p>지급 포인트 : {{ this.interview.point }}P</p>
        </div>
      </div>
    </v-card-item>

    <v-card-actions class="float-right">
      <v-btn variant="outlined">
        {{ this.interview.category_name }} 인터뷰</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "InterviewListItem",
  props: ["interview"],
  components: {},
  data() {
    return {
      gender: "",
      open: false,
    };
  },
  created() {
    if (this.interview.gender == "W") this.gender = "여성";
    else if (this.interview.gender == "M") this.gender = "남성";
    else this.gender = "상관없음";
  },
};
</script>

<style scoped></style>
