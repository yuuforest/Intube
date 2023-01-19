package com.ssafy.interview.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Getter
@Setter
@ApiModel("UserModifyReq")
public class UserModifyReq {

    @ApiModelProperty(name="유저 ID(email)")
    String email;
    @ApiModelProperty(name="유저 Password")
    String password;
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
    Date birth;
    @ApiModelProperty(name="유저 introduction")
    String introduction;
    @ApiModelProperty(name="유저 temperature")
    int temperature;
    @ApiModelProperty(name="유저 authorization")
    Integer authorization;
    @ApiModelProperty(name="유저 point")
    Double point;
    @ApiModelProperty(name="유저 profile_url")
    String profile_url;
}

