package com.ssafy.interview.db.repository.interview;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.interview.api.response.interview.InterviewLoadDto;
import com.ssafy.interview.api.response.interview.QInterviewLoadDto;
import com.ssafy.interview.db.entitiy.interview.Interview;
import com.ssafy.interview.db.entitiy.interview.QInterview;
import com.ssafy.interview.db.entitiy.interview.QInterviewCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.List;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
public class InterviewRepositoryImpl implements InterviewRepositoryCustom {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QInterview qInterview = QInterview.interview;
    QInterviewCategory qInterviewCategory = QInterviewCategory.interviewCategory;
    @Override
    public Page<InterviewLoadDto> findAllInterview(String categoryName, String word, Pageable pageable) {
        List<InterviewLoadDto> content = jpaQueryFactory
                .select(new QInterviewLoadDto(qInterview))
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

    private BooleanExpression wordEq(String word) {
        return word.isEmpty() ? null : qInterview.title.contains(word);
    }

    private BooleanExpression categoryEq(String categoryName) {
        return categoryName.isEmpty() ? null : qInterview.interviewCategory.categoryName.eq(categoryName);
    }

}
