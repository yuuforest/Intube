package com.ssafy.interview.db.repository.conference;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.interview.api.response.result.ConferenceResultRes;
import com.ssafy.interview.api.response.result.QConferenceResultRes;
import com.ssafy.interview.db.entitiy.conference.QConference;
import com.ssafy.interview.db.entitiy.conference.QConferenceResult;
import com.ssafy.interview.db.entitiy.interview.QInterviewTime;
import com.ssafy.interview.db.entitiy.interview.QQuestion;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class ConferenceResultRepositoryImpl implements ConferenceResultRepositoryCustom {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QQuestion qQuestion = QQuestion.question;
    QConferenceResult qConferenceResult = QConferenceResult.conferenceResult;
    QConference qConference = QConference.conference;
    QInterviewTime qInterviewTime = QInterviewTime.interviewTime;

    @Override
    public List<ConferenceResultRes> findConferenceResultRes(Long conference_id) {

        return jpaQueryFactory
                .select(new QConferenceResultRes(qConferenceResult, qQuestion))
                .from(qConferenceResult)
                .leftJoin(qConferenceResult.question, qQuestion)
                .where(qConferenceResult.conference.id.eq(conference_id))
                .fetch();
    }
}
