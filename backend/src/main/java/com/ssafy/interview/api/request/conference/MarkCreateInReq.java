package com.ssafy.interview.api.request.conference;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("markCreateInReq")
public class MarkCreateInReq {

    @ApiModelProperty(name="conference ID")
    Long conferenceID;

    @ApiModelProperty(name="마크 시간", example = "00:00:00")
    String markTime;
}
