package com.ssafy.interview.api.service;

import com.ssafy.interview.db.entitiy.Conference;
import com.ssafy.interview.db.entitiy.ConferenceHistory;

public interface ConferenceService {

    // [Conference Table]
    Conference startConference(Long interviewID, String user_email, String sessionID);  // Conference 방 처음 생성
    void endConference(Long conference_id);

    // [Conference History Table]
    ConferenceHistory createConferenceHistory(Long conferenceID, String userEmail, int action);
    void updateConferenceHistory(Long historyID, int action);

}
