<template>
  <div>
    <h1 class="font-weight-bold mb-5 pb-8 text-center">
      {{ annoucementInfo.title }}
    </h1>
    <h1 class="float-left font-weight-bold">질문 리스트</h1>
    <div class="float-right font-weight-bold">
      {{ annoucementInfo.category_name }} 인터뷰
    </div>
    <v-divider class="mt-16 mb-10"></v-divider>
    <v-row v-for="(q, index) in question" :key="index">
      <v-col cols="2">
        <h2 class="float-left pt-3">Q{{ index + 1 }}.</h2>
      </v-col>
      <v-col cols="9">
        <v-text-field
          placeholder="질문을 적어주세요"
          v-model="question[index]"
          variant="solo"
        ></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-btn
          icon="mdi-plus"
          @click="addQuestion"
          v-if="index == question.length - 1"
        ></v-btn>
        <v-btn
          icon="mdi-minus"
          @click="deleteQuestion(index)"
          v-if="index != question.length - 1 && index != 0"
        ></v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "AnnouncementQuestion",
  props: ["annoucementInfo"],
  data: () => ({
    question: [""],
  }),
  methods: {
    addQuestion() {
      this.question.push("");
    },
    deleteQuestion(index) {
      this.question.splice(index, 1);
    },
  },
};
</script>

<style scoped></style>
