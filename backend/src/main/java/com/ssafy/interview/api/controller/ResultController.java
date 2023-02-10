package com.ssafy.interview.api.controller;


import com.ssafy.interview.api.request.result.DialogModifyReq;
import com.ssafy.interview.api.response.result.DialogRes;
import com.ssafy.interview.api.service.conference.ResultService;
import com.ssafy.interview.api.service.user.AuthService;
import com.ssafy.interview.common.auth.SsafyUserDetails;
import com.ssafy.interview.common.model.response.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@Api(value = "Result API", tags = {"Result"})
@RestController
@RequestMapping("/result")
public class ResultController {

    @Autowired
    ResultService resultService;

    @Autowired
    AuthService authService;

    @GetMapping("/all")
    @ApiOperation(value = "Conference 내 전체 발언 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<DialogRes>> dialogInAll(@RequestParam(value = "conferenceID") Long conferenceID) {
        List<DialogRes> dialogs = resultService.dialogInAll(conferenceID);
        return ResponseEntity.status(200).body(dialogs);
    }

    @GetMapping("/question")
    @ApiOperation(value = "Conference 내 질문 별 발언 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<DialogRes>> dialogInQuestion(@RequestParam(value = "conferenceID") Long conferenceID,
                                                            @RequestParam(value = "questionID") Long questionID) {
        List<DialogRes> dialogs = resultService.dialogInQuestion(conferenceID, questionID);
        return ResponseEntity.status(200).body(dialogs);
    }

    @PutMapping("/modify/one")
    @ApiOperation(value = "하나의 발언 내용 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> updateOneDialog(@RequestBody DialogModifyReq dialogInfo) {
        resultService.updateOneDialog(dialogInfo);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PutMapping("/modify/all")
    @ApiOperation(value = "모든 발언 내용 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> updateAllDialog(@RequestBody List<DialogModifyReq> dialogInfo) {
        resultService.updateAllDialog(dialogInfo);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PostMapping("/create")
    @ApiOperation(value = "dialog에 있는 content 정리 후 conference result 생성")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 409, message = "사용자 다름"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> createConferenceResult(@RequestParam Long interview_id,
                                                                             @RequestParam Long interview_time_id,
                                                                             @ApiIgnore Authentication authentication) {
        // 질문자와 다른 인증토큰인 경우
//        if (!email.equals(authService.getEmailByAuthentication(authentication))) {
//            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "답변자님! 인터뷰가 종료되었습니다!(Result Controller Check)"));
//        }

        Long user_id = authService.getIdByAuthentication(authentication);

        resultService.createConferencResult(user_id, interview_id, interview_time_id);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @GetMapping("/search")
    @ApiOperation(value = "conference result 불러오기")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 409, message = "사용자 다름"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> searchConferenceResult(@RequestParam Long interview_time_id,
                                                                             @ApiIgnore Authentication authentication) {
        Long user_id = authService.getIdByAuthentication(authentication);

        resultService.searchConferencResult(user_id, interview_time_id);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

}
