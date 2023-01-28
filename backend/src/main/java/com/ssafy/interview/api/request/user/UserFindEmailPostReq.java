package com.ssafy.interview.api.request.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserFindEmailPostRequest")
public class UserFindEmailPostReq {
    @ApiModelProperty(name="유저 name", example="이영준")
    String name;
    @ApiModelProperty(name="유저 phone", example="01012341234")
    String phone;
}
