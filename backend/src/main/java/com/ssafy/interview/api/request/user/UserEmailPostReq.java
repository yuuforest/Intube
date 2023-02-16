package com.ssafy.interview.api.request.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserEmailPostRequest")
public class UserEmailPostReq {
    @ApiModelProperty(name="유저 email ID", example="ssafy@ssafy.com")
    String email;
}
