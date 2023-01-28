package com.ssafy.interview.api.response.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.interview.db.entitiy.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UserResponse")
public class UserRes{
	@ApiModelProperty(name="유저 ID(email)", example="slhyj95@naver.com")
	String email;
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
	@ApiModelProperty(name="유저 is_kakao", example="0")
	int isKakao;
	@ApiModelProperty(name="유저 is_email_authorized", example="1")
	int isEmailAuthorized;
	@ApiModelProperty(name="유저 temperature", example="36.5")
	double temperature;
	@ApiModelProperty(name="유저 point", example="500")
	int point;
	@ApiModelProperty(name="유저 profile_url", example="https://303-intube.s3.ap-northeast-2.amazonaws.com/profile/user.png")
	String profile_url;
	
	public static UserRes of(User user) {
		UserRes res = new UserRes();
		res.setEmail(user.getEmail());
		res.setName(user.getName());
		res.setNickname(user.getNickname());
		res.setPhone(user.getPhone());
		res.setGender(user.getGender());
		res.setBirth(user.getBirth());
		res.setIntroduction(user.getIntroduction());
		res.setIsKakao(user.getIs_kakao());
		res.setIsEmailAuthorized(user.getIs_email_authorized());
		res.setTemperature(user.getTemperature());
		res.setPoint(user.getPoint());
		res.setProfile_url(user.getProfile_url());
		return res;
	}
}
