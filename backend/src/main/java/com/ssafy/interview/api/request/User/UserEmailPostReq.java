package com.ssafy.interview.api.request.User;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserEmailPostRequest")
public class UserEmailPostReq {
    @ApiModelProperty(name="유저 email ID", example="slhyj95@naver.com")
    String email;
}
