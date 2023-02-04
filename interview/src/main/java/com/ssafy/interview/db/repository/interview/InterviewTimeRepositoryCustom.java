package com.ssafy.interview.db.repository.interview;

import com.ssafy.interview.api.response.interview.InterviewDetailRes;
import com.ssafy.interview.api.response.interview.InterviewLoadRes;
import com.ssafy.interview.api.response.interview.InterviewTimeRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * 인터뷰 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface InterviewTimeRepositoryCustom { // 인터뷰 생성 Method
    /**
     * 상품 검색
     *
     * @param interview_id 인터뷰 Id
     * @return 검색 결과
     */
    List<InterviewTimeRes> findAllInterviewTime(Long interview_id);

    /**
     * 내가 만든 인터뷰 시작 시간 검색
     *
     * @param owner_id 작성자 Id
     * @return 검색 결과
     */
    List<Date> findInterviewTimeByOwnerId(Long owner_id);
}