package com.ssafy.interview.api.request.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Getter
@Setter
@ApiModel("UserModifyPutRequest")
public class UserModifyPutReq {

    @ApiModelProperty(name="유저 ID(email)", example="ssafy@ssafy.com")
    String email;
    @ApiModelProperty(name="유저 Password", example="1234")
    String password;
    @ApiModelProperty(name="유저 name", example="이싸피")
    String name;
    @ApiModelProperty(name="유저 nickname", example="아몰랑!")
    String nickname;
    @ApiModelProperty(name="유저 phone", example="01011111112")
    String phone;
    @ApiModelProperty(name="유저 gender", example="M")
    String gender;
    @ApiModelProperty(name="유저 birth", example="1999-10-20")
    @Temporal(TemporalType.DATE)
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd", timezone="Asia/Seoul")
    Date birth;
    @ApiModelProperty(name="유저 introduction", example="자기소개 왜 씀?")
    String introduction;
}

