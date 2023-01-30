package com.ssafy.interview.api.request.conference;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("recordNowInReq")
public class recordDialogInReq {
    
    // [이전 발언자]
    @ApiModelProperty(name = "Dialog ID")
    Long dialogID;
    @ApiModelProperty(name = "발언 내용")
    String content;

    // [현재 발언자]
    @ApiModelProperty(name = "User Email")
    String userEmail;
    @ApiModelProperty(name = "Conference ID")
    Long conferenceID;
    @ApiModelProperty(name = "Question ID")
    Long questionID;
    @ApiModelProperty(name = "Conference 중 질문 시작 시간")
    String timestamp;
}
