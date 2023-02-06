package com.ssafy.interview.api.response.interview;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.interview.db.entitiy.User;
import com.ssafy.interview.db.entitiy.interview.Interview;
import com.ssafy.interview.db.entitiy.interview.InterviewTime;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 인터뷰 상세 정보 조회 API ([GET] /) 요청에 대한 응답값 정의.
 */
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ApiModel("InterviewApplicantDetailRes")
public class InterviewApplicantDetailRes extends InterviewLoadRes {

    @ApiModelProperty(name = "Estimated Time")
    String estimated_time;

    @ApiModelProperty(name = "interviewTimeRes")
    InterviewTimeRes interviewTimeRes;

    @ApiModelProperty(name = "Apply End Time")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    Date download_expiration;

    @ApiModelProperty(name = "Owner ID")
    Long owner_id;

    @ApiModelProperty(name = "Owner Email")
    String owner_email;

    @ApiModelProperty(name = "Owner Email")
    String owner_name;

    @ApiModelProperty(name = "Owner Email")
    String owner_phone;

    @ApiModelProperty(name = "Applicant State")
    int applicant_state;

    @QueryProjection
    public InterviewApplicantDetailRes(Interview interview, User user, InterviewTime interviewTime) {
        this.id = interview.getId();
        this.category_name = interview.getInterviewCategory().getCategoryName();
        this.title = interview.getTitle();
        this.description = interview.getDescription();
        this.start_standard_age = interview.getStart_standard_age();
        this.end_standard_age = interview.getEnd_standard_age();
        this.gender = interview.getGender();
        this.max_people = interview.getMax_people();
        this.standard_point = interview.getStandard_point();
        this.apply_start_time = interview.getApply_start_time();
        this.apply_end_time = interview.getApply_end_time();
        this.interview_state = interview.getInterviewState();
        this.estimated_time = interview.getEstimated_time();
        this.download_expiration = interview.getDownload_expiration();
        this.owner_id = user.getId();
        this.owner_email = user.getEmail();
        this.owner_name = user.getName();
        this.owner_phone = user.getPhone();
        this.interviewTimeRes = new InterviewTimeRes(interviewTime.getId(), interviewTime.getInterview_start_time());
    }
}


