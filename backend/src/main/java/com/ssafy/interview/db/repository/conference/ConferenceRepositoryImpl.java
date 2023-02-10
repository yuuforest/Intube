package com.ssafy.interview.db.repository.conference;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.interview.api.response.result.ConferenceResultDetailRes;
import com.ssafy.interview.api.response.result.QConferenceResultDetailRes;
import com.ssafy.interview.db.entitiy.conference.QConference;
import com.ssafy.interview.db.entitiy.conference.QConferenceResult;
import com.ssafy.interview.db.entitiy.interview.QInterviewTime;
import com.ssafy.interview.db.entitiy.interview.QQuestion;
import org.springframework.beans.factory.annotation.Autowired;

public class ConferenceRepositoryImpl implements ConferenceRepositoryCustom {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QConference qConference = QConference.conference;
    QInterviewTime qInterviewTime = QInterviewTime.interviewTime;
    @Override
    public ConferenceResultDetailRes findConferenceResultDetailRes(Long interview_time_id) {
        return jpaQueryFactory
                .select(new QConferenceResultDetailRes(qConference))
                .from(qConference)
                .where(qConference.interviewTime.id.eq(interview_time_id))
                .fetchFirst();
    }

//    @Autowired
//    private JPAQueryFactory jpaQueryFactory;
//
//    QInterview qInterview = QInterview.interview;
//    QConference qConference = QConference.conference;
//
//    @Override
//    public ConferenceInfoRes findConferenceInfo(Long interviewID, Long conferenceID) {
//        return jpaQueryFactory
//                .select(new QConferenceInfoRes(qInterview.title, qInterview.interviewCategory.categoryName,
//                        qInterview.description, qInterview.estimated_time, qInterview.gender, qInterview.max_people,
//                        qInterview.standard_point, qConference.call_start_time, qConference.sessionid, qConference.user.name))
//                .from(qInterview, qConference)
//                .where(qInterview.id.eq(interviewID), qConference.id.eq(conferenceID))
//                .fetchOne();
//    }
}
