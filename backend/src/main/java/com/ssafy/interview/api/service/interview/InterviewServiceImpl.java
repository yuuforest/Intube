package com.ssafy.interview.api.service.interview;

import com.ssafy.interview.api.request.interview.InterviewSaveReq;
import com.ssafy.interview.api.request.interview.InterviewSearchReq;
import com.ssafy.interview.api.response.interview.InterviewLoadDto;
import com.ssafy.interview.db.entitiy.User;
import com.ssafy.interview.db.entitiy.interview.Interview;
import com.ssafy.interview.db.entitiy.interview.InterviewCategory;
import com.ssafy.interview.db.repository.UserRepository;
import com.ssafy.interview.db.repository.interview.InterviewCategoryRepository;
import com.ssafy.interview.db.repository.interview.InterviewRepository;
import jdk.jfr.Category;
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

	@Autowired
	InterviewCategoryRepository interviewCategoryRepository;

	@Autowired
	UserRepository userRepository;

	@Override
	public Page<InterviewLoadDto> findAllInterview(InterviewSearchReq interviewSearchReq, Pageable pageable) {
		return interviewRepository.findAllInterview(interviewSearchReq.getCategory_name(), interviewSearchReq.getWord(), pageable);
	}

	@Override
	@Transactional
	public void createInterview(String email, InterviewSaveReq interviewRegisterInfo) {
		Optional<User> userOptional = userRepository.findByEmail(email);
		Optional<InterviewCategory> interviewCategoryOptional = interviewCategoryRepository.findByCategoryName(interviewRegisterInfo.getCategoryName());
		User user = null;
		InterviewCategory interviewCategory = null;
		if(userOptional.isPresent()){
			user = userOptional.get();
		}
		if(interviewCategoryOptional.isPresent()){
			interviewCategory = interviewCategoryOptional.get();
		}

		interviewRepository.save(Interview.builder().title(interviewRegisterInfo.getTitle()).description(interviewRegisterInfo.getDescription())
				.estimated_time(interviewRegisterInfo.getEstimated_time()).start_standard_age(interviewRegisterInfo.getStart_standard_age())
				.end_standard_age(interviewRegisterInfo.getEnd_standard_age()).gender(interviewRegisterInfo.getGender())
				.max_people(interviewRegisterInfo.getMax_people()).standard_point(interviewRegisterInfo.getStandard_point()).apply_end_time(interviewRegisterInfo.getApply_end_time())
				.download_expiration(interviewRegisterInfo.getDownload_expiration()).user(user).interviewCategory(interviewCategory).build());
	}
}
