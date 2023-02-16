package com.ssafy.interview.db.repository.interview;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.interview.api.response.interview.*;
import com.ssafy.interview.common.util.QueryDslUtil;
import com.ssafy.interview.db.entitiy.QUser;
import com.ssafy.interview.db.entitiy.interview.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.querydsl.jpa.JPAExpressions.select;
import static org.springframework.util.ObjectUtils.isEmpty;

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
    public Page<InterviewLoadRes> findInterviewByCategory(Long user_id, String categoryName, String word, Pageable pageable) {
        List<OrderSpecifier> ORDERS = getAllOrderSpecifiers(pageable);

        List<InterviewLoadRes> content = jpaQueryFactory
                .select(new QInterviewLoadRes(qInterview))
                .from(qInterview)
//                .where(wordEq(word), categoryEq(categoryName), qInterview.interviewState.eq(4), qApplicant.user.id.isNull().or(qApplicant.user.id.ne(user_id)))
                .where(wordEq(word), categoryEq(categoryName), interviewStateEq(4), qInterview.user.id.ne(user_id))
                .orderBy(ORDERS.stream().toArray(OrderSpecifier[]::new))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Interview> countQuery = jpaQueryFactory
                .select(qInterview)
                .from(qInterview)
                .where(wordEq(word), categoryEq(categoryName), interviewStateEq(4), qInterview.user.id.ne(user_id));

        return PageableExecutionUtils.getPage(content, pageable, () -> countQuery.fetchCount());
    }

    @Override
    public Page<InterviewTimeLoadRes> findInterviewByInterviewState(Long user_id, int interviewState, String word, Pageable pageable) {
        List<OrderSpecifier> ORDERS = getAllOrderSpecifiers(pageable);

        List<Long> findDoneId = jpaQueryFactory.select(qInterview.id)
                .from(qInterview)
//                .leftJoin(qInterview.interviewCategory, qInterviewCategory)
                .where(wordEq(word), qInterview.user.id.eq(user_id), interviewStateEq(interviewState))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        List<InterviewTimeLoadRes> content = jpaQueryFactory
                .select(new QInterviewTimeLoadRes(qInterview))
                .from(qInterview)
//                .leftJoin(qInterview.interviewCategory, qInterviewCategory)
                .where(findDoneId.isEmpty() ? qInterview.isNull() : qInterview.id.in(findDoneId))
                .orderBy(ORDERS.stream().toArray(OrderSpecifier[]::new))
//                .offset(pageable.getOffset())
//                .limit(pageable.getPageSize())
                .fetch();

        int i = 0;
        for (Long id : findDoneId) {
            List<InterviewTimeDetailRes> timeDetailRes = jpaQueryFactory
                    .select(new QInterviewTimeDetailRes(
                            qInterviewTime,
                            select(qApplicant.count())
                                    .from(qApplicant)
                                    .join(qApplicant.interviewTime)
                                    .where(qApplicant.interviewTime.id.eq(qInterviewTime.id), qApplicant.applicantState.eq(1)),
                            select(qApplicant.count())
                                    .from(qApplicant)
                                    .join(qApplicant.interviewTime)
                                    .where(qApplicant.interviewTime.id.eq(qInterviewTime.id), qApplicant.applicantState.eq(2))))
                    .from(qInterviewTime)
                    .where(qInterviewTime.interview.id.eq(id))
                    .fetch();
            content.get(i++).setInterviewTimeDetailResList(timeDetailRes);
        }

        JPAQuery<Interview> countQuery = jpaQueryFactory
                .select(qInterview)
                .from(qInterview)
//                .leftJoin(qInterview.interviewCategory, qInterviewCategory)
                .where(wordEq(word), qInterview.user.id.eq(user_id), interviewStateEq(interviewState));


        return PageableExecutionUtils.getPage(content, pageable, () -> countQuery.fetchCount());
    }

    @Override
    public List<InterviewTimeLoadRes> findInterviewByInterviewerMyPage(Long user_id, int interviewState) {
        List<Long> findDoneId = jpaQueryFactory.select(qInterview.id)
                .from(qInterview)
//                .leftJoin(qInterview.interviewCategory, qInterviewCategory)
                .where(qInterview.user.id.eq(user_id), interviewStateEq(interviewState))
                .fetch();

        List<InterviewTimeLoadRes> content = jpaQueryFactory
                .select(new QInterviewTimeLoadRes(qInterview))
                .from(qInterview)
//                .leftJoin(qInterview.interviewCategory, qInterviewCategory)
                .where(findDoneId.isEmpty() ? qInterview.isNull() : qInterview.id.in(findDoneId))
                .fetch();

        int i = 0;
        for (Long id : findDoneId) {
            List<InterviewTimeDetailRes> timeDetailRes = jpaQueryFactory
                    .select(new QInterviewTimeDetailRes(
                            qInterviewTime,
                            select(qApplicant.count())
                                    .from(qApplicant)
                                    .join(qApplicant.interviewTime)
                                    .where(qApplicant.interviewTime.id.eq(qInterviewTime.id), qApplicant.applicantState.eq(1)),
                            select(qApplicant.count())
                                    .from(qApplicant)
                                    .join(qApplicant.interviewTime)
                                    .where(qApplicant.interviewTime.id.eq(qInterviewTime.id), qApplicant.applicantState.eq(2))))
                    .from(qInterviewTime)
                    .where(qInterviewTime.interview.id.eq(id))
                    .fetch();
            content.get(i++).setInterviewTimeDetailResList(timeDetailRes);
        }

        return content;
    }

    @Override
    public Page<InterviewApplicantDetailRes> findInterviewByApplicantState(Long user_id, int applicantState, String word, Pageable pageable) {
        List<OrderSpecifier> ORDERS = getAllOrderSpecifiers(pageable);

        List<InterviewApplicantDetailRes> content = jpaQueryFactory
                .select(new QInterviewApplicantDetailRes(qInterview, qUser, qInterviewTime))
                .from(qInterview)
                .leftJoin(qInterview.user, qUser)
                .leftJoin(qInterview.interviewTimeList, qInterviewTime)
                .leftJoin(qInterviewTime.applicantList, qApplicant)
                .where(wordEq(word), qApplicant.applicantState.eq(applicantState), qApplicant.user.id.eq(user_id))
                .orderBy(ORDERS.stream().toArray(OrderSpecifier[]::new))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        for (InterviewApplicantDetailRes detail : content) {
            detail.setApplicant_state(applicantState);
        }

        JPAQuery<Applicant> countQuery = jpaQueryFactory
                .select(qApplicant)
                .from(qApplicant)
                .leftJoin(qApplicant.interviewTime, qInterviewTime)
                .fetchJoin()
                .where(wordEq(word), qApplicant.user.id.eq(user_id), qApplicant.applicantState.eq(applicantState));


        return PageableExecutionUtils.getPage(content, pageable, () -> countQuery.fetchCount());
    }

    @Override
    public InterviewDetailRes findDetailInterview(Long user_id, Long interview_id) {
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

    @Override
    public Boolean existInterviewByUserId(Long user_id, Long interview_id) {
        Long fetchOne = jpaQueryFactory
                .select(qInterview.id)
                .from(qInterview)
                .where(qInterview.id.eq(interview_id), qInterview.user.id.eq(user_id))
                .fetchFirst(); // limit 1

        return fetchOne != null; // 1개가 있는지 없는지 판단 (없으면 null이라 null체크)
    }

    private List<OrderSpecifier> getAllOrderSpecifiers(Pageable pageable) {
        List<OrderSpecifier> ORDERS = new ArrayList<>();

        if (!isEmpty(pageable.getSort())) {
            for (Sort.Order order : pageable.getSort()) {
                Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;

                switch (order.getProperty()) {
                    case "apply_start_time":
                        OrderSpecifier<?> apply_start_time = QueryDslUtil
                                .getSortedColumn(direction, qInterview, "apply_start_time");
                        ORDERS.add(apply_start_time);
                        break;
                    case "apply_end_time":
                        OrderSpecifier<?> apply_end_time = QueryDslUtil
                                .getSortedColumn(direction, qInterview, "apply_end_time");
                        ORDERS.add(apply_end_time);
                        break;
                    case "standard_point":
                        OrderSpecifier<?> standard_point = QueryDslUtil
                                .getSortedColumn(direction, qInterview, "standard_point");
                        ORDERS.add(standard_point);
                        break;
                    default:
                        break;
                }
            }
        }

        return ORDERS;
    }

    private BooleanExpression wordEq(String word) {
        return word.isEmpty() ? null : qInterview.title.contains(word);
    }

    private BooleanExpression interviewStateEq(int interviewState) {
        if (interviewState == 0) {
            return null;
        } else {
            return qInterview.interviewState.eq(interviewState);
        }
    }

    private BooleanExpression categoryEq(String categoryName) {
        return categoryName.isEmpty() ? null : qInterview.interviewCategory.categoryName.eq(categoryName);
    }

}
