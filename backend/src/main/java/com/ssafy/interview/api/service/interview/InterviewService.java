package com.ssafy.interview.api.service.interview;


import com.ssafy.interview.api.request.interview.InterviewSaveReq;
import com.ssafy.interview.api.request.interview.InterviewSearchReq;
import com.ssafy.interview.api.response.interview.InterviewLoadDto;
import com.ssafy.interview.db.entitiy.User;
import com.ssafy.interview.db.entitiy.interview.Interview;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface InterviewService {
	Page<InterviewLoadDto> findAllInterview(InterviewSearchReq interviewSearchReq, Pageable pageable);

	// 인터뷰 생성
	Interview createInterview(String email, InterviewSaveReq interviewRegisterInfo);

	// 인터뷰 신청 시간생성
	void createInterviewTime(Interview interview, List<Date> interviewTimeList);

	// 인터뷰관련 질문 생성
	void createQuestion(Interview interview, List<String> questionContentList);

	// 인터뷰관련 질문 생성
	void applyInterview(String email, Long interview_time_id);
}
