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
import java.util.List;
import java.util.stream.Collectors;

/**
 * 인터뷰 전체 정보 조회 API ([GET] /) 요청에 대한 응답값 정의.
 */
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ApiModel("InterviewTimeLoadRes")
public class InterviewTimeLoadRes extends InterviewLoadRes {
    @ApiModelProperty(name = "InterviewTime Detail Response List")
    List<InterviewTimeDetailRes> interviewTimeDetailResList;

    @QueryProjection
    public InterviewTimeLoadRes(Interview interview) {
        super(interview);
    }
}
