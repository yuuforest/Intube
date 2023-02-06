package com.ssafy.interview.api.controller;


import com.ssafy.interview.api.response.result.DialogRes;
import com.ssafy.interview.api.service.conference.ResultService;
import com.ssafy.interview.common.model.response.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "Result API", tags = {"Result"})
@RestController
@RequestMapping("/result")
public class ResultController {

    @Autowired
    ResultService resultService;

    @GetMapping("/all")
    @ApiOperation(value = "Conference 내 전체 발언 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<DialogRes>> dialogInAll(@RequestParam(value="conferenceID") Long conferenceID) {
        List<DialogRes> allDialog = resultService.dialogInAll(conferenceID);
        if(allDialog == null) {
            return null;
        } else {
            return ResponseEntity.status(200).body(allDialog);
        }
    }

    @GetMapping("/question")
    @ApiOperation(value = "Conference 내 질문 별 발언 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> dialogInQuestion(@RequestParam(value="interviewID") Long interviewID) {
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PutMapping("/modify")
    @ApiOperation(value = "발언 내용 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> updateDialog(@RequestParam(value="interviewID") Long interviewID) {
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }


}
