package com.ssafy.interview.db.repository.conference;

import com.ssafy.interview.api.response.conference.ConferenceInfoRes;
import org.springframework.stereotype.Repository;

@Repository
public interface ConferenceRepositoryCustom {

    ConferenceInfoRes findConferenceInfo(Long interviewID, Long conferenceID);
}
