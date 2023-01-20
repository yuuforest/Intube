package com.ssafy.interview.api.request.interview;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 로그인 API ([POST] /api/v1/auth/login) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("InterviewSearchRequest")
@Builder
public class InterviewSearchReq {
	@ApiModelProperty(example = "1:1", value = "인터뷰 카테고리")
	private String category_name;
	@ApiModelProperty(example = "test", value = "검색어(공고 제목 or 내용)")
	private String word;
}
