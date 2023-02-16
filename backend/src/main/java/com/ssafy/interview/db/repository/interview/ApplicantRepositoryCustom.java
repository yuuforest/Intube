package com.ssafy.interview.db.repository.interview;

import com.querydsl.core.Tuple;
import com.ssafy.interview.api.response.interview.InterviewDetailApplicantRes;
import com.ssafy.interview.api.response.user.ApplicantDetailRes;
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
     * @param user_id      로그인한 유저 Id
     * @param interview_id 인터뷰 Id
     * @return 검색 결과
     */
    Optional<Applicant> findByUserIdAndInterviewId(Long user_id, Long interview_id);

    /**
     * 상품 검색
     *
     * @param user_id      로그인한 유저 Id
     * @param interview_time_id 인터뷰 시간 Id
     * @return 검색 결과
     */
    Boolean existApplicantByUserId(Long user_id, Long interview_time_id);

    /**
     * 상품 검색
     *
     * @param user_id      로그인한 유저 Id
     * @param interview_time_id 인터뷰 시간 Id
     * @return 검색 결과
     */
    Optional<Applicant> findByApplicantByUserId(Long user_id, Long interview_time_id);

    /**
     * ApplicantDetailRes 찾기
     *
     * @param interview_time_id 인터뷰 시작 시간 id
     * @return 검색 결과
     */
    List<ApplicantDetailRes> findApplicantDetailRes(Long interview_time_id);

    /**
     * InterviewDetailApplicantRes 찾기
     *
     * @param user_id 인터뷰이 id
     * @return 검색 결과
     */
    Optional<List<InterviewDetailApplicantRes>> findInterviewDetailByIntervieweeRes(Long user_id);

    /**
     * 마이페이지 - 답변자 상태별 공고 count
     *
     * @param user_id         로그인한 유저 Id
     * @return 조회 결과
     */
    Optional<List<Tuple>> countInterviewByApplicantState(Long user_id);

    /**
     * 인터뷰 공고 마감 시 대기 중인 신청자 전체 삭제
     *
     * @param interview_id      인터뷰 Id
     */
    void deleteByInterviewId(Long interview_id);

    /**
     * 평가가 완료가 안된 신청자가 있는지 확인!
     *
     * @param interview_time_id 해당 인터뷰 시간 Id
     * @return 검색 결과
     */
    Boolean existApplicantByInterviewTimeId(Long interview_time_id);
}