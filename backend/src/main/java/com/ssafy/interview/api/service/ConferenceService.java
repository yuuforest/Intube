package com.ssafy.interview.api.service;

import com.ssafy.interview.api.request.Conference.ConferenceRegisterPostReq;
import com.ssafy.interview.db.entitiy.Conference;

public interface ConferenceService {

    // Conference Table
    Conference createConference(ConferenceRegisterPostReq ConferenceRegisterInfo);  // Conference 방 처음 생성

    // Conference History Table
    // 참여자들의 Conference 방 참여 여부와 그에 따른 정보 저장
    void createConferenceHistory(Long conference_id, Long user_id, int action, boolean flag);

}
