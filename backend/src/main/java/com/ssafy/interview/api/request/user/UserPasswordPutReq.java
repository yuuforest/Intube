package com.ssafy.interview.api.request.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserPasswordPutRequest")
public class UserPasswordPutReq {
    @ApiModelProperty(name="유저 ID(email)", example="ssafy@ssafy.com")
    String email;
    @ApiModelProperty(name="유저 Password", example="1234")
    String password;
    @ApiModelProperty(name="새로운 Password", example="5678")
    String newPassword;
}
