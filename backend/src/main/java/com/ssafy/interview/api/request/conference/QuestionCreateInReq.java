package com.ssafy.interview.api.request.conference;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("questionCreateInReq")
public class QuestionCreateInReq {

    @ApiModelProperty(name="인터뷰 ID")
    Long interviewID;

    @ApiModelProperty(name="질문 내용")
    String content;
}
