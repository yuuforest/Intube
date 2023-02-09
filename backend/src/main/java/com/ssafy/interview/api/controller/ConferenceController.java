package com.ssafy.interview.api.controller;

import com.ssafy.interview.api.request.conference.*;
import com.ssafy.interview.api.response.conference.ConferenceStartRes;
import com.ssafy.interview.api.service.conference.ConferenceService;
import com.ssafy.interview.api.service.user.AuthService;
import com.ssafy.interview.common.model.response.BaseResponseBody;
import com.ssafy.interview.db.entitiy.conference.Conference;
import com.ssafy.interview.db.entitiy.conference.ConferenceHistory;
import com.ssafy.interview.db.entitiy.interview.Question;
import io.openvidu.java.client.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@Api(value = "Conference API", tags = {"Conference"})
@RestController
@RequestMapping("/conference")
public class ConferenceController {

    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    @Autowired
    ConferenceService conferenceService;
    @Autowired
    AuthService authService;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    @PostMapping("/sessions")
    public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = openvidu.createSession(properties);
//        System.out.println(session.getSessionId());
        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
    }

    @PostMapping("/sessions/{sessionId}/connections")
    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
                                                   @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);
        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }

    @PostMapping("/start")
    @ApiOperation(value = "Conference 방 생성")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<ConferenceStartRes> startConference(@RequestParam(value="interviewTimeID") Long interviewTimeID,
                                                              @ApiIgnore Authentication authentication) {
        String userEmail = authService.getUserByAuthentication(authentication);
        // 만약 interviewID가 Conference Table에 있으면 이미 존재하는 ConferenceID를 반환


        // 만약 interviewID가 Conference Table에 없으면 새로 ConferenceID를 생성
        // [Conference Table] 생성된 Conference 방에 대한 정보 저장
        Conference conference = conferenceService.startConference(interviewTimeID);
        // [Conference History Table] 질문자가 Conference 방에 참여 -> 참여 기록 생성
        ConferenceHistory history = conferenceService.createConferenceHistory(conference.getId(), userEmail, 1);
        return ResponseEntity.status(200).body(ConferenceStartRes.of(conference.getId(),  history.getId()));
    }

    @PostMapping("/end")
    @ApiOperation(value = "Conference 방 종료")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> endConference(@RequestParam(value = "historyID") Long historyID,
                                                                    @RequestParam(value = "conferenceID") Long conferenceID,
                                                                    @RequestParam(value = "interviewTimeID") Long interviewTimeID) {
        // [Conference Table]
        conferenceService.endConference(conferenceID);
        // [Conference History Table] 답변자를 질문자가 다 내보낸 후, Conference를 종료할 수 있음
        conferenceService.updateConferenceHistory(historyID, 0);
        // [Applicant Table] interview_time_id 가 동일한 applicant의 상태를 3으로 변경
        conferenceService.modifyApplicantState(interviewTimeID);
        conferenceService.modifyInterviewTimeState(interviewTimeID);
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
        ConferenceHistory history = conferenceService.createConferenceHistory(conferenceID, userEmail, 1);
        return ResponseEntity.status(200).body(history.getId());
    }

    @PutMapping("/out")
    @ApiOperation(value = "Conference 방에서 참여자가 스스로 퇴장")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> outConference(@RequestParam(value = "historyID") Long historyID) {
        // [Conference History Table]
        conferenceService.updateConferenceHistory(historyID, 0);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

//    @GetMapping("/info")
//    @ApiOperation(value = "Conference 방에 대한 정보 호출")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "성공"),
//            @ApiResponse(code = 404, message = "사용자 없음"),
//            @ApiResponse(code = 500, message = "서버 오류")
//    })
//    public ResponseEntity<ConferenceInfoRes> getConferenceInfo(@RequestParam(value = "interviewID") Long interviewID,
//                                                               @RequestParam(value = "conferenceID") Long conferenceID) {
//        // [Interview Table] + [Conference Table] + [User table]
//        ConferenceInfoRes conferenceInfo = conferenceService.getInfoConference(interviewID, conferenceID);
//        return ResponseEntity.status(200).body(conferenceInfo);
//    }

//    @GetMapping("/user")
//    @ApiOperation(value = "현재 Conference 방에 참여중인 답변자 목록")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "성공"),
//            @ApiResponse(code = 404, message = "사용자 없음"),
//            @ApiResponse(code = 500, message = "서버 오류")
//    })
//    public ResponseEntity<List<User>> getUserInConference(@RequestParam(value = "conferenceID") Long conferenceID) {
//        // [Conference History Table]
//        List<User> users = conferenceService.userInConference(conferenceID);
//        return ResponseEntity.status(200).body(users);
//    }

    @PostMapping("/question")
    @ApiOperation(value = "Conference 진행 중 새로운 질문 추가")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> createQuestionInConference(@RequestBody QuestionCreateInReq questionInfo) {
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
        return ResponseEntity.status(200).body(questions);
    }

    @PostMapping("/dialog/question")
    @ApiOperation(value = "Conference 진행 중 질문 시작 시간 저장")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> recordQuestionInConference(@RequestBody RecordQuestionInReq questionInfo) {
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
    public ResponseEntity<? extends BaseResponseBody> recordDialogInConference(@RequestBody RecordDialogInReq dialogInfo,
                                                                               @ApiIgnore Authentication authentication) {
        String userEmail = authService.getUserByAuthentication(authentication);
        // [Dialog Table]
        conferenceService.recordDialogInConference(userEmail, dialogInfo);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

//    @PostMapping("/kick")
//    @ApiOperation(value = "Conference 진행 중 질문자가 답변자를 퇴장시킴")
//    public ResponseEntity<? extends BaseResponseBody> kickUserInConference(@RequestParam(value = "historyID") Long historyID) {
//        // [Conference History Table] historyID를 직접 받아서 상태 변경하는 방법
//        conferenceService.updateConferenceHistory(historyID, 3);
//        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
//    }

    @PutMapping("/kick")
    @ApiOperation(value = "Conference 진행 중 질문자가 답변자를 퇴장시킴")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> kickUserInConference(@RequestBody KickUserInReq kickInfo) {
        // [Conference History Table] conferenceID와 userEmail에 해당하는 기록 불러와서 내림차순으로 정렬한 후, 맨 위에 있는 정보를 변경하는 방법
        conferenceService.kickConferenceHistory(kickInfo);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
}