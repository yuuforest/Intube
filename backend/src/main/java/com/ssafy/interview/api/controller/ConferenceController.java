package com.ssafy.interview.api.controller;

import com.ssafy.interview.api.request.conference.*;
import com.ssafy.interview.api.response.conference.ConferenceInfoRes;
import com.ssafy.interview.api.response.conference.ConferenceStartRes;
import com.ssafy.interview.api.service.conference.ConferenceService;
import com.ssafy.interview.api.service.user.AuthService;
import com.ssafy.interview.common.model.response.BaseResponseBody;
import com.ssafy.interview.db.entitiy.User;
import com.ssafy.interview.db.entitiy.conference.Conference;
import com.ssafy.interview.db.entitiy.conference.ConferenceHistory;
import com.ssafy.interview.db.entitiy.interview.Question;
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

@CrossOrigin(origins = "*")
@Api(value = "Conference API", tags = {"Conference"})
@RestController
@RequestMapping("/conference")
public class ConferenceController {

    @Autowired
    ConferenceService conferenceService;
    @Autowired
    AuthService authService;

    @PostMapping("/start")
    @ApiOperation(value = "Conference 방 생성")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<ConferenceStartRes> startConference(@RequestParam(value="interviewID") Long interviewID,
                                                              @RequestParam(value="sessionID") String sessionID,
                                                              @ApiIgnore Authentication authentication) {
        String userEmail = authService.getUserByAuthentication(authentication);
        // [Conference Table] 생성된 Conference 방에 대한 정보 저장
        Conference conference = conferenceService.startConference(interviewID, userEmail, sessionID);
        // [Conference History Table] 질문자가 Conference 방에 참여 -> 참여 기록 생성
        ConferenceHistory history = conferenceService.createConferenceHistory(conference.getId(), userEmail, 1);
        return ResponseEntity.status(200).body(ConferenceStartRes.of(conference.getId(),  history.getId(), sessionID));
    }

    @PostMapping("/end")
    @ApiOperation(value = "Conference 방 종료")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> endConference(@RequestParam(value = "historyID") Long historyID,
                                                                    @RequestBody recordDialogInReq dialogInfo) {
        // [Conference Table]
        conferenceService.endConference(dialogInfo.getConferenceID());
        // [Conference History Table]
        conferenceService.updateConferenceHistory(historyID, 4);
        // [Dialog Table]
        conferenceService.recordDialogInConference(dialogInfo);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PostMapping("/in")
    @ApiOperation(value = "Conference 방에 참여자 입장")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Long> inConference(@RequestParam(value = "conferenceID") Long conferenceID,
                                             @ApiIgnore Authentication authentication) {
        String userEmail = authService.getUserByAuthentication(authentication);
        // [Conference History Table]
        ConferenceHistory history = conferenceService.createConferenceHistory(conferenceID, userEmail, 2);
        return ResponseEntity.status(200).body(history.getId());
    }

    @PostMapping("/out")
    @ApiOperation(value = "Conference 방에서 참여자가 스스로 퇴장")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> outConference(@RequestParam(value = "historyID") Long historyID) {
        // [Conference History Table]
        conferenceService.updateConferenceHistory(historyID, 3);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @GetMapping("/info")
    @ApiOperation(value = "Conference 방에 대한 정보 호출")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<ConferenceInfoRes> getConferenceInfo(@RequestParam(value = "interviewID") Long interviewID,
                                                               @RequestParam(value = "conferenceID") Long conferenceID) {
        // [Interview Table] + [Conference Table] + [User table]
        ConferenceInfoRes conferenceInfo = conferenceService.getInfoConference(interviewID, conferenceID);
        return ResponseEntity.status(200).body(conferenceInfo);
    }

    @GetMapping("/user")
    @ApiOperation(value = "현재 Conference 방에 참여중인 답변자 목록")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<User>> getUserInConference(@RequestParam(value = "conferenceID") Long conferenceID) {
        // [Conference History Table]
        List<User> users = conferenceService.userInConference(conferenceID);
        return ResponseEntity.status(200).body(users);  // FE에서 필요한 정보가 확정되면 코드 수정 필요
    }

    @PostMapping("/question")
    @ApiOperation(value = "Conference 진행 중 새로운 질문 추가")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> createQuestionInConference(@RequestBody questionCreateInReq questionInfo) {
        // [Question Table]
        conferenceService.createQuestionInConference(questionInfo);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @GetMapping("/question")
    @ApiOperation(value = "관련 Interview의 질문 목록 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<Question>> getQuestionInConference(@RequestParam(value = "interviewID") Long interviewID) {
        // [Question Table]
        List<Question> questions = conferenceService.questionAllInConference(interviewID);
        return ResponseEntity.status(200).body(questions);  // FE에서 필요한 정보가 확정되면 코드 수정 필요
    }

    @PostMapping("/mark")
    @ApiOperation(value = "Conference 진행 중 질문자가 원하는 마크 시간 저장")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> createMarkInConference(@RequestBody markCreateInReq markInfo) {
        // [Mark Table]
        conferenceService.createMarkInConference(markInfo);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PostMapping("/dialog/question")
    @ApiOperation(value = "Conference 진행 중 질문 시작 시간 저장")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> recordQuestionInConference(@RequestBody recordQuestionInReq questionInfo) {
        // [Dialog Table]
        conferenceService.recordQuestionInConference(questionInfo);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PostMapping("/dialog/user")
    @ApiOperation(value = "Conference 진행 중 발언 내용 저장")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> recordDialogInConference(@RequestBody recordDialogInReq dialogInfo) {
        // [Dialog Table]
        conferenceService.recordDialogInConference(dialogInfo);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

//    @PostMapping("/kick")
//    @ApiOperation(value = "Conference 진행 중 질문자가 답변자를 퇴장시킴")
//    public ResponseEntity<? extends BaseResponseBody> kickUserInConference(@RequestParam(value = "historyID") Long historyID) {
//        // [Conference History Table] historyID를 직접 받아서 상태 변경하는 방법
//        conferenceService.updateConferenceHistory(historyID, 3);
//        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
//    }

    @PostMapping("/kick")
    @ApiOperation(value = "Conference 진행 중 질문자가 답변자를 퇴장시킴")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> kickUserInConference(@RequestBody kickUserInReq kickInfo) {
        // [Conference History Table] conferenceID와 userEmail에 해당하는 기록 불러와서 내림차순으로 정렬한 후, 맨 위에 있는 정보를 변경하는 방법
        conferenceService.kickConferenceHistory(kickInfo);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
}