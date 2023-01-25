<template>
  <div>
    <v-text-field
      variant="solo"
      v-model="newAnnouncement.title"
      :counter="30"
      :rules="inputRules"
      placeholder="인터뷰 제목을 30자 이내로 입력해 주세요"
      class="mb-5"
      required
    ></v-text-field>
    <h1 class="float-left font-weight-bold">인터뷰 정보</h1>
    <div class="float-right font-weight-bold">{{ category_name }} 인터뷰</div>
    <v-divider class="mt-16 mb-10"></v-divider>

    <v-row>
      <v-col cols="3">
        <h2 class="float-left">인터뷰 내용</h2>
      </v-col>
      <v-col cols="8">
        <v-text-field
          variant="solo"
          v-model="newAnnouncement.description"
          :counter="30"
          :rules="inputRules"
          placeholder="인터뷰 내용을 30자 이내로 입력해 주세요"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-divider class="mt-2 mb-5"></v-divider>

    <v-row>
      <v-col cols="3">
        <h2 class="float-left">모집인원</h2>
      </v-col>
      <v-col cols="8">
        <v-text-field
          variant="solo"
          v-model="newAnnouncement.max_people"
          type="number"
          placeholder="인터뷰 한번당 모집할 인원의 수를 입력해 주세요"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-divider class="mt-2 mb-5"></v-divider>

    <v-row>
      <v-col cols="3">
        <h2 class="float-left">소요시간</h2>
      </v-col>
      <v-col cols="8">
        <v-text-field
          variant="solo"
          v-model="newAnnouncement.estimated_time"
          type="number"
          placeholder="인터뷰 예상 소요시간을 입력해 주세요"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-divider class="mt-2 mb-5"></v-divider>

    <v-row>
      <v-col cols="3">
        <h2 class="float-left">지급 포인트</h2>
      </v-col>
      <v-col cols="8">
        <v-text-field
          variant="solo"
          v-model="newAnnouncement.standard_point"
          prefix="$"
          type="number"
          placeholder="인터뷰 완료시 지급할 포인틀를 입력해 주세요"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-divider class="mt-2 mb-5"></v-divider>

    <v-row>
      <v-col cols="3">
        <h2 class="float-left">공통 대상</h2>
      </v-col>
      <v-col cols="8">
        <v-row>
          <v-col cols="2" class="pt-5"> <h3>성별 :</h3></v-col>
          <v-col cols="10"
            ><v-radio-group v-model="newAnnouncement.gender" inline>
              <v-radio label="남자" value="M"></v-radio>
              <v-radio label="여자" value="W"></v-radio>
              <v-radio label="상관없음" value="O"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="2" class="pt-6"> <h3>나이 범위 :</h3></v-col>
          <v-col cols="10">
            <v-card-text>
              <v-range-slider
                v-model="age"
                strict
                thumb-label="always"
                step="1"
              ></v-range-slider>
            </v-card-text>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-divider class="mt-2 mb-5"></v-divider>

    <v-row v-for="(time, index) in newAnnouncement.interview_time" :key="index">
      <v-col cols="3">
        <h2 class="float-left" v-if="index == 0">진행 시간</h2>
      </v-col>
      <v-col cols="8">
        <v-row>
          <v-col cols="5.5">
            <v-text-field
              label="날짜"
              v-model="time.date"
              type="date"
            ></v-text-field>
          </v-col>
          <v-col cols="5.5">
            <v-text-field
              label="시간"
              v-model="time.time"
              type="time"
            ></v-text-field>
          </v-col>
          <v-btn
            icon="mdi-plus"
            class="mt-5"
            @click="addTime"
            v-if="index == newAnnouncement.interview_time.length - 1"
          ></v-btn>
          <v-btn
            icon="mdi-minus"
            class="mt-5"
            @click="deleteTime(index)"
            v-if="
              index != newAnnouncement.interview_time.length - 1 && index != 0
            "
          ></v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-divider class="mt-2 mb-5"></v-divider>
  </div>
  <v-row justify="center" class="my-5">
    <v-btn color="blue-grey" prepend-icon="mdi-arrow-right-bold" size="large">
      다음
    </v-btn>
  </v-row>
</template>

<script>
export default {
  props: ["category_name"],
  data: () => ({
    newAnnouncement: {
      title: "",
      description: "",
      estimated_time: "",
      start_standard_age: "",
      end_standard_age: "",
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
    age: [20, 40],
    inputRules: [
      (v) => !!v || "필수입력입니다",
      (v) => (v && v.length <= 30) || "30자이내로 작성해주세요",
    ],
  }),
  methods: {
    addTime() {
      this.newAnnouncement.interview_time.push({
        date: "",
        time: "",
      });
    },
    deleteTime(index) {
      this.newAnnouncement.interview_time.splice(index, 1);
    },
  },
  watch: {
    newAnnouncement: {
      handler() {
        this.$emit("announcementInfo", this.newAnnouncement);
      },
      deep: true,
    },
  },
};
</script>

<style scoped></style>
