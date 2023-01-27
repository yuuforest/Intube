package com.ssafy.interview.api.controller;

import com.ssafy.interview.api.response.conference.ConferenceStartRes;
import com.ssafy.interview.api.service.ConferenceService;
import com.ssafy.interview.api.service.UserService;
import com.ssafy.interview.common.auth.SsafyUserDetails;
import com.ssafy.interview.common.model.response.BaseResponseBody;
import com.ssafy.interview.db.entitiy.Conference;
import com.ssafy.interview.db.entitiy.ConferenceHistory;
import io.openvidu.java.client.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.annotation.PostConstruct;
import java.util.Map;

@CrossOrigin(origins = "*")
@Api(value = "인증 API", tags = {"Conference"})
@RestController
@RequestMapping("/conference")
public class ConferenceController {

    @Autowired
    ConferenceService conferenceService;

    @Autowired
    UserService userService;

    // [OPENVIDU]

    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    @ApiOperation(value = "Conference 생성")
    @PostMapping("/{interviewID}/{userEmail}/start")
    public ResponseEntity<ConferenceStartRes> startConference(@PathVariable("interviewID") Long interviewID,
                                                              @PathVariable("userEmail") String userEmail,
                                                              @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {

        // [openvidu] initializeSession
        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = openvidu.createSession(properties);

        // [Conference Table] 생성된 Conference 방에 대한 정보 저장
        Conference conference = conferenceService.startConference(interviewID, userEmail, session.getSessionId());

        // [Conference History Table] Conference가 생성되는 동시에 질문자가 Conference 방에 참여 -> 참여 기록 생성
        ConferenceHistory history = conferenceService.createConferenceHistory(conference.getId(), userEmail, 1);

//        return ResponseEntity.status(200).body(session.getSessionId());
        return ResponseEntity.status(200).body(ConferenceStartRes.of(conference.getId(),  history.getId(), session.getSessionId()));
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
        return ResponseEntity.status(200).body(connection.getToken());
    }

    @PostMapping("/end")
    @ApiOperation(value = "Conference 종료")
    public ResponseEntity<? extends BaseResponseBody> endConference(@RequestParam(value="conferenceID") Long conferenceID,
                                                                    @RequestParam(value="historyID") Long historyID) {
        // [Conference Table]
        conferenceService.endConference(conferenceID);
        // [Conference History Table]
        conferenceService.updateConferenceHistory(historyID, 4);

        // 녹화 종료

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PostMapping("/{conferenceID}/in")
    @ApiOperation(value = "Conference에 참여자 입장")
    public ResponseEntity<Long> inConference(@PathVariable("conferenceID") Long conferenceID,
                                             @ApiIgnore Authentication authentication) {
//                                             @RequestParam(value="userEmail") String userEmail) {

        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();

        // [Conference History Table]
        ConferenceHistory history = conferenceService.createConferenceHistory(conferenceID, userDetails.getUsername(), 2);

        return ResponseEntity.status(200).body(history.getId());
    }

    @PostMapping("/{historyID}/out")
    @ApiOperation(value = "Conference에 참여자 퇴장")
    public ResponseEntity<? extends BaseResponseBody> outConference(@PathVariable("historyID") Long historyID) {
        // [Conference History Table]
        conferenceService.updateConferenceHistory(historyID, 3);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }


}