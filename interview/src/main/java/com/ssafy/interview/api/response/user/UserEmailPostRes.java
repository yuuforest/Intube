package com.ssafy.interview.api.response.user;

import com.ssafy.interview.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserEmailPostResponse")
public class UserEmailPostRes extends BaseResponseBody {
    @ApiModelProperty(name="유저 email", example="abcdq12345@naver.com")
    String email;

    public static UserEmailPostRes of(Integer statusCode, String message, String email) {
        UserEmailPostRes res = new UserEmailPostRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setEmail(email);
        return res;
    }
}
