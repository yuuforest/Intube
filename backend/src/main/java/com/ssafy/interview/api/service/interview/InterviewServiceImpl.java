package com.ssafy.interview.api.service.interview;

import com.ssafy.interview.api.request.interview.InterviewSearchReq;
import com.ssafy.interview.api.response.interview.InterviewLoadDto;
import com.ssafy.interview.db.repository.interview.InterviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 *	인터뷰 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("InterviewService")
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class InterviewServiceImpl implements InterviewService {
	@Autowired
	InterviewRepository interviewRepository;

	@Override
	public Page<InterviewLoadDto> findAllInterview(InterviewSearchReq interviewSearchReq, Pageable pageable) {
		return interviewRepository.findAllInterview(interviewSearchReq.getCategory_name(), interviewSearchReq.getWord(), pageable);
	}
}
