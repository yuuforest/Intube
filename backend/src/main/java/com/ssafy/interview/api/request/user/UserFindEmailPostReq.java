package com.ssafy.interview.api.request.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserFindEmailPostRequest")
public class UserFindEmailPostReq {
    @ApiModelProperty(name="유저 name", example="김싸피")
    String name;
    @ApiModelProperty(name="유저 phone", example="01011111111")
    String phone;
}
