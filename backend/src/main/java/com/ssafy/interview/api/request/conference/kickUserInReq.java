package com.ssafy.interview.api.request.conference;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("kickUserInReq")
public class kickUserInReq {

    @ApiModelProperty(name="conference ID")
    Long conferenceID;

    @ApiModelProperty(name="User Email")
    String userEmail;
}
