package com.ssafy.interview.api.controller;
import com.ssafy.interview.api.request.UserModifyReq;
import com.ssafy.interview.api.request.UserRegisterPostReq;
import com.ssafy.interview.api.request.interview.InterviewSaveReq;
import com.ssafy.interview.api.request.interview.InterviewSearchReq;
import com.ssafy.interview.api.response.UserRes;
import com.ssafy.interview.api.response.interview.InterviewLoadDto;
import com.ssafy.interview.api.service.UserService;
import com.ssafy.interview.api.service.interview.InterviewService;
import com.ssafy.interview.common.auth.SsafyUserDetails;
import com.ssafy.interview.common.model.response.BaseResponseBody;
import com.ssafy.interview.db.entitiy.User;
import com.ssafy.interview.db.entitiy.interview.Interview;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "인터뷰 공고 API", tags = {"Interview"})
@RestController
@RequestMapping("/interviews")
public class InterviewController {
	
	@Autowired
	InterviewService interviewService;

	@PostMapping
	@ApiOperation(value = "인터뷰 공고 생성", notes = "<strong>아이디와 InterviewSaveReq</strong>를 통해 인터뷰를 생성 한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	@Transactional
	public ResponseEntity<? extends BaseResponseBody> create(@RequestParam("email") String email,
															 @RequestBody @ApiParam(value = "공고생성 정보", required = true) InterviewSaveReq registerInfo) throws Exception {

		//유저 email, registerInfo DTO로 인터뷰 생성하는 코드
		Interview interview = interviewService.createInterview(email, registerInfo);

		//생성된 interview, 인터뷰 신청 시간 리스트로 인터뷰 신청시간을 생성하는 코드
		interviewService.createInterviewTime(interview, registerInfo.getInterviewTimeList());

		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}

	@GetMapping
	@ApiOperation(value = "인터뷰 전체 공고 조회", notes = "카테고리와 검색어 그리고 page 넘버를 입력 받는다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<Page<InterviewLoadDto>> findInterviewByCategoryAndWord(@RequestBody InterviewSearchReq interviewSearchReq, @PageableDefault(size = 2) Pageable pageable) {
		/**
		 *
		 */
		return ResponseEntity.status(200).body(interviewService.findAllInterview(interviewSearchReq, pageable));
	}
}
