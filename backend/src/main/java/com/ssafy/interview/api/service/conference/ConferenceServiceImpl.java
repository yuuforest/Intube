package com.ssafy.interview.api.service.conference;

import com.ssafy.interview.api.request.conference.*;
import com.ssafy.interview.db.entitiy.User;
import com.ssafy.interview.db.entitiy.conference.Conference;
import com.ssafy.interview.db.entitiy.conference.ConferenceHistory;
import com.ssafy.interview.db.entitiy.conference.Dialog;
import com.ssafy.interview.db.entitiy.interview.Applicant;
import com.ssafy.interview.db.entitiy.interview.InterviewTime;
import com.ssafy.interview.db.entitiy.interview.Question;
import com.ssafy.interview.db.repository.conference.*;
import com.ssafy.interview.db.repository.interview.ApplicantRepository;
import com.ssafy.interview.db.repository.interview.InterviewTimeRepository;
import com.ssafy.interview.db.repository.interview.QuestionRepository;
import com.ssafy.interview.db.repository.user.UserRepository;
import com.ssafy.interview.db.repository.interview.InterviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service("ConferenceService")
public class ConferenceServiceImpl implements ConferenceService {
    @Autowired
    ConferenceRepository conferenceRepository;
    @Autowired
    ConferenceHistoryRepository conferenceHistoryRepository;
//    @Autowired
//    ConferenceRepositoryCustom conferenceRepositoryCustom;
    @Autowired
    UserRepository userRepository;
    @Autowired
    InterviewTimeRepository interviewTimeRepository;
    @Autowired
    InterviewRepository interviewRepository;
    @Autowired
    QuestionRepository questionRepository;
    @Autowired
    DialogRepository dialogRepository;
    @Autowired
    ApplicantRepository applicantRepository;

//    @Override
//    public ConferenceInfoRes getInfoConference(Long interviewID, Long conferenceID) {
//        // [Conference 방 정보 조회]
//        return conferenceRepositoryCustom.findConferenceInfo(interviewID, conferenceID);
//    }

    @Override
    @Transactional
    public Conference startConference(Long interviewTimeID) {
        // [회의방 생성]
        Conference conference = new Conference();
        conference.setInterviewTime(interviewTimeRepository.findById(interviewTimeID).get());
        conference.setIs_active(1); // Conference 방 시작 (1)
        conferenceRepository.save(conference);  // Conference 생성
        return conference;
    }

    @Override
    @Transactional
    public void endConference(Long conference_id) {
        // [회의방 종료]
        Conference conference = conferenceRepository.findById(conference_id).get();
        conference.setIs_active(2); // Conference 방 종료 (1)
//        conferenceRepository.save(conference);
    }

    @Override
    @Transactional
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
    @Transactional
    public void updateConferenceHistory(Long historyID, int action) {
        // [회의방에 대한 참가자들의 퇴장 기록]
        ConferenceHistory conferenceHistory = conferenceHistoryRepository.findById(historyID).get();
        conferenceHistory.setAction(action);
//        conferenceHistoryRepository.save(conferenceHistory);
    }

    @Override
    @Transactional
    public void kickConferenceHistory(KickUserInReq kickInfo) {
        // [질문자가 Conference에 참여중인 참가자를 퇴장시킴]
        User user = userRepository.findByEmail(kickInfo.getUserEmail()).get();
        ConferenceHistory conferenceHistory
                = conferenceHistoryRepository.findByConference_idAndUser_idOrderByIdDesc(kickInfo.getConferenceID(), user.getId()).get(0);
        conferenceHistory.setAction(3);
//        conferenceHistoryRepository.save(conferenceHistory);
    }

//    @Override
//    public List<User> userInConference(Long conferenceID) {
//        // [현재 Conference에 참여중인 User 목록 조회]
//        List<User> users = new ArrayList<>();
//        List<ConferenceHistory> histories = conferenceHistoryRepository.findByConference_idAndAction(conferenceID, 2);
//        for (ConferenceHistory history : histories) {
//            users.add(history.getUser());
//        }
//        return users;
//    }

    @Override
    @Transactional
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
    @Transactional
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
    @Transactional
    public void recordDialogInConference(String userEmail, RecordDialogInReq dialogInfo) {
        // [Conference 진행 중 발언자가 발언한 내용과 그에 대한 정보 기록]
        Dialog now = new Dialog();
        now.setUser(userRepository.findByEmail(userEmail).get());
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

    @Override
    @Transactional
    public void modifyApplicantState(Long interviewTimeID) {
        // [Conference 종료 시, applicant의 상태를 완료인 3으로 변경]
        List<Applicant> applicants = applicantRepository.findByInterviewTime_Id(interviewTimeID);
        for (Applicant applicant : applicants) {
            applicant.setApplicantState(3);
        }
    }

    @Override
    @Transactional
    public void modifyInterviewTimeState(Long interviewTimeID) {
        InterviewTime interviewTime = interviewTimeRepository.findById(interviewTimeID).get();
        interviewTime.setModifyResultState(1);
    }
}
