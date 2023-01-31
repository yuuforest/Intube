package com.ssafy.interview.db.repository.interview;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.interview.db.entitiy.interview.Interview;
import com.ssafy.interview.db.entitiy.interview.InterviewTime;
import com.ssafy.interview.db.entitiy.interview.QInterview;
import com.ssafy.interview.db.entitiy.interview.QInterviewTime;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
public class InterviewTimeRepositoryImpl implements InterviewTimeRepositoryCustom {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QInterviewTime qInterviewTime = QInterviewTime.interviewTime;
    QInterview qInterview = QInterview.interview;


    @Override
    public List<Date> findAllInterviewTime(Long interview_id) {

        List<Date> interviewTimeList = jpaQueryFactory.select(qInterviewTime.interview_start_time)
                .from(qInterviewTime)
                .where(qInterviewTime.interview.id.eq(interview_id))
                .fetch();
        return interviewTimeList;
    }

    @Override
    public List<Date> findInterviewTimeByOwnerId(Long owner_id) {
//        List<Interview> interviewTimeList = jpaQueryFactory.select(qInterview)
//                .from(qInterview)
//                .leftJoin(qInterview.interviewTimeList, qInterviewTime)
//                .fetchJoin()
//                .where(qInterview.user.id.eq(owner_id))
//                .fetch().stream().distinct().collect(Collectors.toList());
        List<Interview> interviewTimeList = jpaQueryFactory.select(qInterview)
                .from(qInterview)
//                .distinct()
                .leftJoin(qInterview.interviewTimeList, qInterviewTime)
                .fetchJoin()
                .where(qInterview.user.id.eq(owner_id))
                .fetch().stream().distinct().collect(Collectors.toList());

        List<Date> conductInterviewTimeList = new ArrayList<>();
        for (Interview interview : interviewTimeList) {
            conductInterviewTimeList.add(interview.getInterviewTimeList().get(0).getInterview_start_time());
        }
        return conductInterviewTimeList;
    }
}
