<template>
  <v-dialog v-model="dialog" width="720px">
    <v-card>
      <v-list class="pa-5">
        <h1 class="mt-5 text-center">{{ this.interview.title }}</h1>
        <v-divider class="my-10"></v-divider>
        <v-list-item>
          <v-list-item-subtitle> 인터뷰 종류 </v-list-item-subtitle>
          <v-list-item> {{ this.interview.category_name }} 인터뷰 </v-list-item>
        </v-list-item>

        <v-list-item>
          <v-row>
            <v-col cols="6">
              <v-list-item-subtitle> 인터뷰 시간 </v-list-item-subtitle>
              <v-list-item>
                <v-select
                  v-model="select"
                  :items="this.interview.interview_time"
                  variant="underlined"
                  v-if="this.interview.interview_state == 0"
                ></v-select>
                <p v-if="this.interview.interview_state > 0">
                  {{ this.interview.interview_time }}
                </p>
              </v-list-item>
            </v-col>
            <v-col cols="6">
              <v-list-item-subtitle> 소요시간 </v-list-item-subtitle>
              <v-list-item>
                {{ this.interview.estimated_time }}
              </v-list-item>
            </v-col>
          </v-row>
        </v-list-item>

        <v-list-item>
          <v-list-item-subtitle> 인터뷰 내용 </v-list-item-subtitle>
          <v-list-item>
            {{ this.interview.description }}
          </v-list-item>
        </v-list-item>

        <v-list-item>
          <v-list-item-subtitle> 공통 대상</v-list-item-subtitle>
          <v-list-item>
            {{ this.interview.start_standard_age }}~{{
              this.interview.end_standard_age
            }}세 {{ this.gender }}
          </v-list-item>
        </v-list-item>

        <v-list-item>
          <v-list-item-subtitle> 포인트 </v-list-item-subtitle>
          <v-list-item>
            {{ this.interview.point }}
          </v-list-item>
        </v-list-item>
      </v-list>
      <v-btn
        color="blue-grey"
        prepend-icon="mdi-file-document-edit-outline"
        size="large"
        v-if="this.interview.interview_state == 0"
      >
        신청하기
      </v-btn>
      <v-btn
        color="red"
        prepend-icon="mdi-text-box-remove-outline"
        size="large"
        v-if="this.interview.interview_state == 1"
      >
        신청취소
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
import { computed } from "vue";
export default {
  props: { openDialog: Boolean, interview: Object },
  setup(props, { emit }) {
    const dialog = computed({
      get: () => props.openDialog,
      set: (value) => emit("closeDialog", value),
    });

    return {
      dialog,
    };
  },
  data() {
    return {
      select: this.interview.interview_time[0],
    };
  },
};
</script>

<style scoped></style>
