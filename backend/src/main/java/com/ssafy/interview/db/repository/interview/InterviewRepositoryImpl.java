package com.ssafy.interview.db.repository.interview;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.interview.api.response.interview.InterviewDetailRes;
import com.ssafy.interview.api.response.interview.InterviewLoadRes;
import com.ssafy.interview.api.response.interview.QInterviewDetailRes;
import com.ssafy.interview.api.response.interview.QInterviewLoadRes;
import com.ssafy.interview.db.entitiy.QUser;
import com.ssafy.interview.db.entitiy.interview.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.Date;
import java.util.List;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
public class InterviewRepositoryImpl implements InterviewRepositoryCustom {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QInterview qInterview = QInterview.interview;
    QUser qUser = QUser.user;
    QInterviewTime qInterviewTime = QInterviewTime.interviewTime;
    QApplicant qApplicant = QApplicant.applicant;
    QInterviewCategory qInterviewCategory = QInterviewCategory.interviewCategory;

    @Override
    public Page<InterviewLoadRes> findAllInterview(String categoryName, String word, Pageable pageable) {
        List<InterviewLoadRes> content = jpaQueryFactory
                .select(new QInterviewLoadRes(qInterview))
                .from(qInterview)
                .leftJoin(qInterview.interviewCategory, qInterviewCategory)
                .where(wordEq(word), categoryEq(categoryName), qInterview.interview_state.eq(4))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Interview> countQuery = jpaQueryFactory
                .select(qInterview)
                .from(qInterview)
                .leftJoin(qInterview.interviewCategory, qInterviewCategory)
                .where(wordEq(word), categoryEq(categoryName), qInterview.interview_state.eq(4));


        return PageableExecutionUtils.getPage(content, pageable, () -> countQuery.fetchCount());
    }

    @Override
    public InterviewDetailRes findDetailInterview(Long user_id, Long interview_id) {

        Integer findState = jpaQueryFactory
                .select(qApplicant.applicantState)
                .from(qApplicant)
                .leftJoin(qApplicant.interviewTime, qInterviewTime)
                .where(qInterviewTime.interview.id.eq(interview_id), qApplicant.user.id.eq(user_id))
                .fetchFirst(); // limit 1

        return jpaQueryFactory
                .select(new QInterviewDetailRes(qInterview, qUser))
                .from(qInterview)
                .leftJoin(qInterview.user, qUser)
                .where(qInterview.id.eq(interview_id))
                .fetchOne();
    }

    @Override
    public Boolean existApplicantByInterviewId(Long user_id, Long interview_id) {
        Integer fetchOne = jpaQueryFactory
                .select(qApplicant.applicantState)
                .from(qApplicant)
                .leftJoin(qApplicant.interviewTime, qInterviewTime)
                .where(qInterviewTime.interview.id.eq(interview_id), qApplicant.user.id.eq(user_id))
                .fetchFirst(); // limit 1

        return fetchOne != null; // 1개가 있는지 없는지 판단 (없으면 null이라 null체크)
    }

    private BooleanExpression wordEq(String word) {
        return word.isEmpty() ? null : qInterview.title.contains(word);
    }

    private BooleanExpression categoryEq(String categoryName) {
        return categoryName.isEmpty() ? null : qInterview.interviewCategory.categoryName.eq(categoryName);
    }

}
