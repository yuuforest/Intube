package com.ssafy.interview.api.request.Conference;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ConferenceEndPostReq")
public class ConferenceEndReq {

    @ApiModelProperty(name="Conference ID")
    Long conference_id;
    @ApiModelProperty(name="ConferenceHistory ID")
    Long history_id;
}
