package com.ssafy.interview.api.service;

import com.ssafy.interview.db.entitiy.User;
import com.ssafy.interview.db.entitiy.conference.Conference;
import com.ssafy.interview.db.entitiy.conference.ConferenceHistory;

import java.util.ArrayList;
import java.util.List;

public interface ConferenceService {

    // [Conference Table]
    Conference startConference(Long interviewID, String user_email, String sessionID);  // Conference 방 처음 생성
    void endConference(Long conference_id);

    // [Conference History Table]
    ConferenceHistory createConferenceHistory(Long conferenceID, String userEmail, int action);
    void updateConferenceHistory(Long historyID, int action);
    List<User> userInConference(Long ConferenceID);

}
