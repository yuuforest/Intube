package com.ssafy.interview.api.response.result;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder(builderMethodName = "DialogResBuilder")
@ApiModel("DialogRes")
public class DialogRes {

    @ApiModelProperty(name="dialog ID")
    Long dialogID;

    @ApiModelProperty(name="user ID")
    Long userID;

    @ApiModelProperty(name="conference ID")
    Long conferenceID;

    @ApiModelProperty(name="question ID")
    Long questionID;

    @ApiModelProperty(name="발언 내용")
    String content;

    @ApiModelProperty(name="기록 시간")
    String timestamp;

}
