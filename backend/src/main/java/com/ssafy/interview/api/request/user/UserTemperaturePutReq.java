package com.ssafy.interview.api.request.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserTemperaturePutRequest")
public class UserTemperaturePutReq {
    @ApiModelProperty(name="유저 email ID", example="ssafy@ssafy.com")
    String email;
    @ApiModelProperty(name="증감될 temperature 크기", example="1.2")
    double temperature;
    @ApiModelProperty(name="증감 여부", example="1")
    int key;
}
