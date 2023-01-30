package com.ssafy.interview.db.repository.interview;

import com.ssafy.interview.api.response.interview.InterviewDetailRes;
import com.ssafy.interview.api.response.interview.InterviewLoadRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

/**
 * 인터뷰 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface InterviewRepositoryCustom { // 인터뷰 생성 Method
    /**
     * 상품 검색
     *
     * @param word       검색어
     * @param pageable   페이지 정보
     * @return 검색 결과
     */
    Page<InterviewLoadRes> findAllInterview(String categoryName, String word, Pageable pageable);

    /**
     * 상품 상세정보 조회
     *
     * @param interview_id       해당 인터뷰  Id
     * @return 조회 결과
     */
    InterviewDetailRes findDetailInterview(Long user_id, Long interview_id);

    /**
     * 상세정보 조회 시 로그인한 유저가 해당 공고를 신청 할 수 있는지 판단하는 Method
     *
     * @param user_id       로그인한 유저 Id
     * @param interview_id       해당 인터뷰  Id
     * @return 없으면 Null 있으면 해당 객체 결과
     */
    Boolean existApplicantByInterviewId(Long user_id, Long interview_id);
}