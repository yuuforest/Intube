package com.ssafy.interview.api.response.Conference;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ConferenceStartPostRes")
public class ConferenceStartRes {

    @ApiModelProperty(name="Conference ID")
    Long conference_id;

    @ApiModelProperty(name="ConferenceHistory ID")
    Long history_id;

    public static ConferenceStartRes of(Long conference_id, Long history_id) {
        ConferenceStartRes res = new ConferenceStartRes();
        res.setConference_id(conference_id);
        res.setHistory_id(history_id);
        return res;
    }
}
