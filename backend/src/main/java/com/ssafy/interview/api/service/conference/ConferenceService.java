package com.ssafy.interview.api.service.conference;

import com.ssafy.interview.api.request.conference.*;
import com.ssafy.interview.db.entitiy.conference.Conference;
import com.ssafy.interview.db.entitiy.conference.ConferenceHistory;
import com.ssafy.interview.db.entitiy.interview.Question;

import java.util.List;
import java.util.Optional;

public interface ConferenceService {

    // [Interview Table] + [Conference Table] + [User table]
//    ConferenceInfoRes getInfoConference(Long interviewTimeID, Long conferenceID);

    // [Conference Table]
    Conference startConference(Long interviewID);  // Conference 방 처음 생성
    void endConference(Long conferenceID, String url);
    Optional<Conference> isConferenceByHost(Long interviewTimeID);
    Optional<Conference> isConferenceByUser(Long interviewTimeID);

    // [Conference History Table]
    ConferenceHistory createConferenceHistory(Long conferenceID, String userEmail, int action);
    void updateConferenceHistory(Long historyID, int action);
    void kickConferenceHistory(KickUserInReq kickInfo);
//    List<User> userInConference(Long ConferenceID);

    // [Question Table]
//    void createQuestionInConference(QuestionCreateInReq questionInfo);
    List<Question> questionAllInConference(Long interviewID);

    // [Dialog Table]
    void recordQuestionInConference(RecordQuestionInReq questionInfo);
    void recordDialogInConference(String userEmail, RecordDialogInReq dialogInfo);

    // [Interview Time Table]
    void modifyApplicantState(Long interviewTimeID);
    void modifyInterviewTimeState(Long interviewTimeID);

}
