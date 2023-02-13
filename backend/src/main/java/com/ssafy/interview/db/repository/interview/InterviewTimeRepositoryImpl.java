package com.ssafy.interview.db.repository.interview;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.interview.api.response.interview.InterviewTimeRes;
import com.ssafy.interview.api.response.interview.QInterviewTimeRes;
import com.ssafy.interview.db.entitiy.interview.*;
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
    QApplicant qApplicant = QApplicant.applicant;


    @Override
    public List<InterviewTimeRes> findAllInterviewTime(Long interview_id) {
        List<InterviewTimeRes> interviewTimeResList = jpaQueryFactory
                .select(new QInterviewTimeRes(qInterviewTime))
                .from(qInterviewTime)
                .where(qInterviewTime.interview.id.eq(interview_id))
                .fetch();

        return interviewTimeResList;
    }

    @Override
    public List<Date> findInterviewTimeByOwnerId(Long owner_id) {
        List<Interview> interviewList = jpaQueryFactory.select(qInterview)
                .from(qInterview)
                .leftJoin(qInterview.interviewTimeList, qInterviewTime)
                .fetchJoin()
                .where(qInterview.user.id.eq(owner_id))
                .fetch().stream().distinct().collect(Collectors.toList());

        List<Date> conductInterviewTimeList = new ArrayList<>();
        for (Interview interview : interviewList) {
            conductInterviewTimeList.add(interview.getInterviewTimeList().get(0).getInterview_start_time());
        }
        return conductInterviewTimeList;
    }

    @Override
    public Boolean existModifyStateByState(Long interview_time_id) {
        Long fetchOne = jpaQueryFactory
                .select(qInterviewTime.id)
                .from(qInterviewTime)
                .where(qInterviewTime.id.eq(interview_time_id), qInterviewTime.modifyResultState.eq(1))
                .fetchFirst(); // limit 1

        return fetchOne != null; // 1개가 있는지 없는지 판단 (없으면 null이라 null체크)
    }

    @Override
    public Boolean existInterviewTimeByInterviewId(Long interview_id) {
        Long fetchOne = jpaQueryFactory
                .select(qInterviewTime.id)
                .from(qInterviewTime)
                .where(qInterviewTime.interview.id.eq(interview_id), qInterviewTime.modifyResultState.eq(1))
                .fetchFirst(); // limit 1

        return fetchOne != null; // 1개가 있는지 없는지 판단 (없으면 null이라 null체크)
    }
}
