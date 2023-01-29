package com.ssafy.interview.api.service;

import com.ssafy.interview.db.entitiy.conference.Conference;
import com.ssafy.interview.db.entitiy.conference.ConferenceHistory;
import com.ssafy.interview.db.repository.ConferenceHistoryRepository;
import com.ssafy.interview.db.repository.ConferenceRepository;
import com.ssafy.interview.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("ConferenceService")
public class ConferenceServiceImpl implements  ConferenceService{
    @Autowired
    ConferenceRepository conferenceRepository;

    @Autowired
    ConferenceHistoryRepository conferenceHistoryRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public Conference startConference(Long interviewID, String user_email, String sessionID) {
        // [회의방 생성]
        Conference conference = new Conference();

        conference.setOwner_id(userRepository.findByEmail(user_email).get().getId());
        conference.setInterview_id(interviewID);
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

        conferenceHistory.setConference_id(conferenceID);
        conferenceHistory.setUser_id(userRepository.findByEmail(userEmail).get().getId());
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
}
