package com.ssafy.interview.api.response.interview;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.interview.db.entitiy.interview.InterviewTime;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * 인터뷰 전체 정보 조회 API ([GET] /) 요청에 대한 응답값 정의.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ApiModel("InterviewTimeRes")
public class InterviewTimeRes {
    @ApiModelProperty(name = "Interview Time ID")
    Long id;

    @ApiModelProperty(name = "Interview start Time")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    Date interview_start_time;

    @QueryProjection
    public InterviewTimeRes(InterviewTime interviewTime) {
        this.id = interviewTime.getId();
        this.interview_start_time = interviewTime.getInterview_start_time();
    }
}
