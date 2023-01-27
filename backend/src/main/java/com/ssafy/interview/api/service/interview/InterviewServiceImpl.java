package com.ssafy.interview.api.service.interview;

import com.ssafy.interview.api.request.interview.InterviewSaveReq;
import com.ssafy.interview.api.request.interview.InterviewSearchReq;
import com.ssafy.interview.api.response.interview.InterviewLoadDto;
import com.ssafy.interview.db.entitiy.User;
import com.ssafy.interview.db.entitiy.interview.*;
import com.ssafy.interview.db.repository.UserRepository;
import com.ssafy.interview.db.repository.interview.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
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
	InterviewTimeRepository interviewTimeRepository;
	@Autowired
	QuestionRepository questionRepository;
	@Autowired
	ApplicantRepository applicantRepository;
	@Autowired
	UserRepository userRepository;

	@Override
	public Page<InterviewLoadDto> findAllInterview(InterviewSearchReq interviewSearchReq, Pageable pageable) {
		return interviewRepository.findAllInterview(interviewSearchReq.getCategoryName(), interviewSearchReq.getWord(), pageable);
	}

	// 인터뷰 공고 생성 Method
	@Override
	@Transactional
	public Interview createInterview(String email, InterviewSaveReq interviewRegisterInfo) {
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

		return interviewRepository.save(Interview.builder().title(interviewRegisterInfo.getTitle()).description(interviewRegisterInfo.getDescription())
				.estimated_time(interviewRegisterInfo.getEstimated_time()).start_standard_age(interviewRegisterInfo.getStart_standard_age())
				.end_standard_age(interviewRegisterInfo.getEnd_standard_age()).gender(interviewRegisterInfo.getGender())
				.max_people(interviewRegisterInfo.getMax_people()).standard_point(interviewRegisterInfo.getStandard_point()).apply_end_time(interviewRegisterInfo.getApply_end_time())
				.download_expiration(interviewRegisterInfo.getDownload_expiration()).user(user).interviewCategory(interviewCategory).build());
	}

	// 인터뷰 공고 신청 가능 시간 생성 Method
	@Override
	@Transactional
	public void createInterviewTime(Interview interview, List<Date> interviewTimeList) {
		List<InterviewTime> interviewTimes = new ArrayList<>();

		for (Date interview_start_time : interviewTimeList) {
			InterviewTime interviewTime = InterviewTime.builder().interview_start_time(interview_start_time)
																.interview(interview).build();
			interviewTimes.add(interviewTime);
		}

		interviewTimeRepository.saveAll(interviewTimes);
	}

	// 인터뷰 공고관련 질문 생성 Method
	@Override
	@Transactional
	public void createQuestion(Interview interview, List<String> questionContentList) {
		List<Question> questions = new ArrayList<>();

		for (String content : questionContentList) {
			Question question = Question.builder().content(content).interview(interview).build();

			questions.add(question);
		}

		questionRepository.saveAll(questions);
	}

	@Override
	@Transactional
	public void applyInterview(String email, Long interview_time_id) {
		Optional<User> userOptional = userRepository.findByEmail(email);
		Optional<InterviewTime> interviewTimeOptional = interviewTimeRepository.findById(interview_time_id);
		User user = null;
		InterviewTime interviewTime = null;
		if(userOptional.isPresent()){
			user = userOptional.get();
		}
		if(interviewTimeOptional.isPresent()){
			interviewTime = interviewTimeOptional.get();
		}

		applicantRepository.save(Applicant.builder().user(user).interviewTime(interviewTime).build());
	}
}
