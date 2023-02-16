package com.ssafy.interview.api.request.interview;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * 마이페이지 답변자 상태별 조회 API ([POST] /user/interviewee) 요청에 필요한 리퀘스트 바디 정의.
 */
@ApiModel("InterviewSearchByApplicantStateReq")
@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class InterviewSearchByApplicantStateReq {
    @ApiModelProperty(example = "", value = "신청자 상태 - 0(신청가능), 1(대기), 2(수락), 3(완료)")
    private int applicant_state;
    @ApiModelProperty(example = "", value = "검색어(공고 제목 or 내용)")
    private String word = null;
}
