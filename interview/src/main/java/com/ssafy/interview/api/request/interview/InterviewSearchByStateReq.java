package com.ssafy.interview.api.request.interview;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * 유저 로그인 API ([POST] /api/v1/auth/login) 요청에 필요한 리퀘스트 바디 정의.
 */
@ApiModel("InterviewSearchByStateReq")
@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class InterviewSearchByStateReq {
    @ApiModelProperty(example = "", value = "인터뷰 상태 - 4(모집), 5(진행), 6(완료)")
    private int interview_state;

    @Builder.Default
    @ApiModelProperty(example = "", value = "검색어(공고 제목 or 내용)")
    private String word = null;
}
