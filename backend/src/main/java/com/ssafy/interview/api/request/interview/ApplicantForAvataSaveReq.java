package com.ssafy.interview.api.request.interview;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.ssafy.interview.common.util.JsonDateSerializer;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 인터뷰 생성 API ([POST] /interviews) 요청에 필요한 리퀘스트 바디 정의.
 */
@ApiModel("ApplicantForAvataSaveReq")
@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class ApplicantForAvataSaveReq {
    @ApiModelProperty(example = "", value = "검색어(공고 제목 or 내용)")
    private Long interview_id;

    @ApiModelProperty(example = "2023-01-30T11:00", name = "인터뷰 시작 시간")
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
    Date interview_start_time;

    @ApiModelProperty(example = "2", name = "신청자 상태 - 0(신청가능), 1(대기), 2(수락), 3(완료)")
    int applicant_state;
}