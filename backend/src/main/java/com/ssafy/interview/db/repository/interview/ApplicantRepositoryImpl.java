package com.ssafy.interview.db.repository.interview;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.interview.db.entitiy.interview.Applicant;
import com.ssafy.interview.db.entitiy.interview.QApplicant;
import com.ssafy.interview.db.entitiy.interview.QInterviewCategory;
import com.ssafy.interview.db.entitiy.interview.QInterviewTime;
import org.springframework.beans.factory.annotation.Autowired;

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
    QInterviewCategory qInterviewCategory = QInterviewCategory.interviewCategory;

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
}
