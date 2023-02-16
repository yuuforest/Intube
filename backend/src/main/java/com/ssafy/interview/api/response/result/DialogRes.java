package com.ssafy.interview.api.response.result;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss", timezone = "Asia/Seoul")
    LocalDateTime timestamp;

}
