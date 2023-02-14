package com.ssafy.interview.api.service.interview;


import com.ssafy.interview.api.request.interview.*;
import com.ssafy.interview.api.response.interview.InterviewApplicantDetailRes;
import com.ssafy.interview.api.response.interview.InterviewDetailRes;
import com.ssafy.interview.api.response.interview.InterviewLoadRes;
import com.ssafy.interview.api.response.interview.InterviewTimeLoadRes;
import com.ssafy.interview.db.entitiy.interview.Interview;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.List;

/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface InterviewService {
    Page<InterviewLoadRes> findInterviewByCategory(InterviewSearchReq interviewSearchReq, Pageable pageable);

    Page<InterviewTimeLoadRes> findInterviewByInterviewState(String email, InterviewSearchByStateReq interviewSearchByStateReq, Pageable pageable);

    Page<InterviewApplicantDetailRes> findInterviewByApplicantState(String email, InterviewSearchByApplicantStateReq interviewSearchByApplicantStateReq, Pageable pageable);

    // 인터뷰 생성
    Interview createInterview(String email, InterviewSaveReq interviewRegisterInfo);

    // 인터뷰 신청 시간생성
    void createInterviewTime(Interview interview, List<Date> interviewTimeList);

    // 인터뷰관련 질문 생성
    void createQuestion(Interview interview, List<String> questionContentList);

    // 인터뷰 신청하기
    void applyInterview(String email, Long interview_time_id);

    // 인터뷰 신청 취소하기
    void deleteApplicant(String email, Long interview_time_id);

    // 인터뷰 상세정보 조회
    InterviewDetailRes detailInterview(String email, Long interview_time_id);

    // 인터뷰 공고 마감
    void updateInterviewState(String email, Long interview_id, int interviewState);

    // 인터뷰 삭제하기
    void deleteInterview(String email, Long interview_id);

    // 인터뷰 상태를 완료로 변환
    void updateEndToInterviewState(Long user_id, InterviewStateReq interviewStateReq);

}
