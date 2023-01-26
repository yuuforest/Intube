package com.ssafy.interview.api.controller;

import com.ssafy.interview.api.request.Conference.ConferenceEndReq;
import com.ssafy.interview.api.request.Conference.HistoryCreateReq;
import com.ssafy.interview.api.request.Conference.ConferenceStartReq;
import com.ssafy.interview.api.request.Conference.HistoryUpdateReq;
import com.ssafy.interview.api.response.Conference.ConferenceStartRes;
import com.ssafy.interview.api.service.ConferenceService;
import com.ssafy.interview.api.service.UserService;
import com.ssafy.interview.common.model.response.BaseResponseBody;
import com.ssafy.interview.db.entitiy.Conference;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@Api(value = "인증 API", tags = {"Conference"})
@RestController
@RequestMapping("/conference")
public class ConferenceController {

    @Autowired
    ConferenceService conferenceService;

    @Autowired
    UserService userService;

    @PostMapping("/start")
    @ApiOperation(value = "Conference 생성")
    public ResponseEntity<ConferenceStartRes> startConference(@RequestBody ConferenceStartReq startInfo) {
        // [Conference Table] 생성된 Conference 방에 대한 정보 저장
        Long conferenceId = conferenceService.startConference(startInfo);
        // [Conference History Table] Conference가 생성되는 동시에 질문자가 Conference 방에 참여 -> 참여 기록 생성
        HistoryCreateReq HistoryInfo = new HistoryCreateReq();
        HistoryInfo.setConference_id(conferenceId);
        HistoryInfo.setUser_email(startInfo.getUser_email());
        HistoryInfo.setAction(1);
        Long history_id = conferenceService.createConferenceHistory(HistoryInfo);
        
        // 녹화 시작

        return ResponseEntity.status(200).body(ConferenceStartRes.of(conferenceId, history_id));
    }

    @PostMapping("/end")
    @ApiOperation(value = "Conference 종료")
    public ResponseEntity<? extends BaseResponseBody> endConference(@RequestBody ConferenceEndReq endInfo) {
        // [Conference Table]
        conferenceService.endConference(endInfo.getConference_id());
        // [Conference History Table]
        HistoryUpdateReq HistoryInfo = new HistoryUpdateReq();
        HistoryInfo.setHistory_id(endInfo.getHistory_id());
        HistoryInfo.setAction(4);
        conferenceService.updateConferenceHistory(HistoryInfo);
        // 녹화 종료

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

}