<template>
  <v-row justify="center" class="mt-5">
    <v-col cols="2" @click="moveType" class="text-center">
      <h2>1. 종류선택</h2>
    </v-col>
    <v-col cols="2" @click="moveInfo" class="text-center">
      <h2>2. 공고 입력</h2>
    </v-col>
    <v-col cols="2" @click="moveQuestion" class="text-center">
      <h2>3. 질문 작성</h2>
    </v-col>
    <v-col cols="2" @click="moveAlert" class="text-center">
      <h2>4. 등록 완료</h2>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col cols="8">
      <router-view
        :annoucementInfo="announcement"
        @categoryName="categoryNameChange"
        @announcementInfo="announcementChange"
      ></router-view>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "AnnouncementPost",
  data() {
    return {
      announcement: {
        category_name: "",
        title: "",
        description: "",
        estimated_time: "",
        start_standard_age: 20,
        end_standard_age: 40,
        gender: "",
        max_people: "",
        standard_point: "",
        apply_end_time: "",
        interview_time: [
          {
            date: "",
            time: "",
          },
        ],
      },
    };
  },
  methods: {
    moveType() {
      this.$router.push("/announcement/type");
    },
    moveInfo() {
      this.$router.push("/announcement/info");
    },
    moveQuestion() {
      this.$router.push("/announcement/question");
    },
    moveAlert() {
      this.$router.push("/announcement/alert");
    },
    categoryNameChange(categoryName) {
      this.announcement.category_name = categoryName;
    },
    announcementChange(announcementInfo) {
      this.announcement = announcementInfo;
      console.log(this.announcement);
    },
  },
};
</script>

<style scoped></style>
