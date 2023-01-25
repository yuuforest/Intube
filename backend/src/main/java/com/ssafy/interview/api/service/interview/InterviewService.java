package com.ssafy.interview.api.service.interview;

import com.ssafy.interview.api.request.UserModifyReq;
import com.ssafy.interview.api.request.UserRegisterPostReq;
import com.ssafy.interview.api.request.interview.InterviewSaveReq;
import com.ssafy.interview.api.request.interview.InterviewSearchReq;
import com.ssafy.interview.api.response.interview.InterviewLoadDto;
import com.ssafy.interview.db.entitiy.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface InterviewService {
	Page<InterviewLoadDto> findAllInterview(InterviewSearchReq interviewSearchReq, Pageable pageable);

	void createInterview(String email, InterviewSaveReq interviewRegisterInfo) throws Exception;
}
