package com.ssafy.interview.db.repository.conference;

import com.ssafy.interview.api.response.result.ConferenceResultDetailRes;
import org.springframework.stereotype.Repository;

@Repository
public interface ConferenceRepositoryCustom {

//    ConferenceInfoRes findConferenceInfo(Long interviewID, Long conferenceID);
    ConferenceResultDetailRes findConferenceResultDetailRes(Long interview_time_id);
}
