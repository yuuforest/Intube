package com.ssafy.interview.api.response.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.interview.common.model.response.BaseResponseBody;
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
public class UserRes extends BaseResponseBody {
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
	@ApiModelProperty(name="유저 is_kakao")
	int isKakao;
	@ApiModelProperty(name="유저 is_email_authorized")
	int isEmailAuthorized;
	@ApiModelProperty(name="유저 temperature")
	double temperature;
	@ApiModelProperty(name="유저 point")
	int point;
	@ApiModelProperty(name="유저 profile_url")
	String profile_url;
	
	public static UserRes of(Integer statusCode, String message, User user) {
		UserRes res = new UserRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
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
