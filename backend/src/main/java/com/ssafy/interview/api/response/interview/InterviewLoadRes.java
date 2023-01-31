package com.ssafy.interview.api.response.interview;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.interview.db.entitiy.interview.Interview;
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
public class InterviewLoadRes {
	@ApiModelProperty(name="Interview ID")
	Long id;

	@ApiModelProperty(name="Category Name")
	String categoryName;

	@ApiModelProperty(name="Title")
	String title;

	@ApiModelProperty(name="Description")
	String description;

	@ApiModelProperty(name="Start Standard Age")
	int start_standard_age;

	@ApiModelProperty(name="End Standard Age")
	int end_standard_age;

	@ApiModelProperty(name="Gender")
	char gender;

	@ApiModelProperty(name="Max People")
	int max_people;

	@ApiModelProperty(name="Standard Point")
	int standard_point;

	@ApiModelProperty(name="Apply Start Time")
	@JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm", timezone="Asia/Seoul")
	LocalDateTime apply_start_time;

	@ApiModelProperty(name="Apply End Time")
	@JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm", timezone="Asia/Seoul")
	Date apply_end_time;

	@ApiModelProperty(name="Interview State")
	int interview_state;

	@QueryProjection
	public InterviewLoadRes(Interview interview) {
		this.id = interview.getId();
		this.categoryName = interview.getInterviewCategory().getCategoryName();
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
	}
}
