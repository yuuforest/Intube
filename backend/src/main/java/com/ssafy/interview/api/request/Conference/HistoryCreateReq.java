package com.ssafy.interview.api.request.Conference;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ConferenceHistoryPostReq")
public class HistoryCreateReq {

    @ApiModelProperty(name="Conference ID")
    Long conference_id;
    @ApiModelProperty(name="사용자의 아이디")
    String user_email;
    @ApiModelProperty(name="사용자의 아이디")
    int action;
}
