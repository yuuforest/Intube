package com.ssafy.interview.api.request.result;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("dialogModifyReq")
public class dialogModifyReq {

    @ApiModelProperty(name="dialog ID")
    Long dialogID;

    @ApiModelProperty(name="발언 내용")
    String content;
}
