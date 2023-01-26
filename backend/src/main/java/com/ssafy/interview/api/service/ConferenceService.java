package com.ssafy.interview.api.service;

import com.ssafy.interview.api.request.Conference.ConferenceEndReq;
import com.ssafy.interview.api.request.Conference.HistoryCreateReq;
import com.ssafy.interview.api.request.Conference.ConferenceStartReq;
import com.ssafy.interview.api.request.Conference.HistoryUpdateReq;
import com.ssafy.interview.db.entitiy.Conference;

public interface ConferenceService {

    // [Conference Table]
    Long startConference(ConferenceStartReq ConferenceRegisterInfo);  // Conference 방 처음 생성
    void endConference(Long conference_id);

    // [Conference History Table]
    // 참여자들의 Conference 방 참여 여부와 그에 따른 정보 저장
    Long createConferenceHistory(HistoryCreateReq historyCreateInfo);
    void updateConferenceHistory(HistoryUpdateReq historyUpdateInfo);

}
