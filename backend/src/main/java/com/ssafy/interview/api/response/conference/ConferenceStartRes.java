package com.ssafy.interview.api.response.conference;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ConferenceStartPostRes")
public class ConferenceStartRes {

    @ApiModelProperty(name="Conference ID")
    Long conferenceID;
    @ApiModelProperty(name="ConferenceHistory ID")
    Long historyID;

    public static ConferenceStartRes of(Long conferenceID, Long historyID) {
        ConferenceStartRes res = new ConferenceStartRes();
        res.setConferenceID(conferenceID);
        res.setHistoryID(historyID);
        return res;
    }
}
