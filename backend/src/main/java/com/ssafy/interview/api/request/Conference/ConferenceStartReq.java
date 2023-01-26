package com.ssafy.interview.api.request.Conference;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ConferenceRegisterPostReq")
public class ConferenceStartReq {

    @ApiModelProperty(name="Interview ID")
    Long interview_id;
    @ApiModelProperty(name="Conference를 생성한 질문자의 아이디")
    String user_email;
}
