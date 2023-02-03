package com.ssafy.interview.api.response.interview;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.interview.db.entitiy.interview.Interview;
import com.ssafy.interview.db.entitiy.interview.InterviewTime;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

/**
 * 인터뷰 전체 정보 조회 API ([GET] /) 요청에 대한 응답값 정의.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ApiModel("InterviewResponse")
public class InterviewTimeDetailRes {
    @ApiModelProperty(name = "Interview ID")
    Long id;

    @ApiModelProperty(name = "Interview start Time")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    Date interview_start_time;

    @ApiModelProperty(name = "Applicant state = 1")
    Long wait_applicant_count;

    @ApiModelProperty(name = "Applicant state = 2")
    Long apply_applicant_count;

    @QueryProjection
    public InterviewTimeDetailRes(InterviewTime interviewTime, Long wait_applicant_count, Long apply_applicant_count) {
        this.id = interviewTime.getId();
        this.interview_start_time = interviewTime.getInterview_start_time();
        this.wait_applicant_count = wait_applicant_count;
        this.apply_applicant_count = apply_applicant_count;
    }
}
