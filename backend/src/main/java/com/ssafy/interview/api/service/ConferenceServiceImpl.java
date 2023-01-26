package com.ssafy.interview.api.service;

import com.ssafy.interview.api.request.Conference.HistoryCreateReq;
import com.ssafy.interview.api.request.Conference.ConferenceStartReq;
import com.ssafy.interview.api.request.Conference.HistoryUpdateReq;
import com.ssafy.interview.db.entitiy.Conference;
import com.ssafy.interview.db.entitiy.ConferenceHistory;
import com.ssafy.interview.db.repository.ConferenceHistoryRepository;
import com.ssafy.interview.db.repository.ConferenceRepository;
import com.ssafy.interview.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service("ConferenceService")
public class ConferenceServiceImpl implements  ConferenceService{
    @Autowired
    ConferenceRepository conferenceRepository;

    @Autowired
    ConferenceHistoryRepository conferenceHistoryRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public Long startConference(ConferenceStartReq ConferenceRegisterInfo) {
        // [회의방 생성]
        Conference conference = new Conference();

        // Conference 방 생성자 ID, Interview ID, Conference 방 활성화 (1)
        conference.setOwner_id(userRepository.findByEmail(ConferenceRegisterInfo.getUser_email()).get().getId());
        conference.setInterview_id(ConferenceRegisterInfo.getInterview_id());
        conference.setIs_active(1);

        // 숫자와 알파벳으로 된 문자열 랜덤으로 SessionID 생성 (ASCII CODE 48 - 122 / 문자열 길이 10)
        Random random = new Random();
        String generatedString = random.ints(48,122 + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(10)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
        conference.setSessionid(generatedString);

        conferenceRepository.save(conference);  // Conference 생성
        return conference.getId();
    }

    @Override
    public void endConference(Long conference_id) {
        // [회의방 종료]
        Conference conference = conferenceRepository.findById(conference_id).get();
        conference.setIs_active(2);
        conferenceRepository.save(conference);
    }

    @Override
    public Long createConferenceHistory(HistoryCreateReq historyInfo) {
        // [회의방에 대한 참가자들의 입장 기록]
        ConferenceHistory conferenceHistory = new ConferenceHistory();
        conferenceHistory.setConference_id(historyInfo.getConference_id());
        conferenceHistory.setUser_id(userRepository.findByEmail(historyInfo.getUser_email()).get().getId());
        conferenceHistory.setAction(historyInfo.getAction());
        conferenceHistoryRepository.save(conferenceHistory);
        return conferenceHistory.getId();
    }

    @Override
    public void updateConferenceHistory(HistoryUpdateReq historyUpdateInfo) {
        // [회의방에 대한 참가자들의 퇴장 기록]
        ConferenceHistory conferenceHistory
                = conferenceHistoryRepository.findById(historyUpdateInfo.getHistory_id()).get();
        conferenceHistory.setAction(historyUpdateInfo.getAction());
        conferenceHistoryRepository.save(conferenceHistory);
    }
}
