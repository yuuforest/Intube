package com.ssafy.interview.db.repository.interview;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.interview.db.entitiy.interview.QApplicant;
import com.ssafy.interview.db.entitiy.interview.QInterviewCategory;
import com.ssafy.interview.db.entitiy.interview.QInterviewTime;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.util.List;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
public class InterviewTimeRepositoryImpl implements InterviewTimeRepositoryCustom {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QInterviewTime qInterviewTime = QInterviewTime.interviewTime;
    QApplicant qApplicant = QApplicant.applicant;
    QInterviewCategory qInterviewCategory = QInterviewCategory.interviewCategory;


    @Override
    public List<Date> findAllInterviewTime(Long interview_id) {

        List<Date> interviewTimeList = jpaQueryFactory.select(qInterviewTime.interview_start_time)
                .from(qInterviewTime)
                .where(qInterviewTime.interview.id.eq(interview_id))
                .fetch();
        return interviewTimeList;
    }
}
