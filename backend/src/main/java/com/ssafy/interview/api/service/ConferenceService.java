package com.ssafy.interview.api.service;

import com.ssafy.interview.api.request.Conference.HistoryCreateReq;
import com.ssafy.interview.api.request.Conference.ConferenceStartReq;
import com.ssafy.interview.api.request.Conference.HistoryUpdateReq;

public interface ConferenceService {

    // [Conference Table]
    Long startConference(ConferenceStartReq ConferenceRegisterInfo);  // Conference 방 처음 생성
    void endConference(Long conference_id);

    // [Conference History Table]
    Long createConferenceHistory(HistoryCreateReq historyCreateInfo);
    void updateConferenceHistory(HistoryUpdateReq historyUpdateInfo);

}
