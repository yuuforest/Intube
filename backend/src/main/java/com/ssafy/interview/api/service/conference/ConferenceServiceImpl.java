package com.ssafy.interview.api.service.conference;

import com.ssafy.interview.api.request.conference.*;
import com.ssafy.interview.api.response.conference.ConferenceInfoRes;
import com.ssafy.interview.db.entitiy.User;
import com.ssafy.interview.db.entitiy.conference.Conference;
import com.ssafy.interview.db.entitiy.conference.ConferenceHistory;
import com.ssafy.interview.db.entitiy.conference.Dialog;
import com.ssafy.interview.db.entitiy.conference.Mark;
import com.ssafy.interview.db.entitiy.interview.Question;
import com.ssafy.interview.db.repository.conference.*;
import com.ssafy.interview.db.repository.interview.QuestionRepository;
import com.ssafy.interview.db.repository.user.UserRepository;
import com.ssafy.interview.db.repository.interview.InterviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("ConferenceService")
public class ConferenceServiceImpl implements ConferenceService {
    @Autowired
    ConferenceRepository conferenceRepository;
    @Autowired
    ConferenceHistoryRepository conferenceHistoryRepository;
    @Autowired
    ConferenceRepositoryCustom conferenceRepositoryCustom;
    @Autowired
    UserRepository userRepository;
    @Autowired
    InterviewRepository interviewRepository;
    @Autowired
    QuestionRepository questionRepository;
    @Autowired
    MarkRepository markRepository;
    @Autowired
    DialogRepository dialogRepository;

    @Override
    public ConferenceInfoRes getInfoConference(Long interviewID, Long conferenceID) {
        // [Conference 방 정보 조회]
        return conferenceRepositoryCustom.findConferenceInfo(interviewID, conferenceID);
    }

    @Override
    public Conference startConference(Long interviewID, String user_email, String sessionID) {
        // [회의방 생성]
        Conference conference = new Conference();
        conference.setUser(userRepository.findByEmail(user_email).get());
        conference.setInterview(interviewRepository.findById(interviewID).get());
        conference.setIs_active(1); // Conference 방 시작 (1)
        conference.setSessionid(sessionID);
        conferenceRepository.save(conference);  // Conference 생성
        return conference;
    }

    @Override
    public void endConference(Long conference_id) {
        // [회의방 종료]
        Conference conference = conferenceRepository.findById(conference_id).get();
        conference.setIs_active(2); // Conference 방 종료 (1)
        conferenceRepository.save(conference);
    }

    @Override
    public ConferenceHistory createConferenceHistory(Long conferenceID, String userEmail, int action) {
        // [회의방에 대한 참가자들의 입장 기록]
        ConferenceHistory conferenceHistory = new ConferenceHistory();
        conferenceHistory.setConference(conferenceRepository.findById(conferenceID).get());
        conferenceHistory.setUser(userRepository.findByEmail(userEmail).get());
        conferenceHistory.setAction(action);
        conferenceHistoryRepository.save(conferenceHistory);
        return conferenceHistory;
    }

    @Override
    public void updateConferenceHistory(Long historyID, int action) {
        // [회의방에 대한 참가자들의 퇴장 기록]
        ConferenceHistory conferenceHistory = conferenceHistoryRepository.findById(historyID).get();
        conferenceHistory.setAction(action);
        conferenceHistoryRepository.save(conferenceHistory);
    }

    @Override
    public void kickConferenceHistory(KickUserInReq kickInfo) {
        // [질문자가 Conference에 참여중인 참가자를 퇴장시킴]
        User user = userRepository.findByEmail(kickInfo.getUserEmail()).get();
        ConferenceHistory conferenceHistory     // QueryDSL로 최근 기록 딱 하나만 가져올 수도 있음 -> 코드를 변경해야 할까?
                = conferenceHistoryRepository.findByConference_idAndUser_idOrderByIdDesc(kickInfo.getConferenceID(), user.getId()).get(0);
        conferenceHistory.setAction(3);
        conferenceHistoryRepository.save(conferenceHistory);
    }

    @Override
    public List<User> userInConference(Long conferenceID) {
        // [현재 Conference에 참여중인 User 목록 조회]
        List<User> users = new ArrayList<>();
        List<ConferenceHistory> histories = conferenceHistoryRepository.findByConference_idAndAction(conferenceID, 2);
        for (ConferenceHistory history : histories) {
            users.add(history.getUser());
        }
        return users;
    }

    @Override
    public void createQuestionInConference(QuestionCreateInReq questionInfo) {
        // [Conference 진행 중에 Interview 내에서 새로운 질문 추가]
        Question question = new Question();
        question.setInterview(interviewRepository.findById(questionInfo.getInterviewID()).get());
        question.setContent(questionInfo.getContent());
        questionRepository.save(question);
    }

    @Override
    public List<Question> questionAllInConference(Long interviewID) {
        // [Interview에 대한 모든 Question 조회]
        return questionRepository.findByInterview_idOrderById(interviewID);
    }

    @Override
    public void createMarkInConference(MarkCreateInReq markInfo) {
        // [질문자가 원하는 시간 마크]
        Mark mark = new Mark();
        mark.setConference(conferenceRepository.findById(markInfo.getConferenceID()).get());
        mark.setMark_time(markInfo.getMarkTime());
        markRepository.save(mark);
    }

    @Override
    public void recordQuestionInConference(RecordQuestionInReq questionInfo) {
        // [Conference 진행 중 각 질문이 시작한 시간 기록]
        Dialog dialog = new Dialog();
        dialog.setConference(conferenceRepository.findById(questionInfo.getConferenceID()).get());
        dialog.setQuestion(questionRepository.findById(questionInfo.getQuestionID()).get());
        dialog.setTimestamp(questionInfo.getTimestamp());
        dialog.setUser(null);
        dialog.setContent(null);
        dialogRepository.save(dialog);
    }

    @Override
    public void recordDialogInConference(RecordDialogInReq dialogInfo) {
        // [Conference 진행 중 발언자가 발언한 내용과 그에 대한 정보 기록]
        Dialog now = new Dialog();
        now.setUser(userRepository.findByEmail(dialogInfo.getUserEmail()).get());
        now.setConference(conferenceRepository.findById(dialogInfo.getConferenceID()).get());
        if(dialogInfo.getQuestionID() == null) {
            now.setQuestion(null);
        } else {
            now.setQuestion(questionRepository.findById(dialogInfo.getQuestionID()).get());
        }
        now.setContent(dialogInfo.getContent());
        now.setTimestamp(dialogInfo.getTimestamp());
        dialogRepository.save(now);
    }
}
