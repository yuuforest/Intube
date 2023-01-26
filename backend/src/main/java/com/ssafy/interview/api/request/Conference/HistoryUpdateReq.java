package com.ssafy.interview.api.request.Conference;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ConferenceHistoryPostReq")
public class HistoryUpdateReq {
    @ApiModelProperty(name="History ID")
    Long history_id;
    @ApiModelProperty(name="사용자의 아이디")
    int action;
}
