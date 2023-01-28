package com.ssafy.interview.api.request.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserFindPwdPostRequest")
public class UserFindPwdPostReq {
    @ApiModelProperty(name="유저 name", example="이영준")
    String name;
    @ApiModelProperty(name="유저 email ID", example="slhyj95@naver.com")
    String email;
}
