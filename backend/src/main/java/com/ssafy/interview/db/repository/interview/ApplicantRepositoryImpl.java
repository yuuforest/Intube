package com.ssafy.interview.db.repository.interview;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.interview.api.response.interview.InterviewDetailApplicantRes;
import com.ssafy.interview.api.response.interview.QInterviewDetailApplicantRes;
import com.ssafy.interview.api.response.user.ApplicantDetailRes;
import com.ssafy.interview.api.response.user.QApplicantDetailRes;
import com.ssafy.interview.db.entitiy.QUser;
import com.ssafy.interview.db.entitiy.interview.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
public class ApplicantRepositoryImpl implements ApplicantRepositoryCustom {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QInterviewTime qInterviewTime = QInterviewTime.interviewTime;
    QApplicant qApplicant = QApplicant.applicant;
    QUser qUser = QUser.user;
    QInterview qInterview = QInterview.interview;

    @Override
    public Optional<Applicant> findByUserIdAndInterviewId(Long user_id, Long interview_id) {
        Applicant applicant = jpaQueryFactory
                .select(qApplicant)
                .from(qApplicant)
                .leftJoin(qApplicant.interviewTime, qInterviewTime)
                .where(qInterviewTime.interview.id.eq(interview_id), qApplicant.user.id.eq(user_id))
                .fetchFirst(); // limit 1
        return Optional.ofNullable(applicant);
    }

    @Override
    public List<ApplicantDetailRes> findApplicantDetailRes(Long interview_time_id) {
        return jpaQueryFactory
                .select(new QApplicantDetailRes(qApplicant, qUser))
                .from(qApplicant)
                .leftJoin(qApplicant.user, qUser)
                .where(qApplicant.interviewTime.id.eq(interview_time_id), qApplicant.applicantState.in(1, 2))
                .fetch();
    }

    @Override
    public Optional<List<InterviewDetailApplicantRes>> findInterviewDetailByIntervieweeRes(Long user_id) {
        List<InterviewDetailApplicantRes> content = jpaQueryFactory
                .select(new QInterviewDetailApplicantRes(qInterview, qInterviewTime, qApplicant, qUser))
                .from(qApplicant)
                .leftJoin(qApplicant.interviewTime, qInterviewTime).on(qApplicant.user.id.eq(user_id), qApplicant.applicantState.in(2))
                .leftJoin(qInterviewTime.interview, qInterview)
                .innerJoin(qInterview.user, qUser)
                .fetch();

        return Optional.ofNullable(content);
    }

    @Override
    public Optional<List<Tuple>> countInterviewByApplicantState(Long user_id) {
        List<Tuple> tupleList = jpaQueryFactory
                .select(qApplicant.applicantState, qApplicant.id.count())
                .from(qApplicant)
                .innerJoin(qApplicant.interviewTime, qInterviewTime).on(qApplicant.user.id.eq(user_id))
                .innerJoin(qInterviewTime.interview, qInterview)
                .where(qApplicant.applicantState.in(1, 3))
                .groupBy(qApplicant.applicantState)
                .orderBy(qApplicant.applicantState.asc())
                .fetch();
        return Optional.ofNullable(tupleList);
    }

    @Override
    public Boolean existApplicantByUserId(Long user_id, Long interview_time_id) {
        Long fetchOne = jpaQueryFactory
                .select(qApplicant.id)
                .from(qApplicant)
                .leftJoin(qApplicant.interviewTime, qInterviewTime)
                .where(qInterviewTime.id.eq(interview_time_id), qApplicant.user.id.eq(user_id))
                .fetchFirst(); // limit 1

        return fetchOne != null; // 1개가 있는지 없는지 판단 (없으면 null이라 null체크)
    }

    @Override
    public Optional<Applicant> findByApplicantByUserId(Long user_id, Long interview_time_id) {
        Applicant applicant = jpaQueryFactory
                .select(qApplicant)
                .from(qApplicant)
                .leftJoin(qApplicant.interviewTime, qInterviewTime)
                .where(qInterviewTime.id.eq(interview_time_id), qApplicant.user.id.eq(user_id))
                .fetchFirst(); // limit 1

        return Optional.ofNullable(applicant);
    }
}
