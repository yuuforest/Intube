package com.ssafy.interview.api.request.result;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * Conference Result API ([PUT] /api/result/modify) 요청에 필요한 리퀘스트 바디 정의.
 */
@ApiModel("ResultModifyReq")
@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class ResultModifyReq {
    @ApiModelProperty(example = "", value = "Conference Result Id")
    private Long result_id;
    @ApiModelProperty(example = "", value = "Conference Result content")
    private String result_content;
}
