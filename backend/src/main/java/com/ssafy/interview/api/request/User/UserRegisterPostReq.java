package com.ssafy.interview.api.request.User;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

/**
 * 유저 회원가입 API ([POST] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserRegisterPostRequest")
public class UserRegisterPostReq {
	@ApiModelProperty(name="유저 ID(email)", example="slhyj95@naver.com")
	String email;
	@ApiModelProperty(name="유저 Password", example="1234")
	String password;
	@ApiModelProperty(name="유저 name", example="이영준")
	String name;
	@ApiModelProperty(name="유저 nickname", example="커플13일차")
	String nickname;
	@ApiModelProperty(name="유저 phone", example="01012341234")
	String phone;
	@ApiModelProperty(name="유저 gender", example="M")
	String gender;
	@ApiModelProperty(name="유저 birth", example="1999-07-13")
	@Temporal(TemporalType.DATE)
	@JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd", timezone="Asia/Seoul")
	Date birth;
	@ApiModelProperty(name="유저 introduction", example="안녕하세요 저는 착한 사람입니다.")
	String introduction;
	@ApiModelProperty(name="유저 is_email_authorized", example="1")
	int isEmailAuthorized;
}
