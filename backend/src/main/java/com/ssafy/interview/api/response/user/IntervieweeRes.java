package com.ssafy.interview.api.response.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.interview.api.response.interview.InterviewDetailApplicantRes;
import com.ssafy.interview.db.entitiy.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ApiModel("IntervieweeRes")
public class IntervieweeRes {
	@ApiModelProperty(name="유저 PK")
	Long id;
	@ApiModelProperty(name="유저 ID(email)")
	String email;
	@ApiModelProperty(name="유저 name")
	String name;
	@ApiModelProperty(name="유저 nickname")
	String nickname;
	@ApiModelProperty(name="유저 phone")
	String phone;
	@ApiModelProperty(name="유저 gender")
	String gender;
	@ApiModelProperty(name="유저 birth")
	@Temporal(TemporalType.DATE)
	@JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd", timezone="Asia/Seoul")
	Date birth;
	@ApiModelProperty(name="유저 introduction")
	String introduction;
	@ApiModelProperty(name="유저 temperature")
	double temperature;
	@ApiModelProperty(name="유저 point")
	int point;
	@ApiModelProperty(name="유저 profile_url", example="https://303-intube.s3.ap-northeast-2.amazonaws.com/profile/user.png")
	String profile_url;
	@JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm", timezone="Asia/Seoul")
	List<InterviewDetailApplicantRes> conductInterviewTimeList = new ArrayList<>();
	@ApiModelProperty(name="매칭 인터뷰 count")
	Long conduct_interview_count = 0L;
	@ApiModelProperty(name="신청 인터뷰 count")
	Long apply_interview_count = 0L;
	@ApiModelProperty(name="완료 인터뷰 count")
	Long complete_interview_count = 0L;

	@QueryProjection
	public IntervieweeRes(User user) {
		this.id = user.getId();
		this.email = user.getEmail();
		this.name = user.getName();
		this.nickname = user.getNickname();
		this.phone = user.getPhone();
		this.gender = user.getGender();
		this.birth = user.getBirth();
		this.introduction = user.getIntroduction();
		this.temperature = user.getTemperature();
		this.point = user.getPoint();
		this.profile_url = user.getProfile_url();
	}

}
