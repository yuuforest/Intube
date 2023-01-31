package com.ssafy.interview.api.service.conference;

import com.ssafy.interview.api.request.conference.*;
import com.ssafy.interview.db.entitiy.User;
import com.ssafy.interview.db.entitiy.conference.Conference;
import com.ssafy.interview.db.entitiy.conference.ConferenceHistory;
import com.ssafy.interview.db.entitiy.conference.Dialog;
import com.ssafy.interview.db.entitiy.interview.Question;

import java.util.List;

public interface ConferenceService {

    // [Conference Table]
    Conference startConference(Long interviewID, String user_email, String sessionID);  // Conference 방 처음 생성
    void endConference(Long conference_id);

    // [Conference History Table]
    ConferenceHistory createConferenceHistory(Long conferenceID, String userEmail, int action);
    void updateConferenceHistory(Long historyID, int action);
    void kickConferenceHistory(kickUserInReq kickInfo);
    List<User> userInConference(Long ConferenceID);

    // [Question Table]
    void createQuestionInConference(questionCreateInReq questionInfo);
    List<Question> questionInfoInConference(Long interviewID);

    // [Mark Table]
    void createMarkInConference(markCreateInReq markInfo);

    // [Dialog Table]
    void recordQuestionInConference(recordQuestionInReq questionInfo);
    void recordDialogInConference(recordDialogInReq dialogInfo);

}
