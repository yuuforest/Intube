package com.ssafy.interview.api.request.interview;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * 인터뷰 결과 수정 관련 API ([PUT] /api/interviews/) 요청에 필요한 리퀘스트 바디 정의.
 */
@ApiModel("InterviewTimeStateReq")
@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class InterviewTimeStateReq {
    @ApiModelProperty(example = "", value = "검색어(공고 제목 or 내용)")
    private Long interview_time_id;
    @ApiModelProperty(example = "", value = "인터뷰 상태 - 0(진행 전), 1(진행 후 결과 수정 중), 2(결과 수정 완료)")
    private int modify_result_state;
}
