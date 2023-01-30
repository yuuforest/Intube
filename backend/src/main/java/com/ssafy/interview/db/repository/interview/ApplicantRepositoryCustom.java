package com.ssafy.interview.db.repository.interview;

import com.ssafy.interview.db.entitiy.interview.Applicant;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * 인터뷰 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface ApplicantRepositoryCustom { // 인터뷰 생성 Method
    /**
     * 상품 검색
     *
     * @param user_id    로그인한 유저 Id
     * @param interview_id    인터뷰 Id
     * @return 검색 결과
     */
    Optional<Applicant> findByUserIdAndInterviewId(Long user_id, Long interview_id);
}