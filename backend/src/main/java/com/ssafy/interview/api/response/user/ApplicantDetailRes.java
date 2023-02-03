package com.ssafy.interview.api.response.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.interview.common.model.response.BaseResponseBody;
import com.ssafy.interview.db.entitiy.User;
import com.ssafy.interview.db.entitiy.interview.Applicant;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

/**
 * 신청자 신청상태 및 정보 조회 API ([GET] /user/interviewr/manage-applicant) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ApiModel("Applicant Response")
public class ApplicantDetailRes {
    @ApiModelProperty(name = "신청자 PK")
    Long id;
    @ApiModelProperty(name = "신청자 상태")
    int applicant_state;
    @ApiModelProperty(name = "신청자 ID(email)")
    String email;
    @ApiModelProperty(name = "신청자 name")
    String name;
    @ApiModelProperty(name = "신청자 nickname")
    String nickname;
    @ApiModelProperty(name = "신청자 phone")
    String phone;
    @ApiModelProperty(name = "신청자 gender")
    String gender;
    @ApiModelProperty(name = "신청자 birth")
    @Temporal(TemporalType.DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    Date birth;
    @ApiModelProperty(name = "신청자 introduction")
    String introduction;
    @ApiModelProperty(name = "신청자 temperature")
    double temperature;
    @ApiModelProperty(name = "신청자 profile_url")
    String profile_url;

    @QueryProjection
    public ApplicantDetailRes(Applicant applicant, User user) {
        this.id = applicant.getId();
        this.applicant_state = applicant.getApplicantState();
        this.email = user.getEmail();
        this.name = user.getName();
        this.nickname = user.getNickname();
        this.phone = user.getPhone();
        this.gender = user.getGender();
        this.birth = user.getBirth();
        this.introduction = user.getIntroduction();
        this.temperature = user.getTemperature();
        this.profile_url = user.getProfile_url();
    }
}
