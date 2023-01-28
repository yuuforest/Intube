package com.ssafy.interview.api.request.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserPasswordPostRequest")
public class UserPasswordPostReq {
    @ApiModelProperty(name="유저 Password", example="1234")
    String password;
}
