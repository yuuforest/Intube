package com.ssafy.interview.api.request.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserAuthkeyPostRequest")
public class UserAuthkeyPostReq {
    @ApiModelProperty(name="유저 email ID", example="ssafy@ssafy.com")
    String email;
    @ApiModelProperty(name="이메일 인증 키", example="E134DAY")
    String authKey;
}
