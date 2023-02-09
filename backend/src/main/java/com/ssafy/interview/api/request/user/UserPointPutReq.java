package com.ssafy.interview.api.request.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserPointPutRequest")
public class UserPointPutReq {
    @ApiModelProperty(name="유저 email ID", example="ssafy@ssafy.com")
    String email;
    @ApiModelProperty(name="증감될 point 크기", example="500")
    int point;
    @ApiModelProperty(name="증감 여부", example="1")
    int key;
}
