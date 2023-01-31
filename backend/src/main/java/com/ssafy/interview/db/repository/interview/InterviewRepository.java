package com.ssafy.interview.db.repository.interview;

import com.ssafy.interview.db.entitiy.interview.Interview;
import com.ssafy.interview.db.entitiy.interview.InterviewCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * 인터뷰 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface InterviewRepository extends JpaRepository<Interview, Long>, InterviewRepositoryCustom{ // 인터뷰 생성 Method
    Optional<Interview> findById(String id);
    Long countByUser_IdAndInterviewState(Long owner_id, int interview_state);
}