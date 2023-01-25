package com.ssafy.interview.api.service;

import com.ssafy.interview.api.request.Conference.ConferenceRegisterPostReq;
import com.ssafy.interview.db.entitiy.Conference;
import com.ssafy.interview.db.entitiy.ConferenceHistory;
import com.ssafy.interview.db.repository.ConferenceHistoryRepository;
import com.ssafy.interview.db.repository.ConferenceRepository;
import com.ssafy.interview.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
    public Conference createConference(ConferenceRegisterPostReq ConferenceRegisterInfo) {

        Conference conference = new Conference();

        conference.setOwner_id(userRepository.findByEmail(ConferenceRegisterInfo.getUser_email()).get().getId());   // 질문자의 ID
        conference.setInterview_id(ConferenceRegisterInfo.getInterview_id());   // Conference가 관련된 Interview ID

        // Conference 시작 시간
        conference.setCall_start_time(LocalDateTime.now());

        conference.setIs_active(1); // Conference 활성화

        // 숫자와 알파벳으로 된 문자열 랜덤으로 SessionID 생성 (ASCII CODE 48 - 122 / 문자열 길이 10)
        Random random = new Random();

        String generatedString = random.ints(48,122 + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(10)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();

        conference.setSessionid(generatedString);

        conferenceRepository.save(conference);  // Conference 생성

        return conference;
    }

    @Override
    public void createConferenceHistory(Long conference_id, Long user_id, int action, boolean flag) {

        ConferenceHistory conferenceHistory = new ConferenceHistory();

        conferenceHistory.setConference_id(conference_id);
        conferenceHistory.setUser_id(user_id);
        conferenceHistory.setAction(action);

        if(flag) conferenceHistory.setStart_time(LocalDateTime.now());
        else conferenceHistory.setEnd_time(LocalDateTime.now());

        conferenceHistoryRepository.save(conferenceHistory);
    }
}
