package com.ssafy.interview.db.repository.interview;

import com.ssafy.interview.db.entitiy.Interview;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

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
    Page<Interview> findInterview(String word, Pageable pageable);
}