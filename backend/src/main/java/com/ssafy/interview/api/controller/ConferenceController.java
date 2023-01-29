package com.ssafy.interview.api.controller;

import com.ssafy.interview.api.response.conference.ConferenceStartRes;
import com.ssafy.interview.api.service.ConferenceService;
import com.ssafy.interview.api.service.UserService;
import com.ssafy.interview.common.auth.SsafyUserDetails;
import com.ssafy.interview.common.model.response.BaseResponseBody;
import com.ssafy.interview.db.entitiy.conference.Conference;
import com.ssafy.interview.db.entitiy.conference.ConferenceHistory;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@CrossOrigin(origins = "*")
@Api(value = "인증 API", tags = {"Conference"})
@RestController
@RequestMapping("/conference")
public class ConferenceController {

    @Autowired
    ConferenceService conferenceService;

    @Autowired
    UserService userService;

    @ApiOperation(value = "Conference 방 생성")
    @PostMapping("/start")
    public ResponseEntity<ConferenceStartRes> startConference(@RequestParam(value="interviewID") Long interviewID,
                                                              @RequestParam(value="sessionID") String sessionID,
                                                              @ApiIgnore Authentication authentication) {

        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userEmail = userDetails.getUsername();

        // [Conference Table] 생성된 Conference 방에 대한 정보 저장
        Conference conference = conferenceService.startConference(interviewID, userEmail, sessionID);

        // [Conference History Table] 질문자가 Conference 방에 참여 -> 참여 기록 생성
        ConferenceHistory history = conferenceService.createConferenceHistory(conference.getId(), userEmail, 1);

        return ResponseEntity.status(200).body(ConferenceStartRes.of(conference.getId(),  history.getId(), sessionID));
    }

    @PostMapping("/end")
    @ApiOperation(value = "Conference 방 종료")
    public ResponseEntity<? extends BaseResponseBody> endConference(@RequestParam(value="conferenceID") Long conferenceID,
                                                                    @RequestParam(value="historyID") Long historyID) {
        // [Conference Table]
        conferenceService.endConference(conferenceID);
        // [Conference History Table]
        conferenceService.updateConferenceHistory(historyID, 4);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PostMapping("/in")
    @ApiOperation(value = "Conference 방에 참여자 입장")
    public ResponseEntity<Long> inConference(@RequestParam(value="conferenceID") Long conferenceID,
                                             @ApiIgnore Authentication authentication) {

        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userEmail = userDetails.getUsername();

        // [Conference History Table]
        ConferenceHistory history = conferenceService.createConferenceHistory(conferenceID, userEmail, 2);

        return ResponseEntity.status(200).body(history.getId());
    }

    @PostMapping("/out")
    @ApiOperation(value = "Conference 방에 참여자 퇴장")
    public ResponseEntity<? extends BaseResponseBody> outConference(@RequestParam(value="historyID") Long historyID) {
        // [Conference History Table]
        conferenceService.updateConferenceHistory(historyID, 3);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

//    @GetMapping("/info")
//    @ApiOperation(value = "Conference 방에 대한 정보 호출")
//    public ResponseEntity<? extends BaseResponseBody> getInterviewInfo(@RequestParam(value="interviewID") Long interviewID,
//                                                                       @RequestParam(value="conferenceID") Long conferenceID) {
//        // [Conference History Table]
//        conferenceService.updateConferenceHistory(historyID, 3);
//
//        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
//    }
}