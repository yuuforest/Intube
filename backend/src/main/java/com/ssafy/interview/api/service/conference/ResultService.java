package com.ssafy.interview.api.service.conference;

import com.ssafy.interview.api.request.result.DialogModifyReq;
import com.ssafy.interview.api.response.result.DialogRes;

import java.util.List;

public interface ResultService {

    // [Dialog Table]
    List<DialogRes> dialogInAll(Long conferenceID);
    List<DialogRes> dialogInQuestion(Long conferenceID, Long questionID);
    void updateOneDialog(DialogModifyReq dialogInfo);
    void updateAllDialog(List<DialogModifyReq> dialogInfo);

    // conference 종료 시 conference result 생성
    void createConferencResult(String eamil, Long interview_id, Long interview_time_id);
}
