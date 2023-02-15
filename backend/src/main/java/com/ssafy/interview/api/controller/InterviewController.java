package com.ssafy.interview.api.controller;

import com.ssafy.interview.api.request.interview.*;
import com.ssafy.interview.api.response.interview.InterviewDetailRes;
import com.ssafy.interview.api.response.interview.InterviewLoadRes;
import com.ssafy.interview.api.service.interview.InterviewService;
import com.ssafy.interview.api.service.user.AuthService;
import com.ssafy.interview.common.auth.SsafyUserDetails;
import com.ssafy.interview.common.model.response.BaseResponseBody;
import com.ssafy.interview.db.entitiy.interview.Interview;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import java.util.List;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "인터뷰 공고 API", tags = {"Interview"})
@RestController
@RequestMapping("/interviews")
public class InterviewController {

    @Autowired
    InterviewService interviewService;

    @Autowired
    AuthService authService;

    @PostMapping
    @ApiOperation(value = "인터뷰 공고 생성", notes = "<strong>email, InterviewSaveReq, questionContentList</strong>를 통해 인터뷰를 생성 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> create(@RequestBody @Valid InterviewSaveReq registerInfo,
                                                             @ApiIgnore Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String tokenEmail = userDetails.getUsername();

        //유저 email, registerInfo DTO로 인터뷰 생성하는 코드
        Interview interview = interviewService.createInterview(tokenEmail, registerInfo);

        //생성된 interview, 인터뷰 신청 시간 리스트로 인터뷰 신청시간을 생성하는 코드
        interviewService.createInterviewTime(interview, registerInfo.getInterviewTimeList());

        //생성된 interview, 인터뷰 질문 리스트로 인터뷰 신청시간을 생성하는 코드
        interviewService.createQuestion(interview, registerInfo.getQuestionList());

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PostMapping("/apply/{interview_time_id}")
    @ApiOperation(value = "인터뷰 공고 신청", notes = "<strong>email, InterviewSaveReq, questionContentList</strong>를 통해 인터뷰를 생성 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> apply(@PathVariable Long interview_time_id, @ApiIgnore Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String tokenEmail = userDetails.getUsername();

        //유저 email, interview_time_id로 해당 인터뷰를 신청하는 코드
        interviewService.applyInterview(tokenEmail, interview_time_id);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PostMapping("/apply/avata")
    @ApiOperation(value = "인터뷰(아바타) 공고 신청", notes = "<strong>ApplicantForAvataSaveReq</strong>를 통해 인터뷰 신청자와 Time을 생성 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> applyAvataInterview(@RequestBody ApplicantForAvataSaveReq applicantForAvataSaveReq,
                                                                          @ApiIgnore Authentication authentication) {
        Long user_id = authService.getIdByAuthentication(authentication);

        //유저 Id, applicantForAvataSaveReq로 해당 인터뷰를 신청하는 코드
        interviewService.applyAvataInterview(user_id, applicantForAvataSaveReq);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PostMapping("/search")
    @ApiOperation(value = "인터뷰 전체 and 카테고리별 공고 조회", notes = "카테고리와 검색어 그리고 pageNumber를 입력 받는다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Page<InterviewLoadRes>> findInterviewByCategoryAndWord(@RequestBody InterviewSearchReq interviewSearchReq, @PageableDefault(size = 8) Pageable pageable) {
        return ResponseEntity.status(200).body(interviewService.findInterviewByCategory(interviewSearchReq, pageable));
    }

    @GetMapping("/search/{interview_id}")
    @ApiOperation(value = "인터뷰 공고 상세정보 조회", notes = "로그인된 유저 email과 해당 인터뷰 공고 ID를 입력받는다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<InterviewDetailRes> findInterviewDetail(@PathVariable Long interview_id, @ApiIgnore Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String tokenEmail = userDetails.getUsername();

        return ResponseEntity.status(200).body(interviewService.detailInterview(tokenEmail, interview_id));
    }

    @PutMapping("/interviewer/expired-interview")
    @ApiOperation(value = "인터뷰 공고 모집상태를 마감(진행)으로 변경", notes = "해당 인터뷰의 id와 state를 입력 받는다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> expiredInterview(@RequestParam Long interview_id,
                                                                       @RequestParam int interview_state,
                                                                       @ApiIgnore Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String email = userDetails.getUsername();

        interviewService.updateInterviewState(email, interview_id, interview_state);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @DeleteMapping("/cancel/{interview_time_id}")
    @ApiOperation(value = "인터뷰 공고 신청 취소하기", notes = "해당 interview_time_id를 받아 신청을 취소한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> deleteApplicant(@PathVariable Long interview_time_id, @ApiIgnore Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String tokenEmail = userDetails.getUsername();

        //유저 email, interview_time_id로 해당 인터뷰를 신청하는 코드
        interviewService.deleteApplicant(tokenEmail, interview_time_id);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @DeleteMapping("/delete")
    @ApiOperation(value = "해당 인터뷰 삭제", notes = "해당 인터뷰의 id를 입력 받는다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> refuseApplicant(@RequestParam Long interview_id,
                                                                      @ApiIgnore Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String email = userDetails.getUsername();

        interviewService.deleteInterview(email, interview_id);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PutMapping("/interviewer/finish-interview")
    @ApiOperation(value = "인터뷰 공고 상태를 완료로 변경", notes = "해당 인터뷰 시간의 id와 result state를 입력 받는다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 403, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> updateInterviewState(@RequestBody InterviewStateReq interviewStateReq,
                                                                              @ApiIgnore Authentication authentication) {
        Long user_id = authService.getIdByAuthentication(authentication);

        interviewService.updateEndToInterviewState(user_id, interviewStateReq);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
}
