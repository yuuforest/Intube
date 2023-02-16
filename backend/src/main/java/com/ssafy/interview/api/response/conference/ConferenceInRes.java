package com.ssafy.interview.api.response.conference;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ConferenceStartPostRes")
public class ConferenceInRes {

    @ApiModelProperty(name="Conference ID")
    Long conferenceID;
    @ApiModelProperty(name="ConferenceHistory ID")
    Long historyID;

    public static ConferenceInRes of(Long conferenceID, Long historyID) {
        ConferenceInRes res = new ConferenceInRes();
        res.setConferenceID(conferenceID);
        res.setHistoryID(historyID);
        return res;
    }
}
