package com.ssafy.interview.db.repository.interview;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.interview.api.response.interview.InterviewLoadDto;
import com.ssafy.interview.api.response.interview.QInterviewLoadDto;
import com.ssafy.interview.db.entitiy.Interview;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
public class InterviewRepositoryImpl implements InterviewRepositoryCustom {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;

//    private final JPAQueryFactory jpaQueryFactory;
//
//    public InterviewRepositoryImpl(EntityManager em) {
//        this.jpaQueryFactory = new JPAQueryFactory(em);
//    }

    @Override
    public Page<Interview> findInterview(String word, Pageable pageable) {
//        List<Long> findDoneId = jpaQueryFactory.select(interview.id)
//                .from(interview)
//                .join(productSize).on(productSize.product.eq(product))
//                .leftJoin(trade).on(trade.productSize.eq(productSize), trade.tradeState.eq(TradeState.DONE))
//                .where(nameEq(name), brandNamesEq(brandNames))
//                .groupBy(product)
//                .orderBy(trade.count().desc(), product.id.desc())
//                .offset(pageable.getOffset())
//                .limit(pageable.getPageSize())
//                .fetch();

        List<InterviewLoadDto> content = jpaQueryFactory
                .select(new QInterviewLoadDto(interview, category_name))
                .from(interview)
                .join(interviewCategory).on(interviewCategory.interview.eq(interview))
                .groupBy(interview)
                .fetch();

        Long count = jpaQueryFactory.select(interview.count())
                .from(interview)
                .fetchOne();

        return new PageImpl<>(content, pageable, count);
    }
}
