package com.ssafy.interview.api.response.User;

import com.ssafy.interview.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("KakaoInfoPostResponse")
public class KakaoInfoPostRes extends BaseResponseBody {

    @ApiModelProperty(name = "Kakao Email", example = "abcdq12345@naver.com")
    String kakaoEmail;
    @ApiModelProperty(name = "Kakao Nickname", example = "Sophie")
    String kakaoNickname;
    @ApiModelProperty(name = "Kakao Gender", example = "female")
    String kakaoGender;
    @ApiModelProperty(name = "Kakao Profile", example = "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg")
    String kakaoProfile;

    public static KakaoInfoPostRes of(Integer statusCode, String message, String kakaoEmail, String kakaoNickname, String kakaoGender, String kakaProfile) {
        KakaoInfoPostRes res = new KakaoInfoPostRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setKakaoEmail(kakaoEmail);
        res.setKakaoNickname(kakaoNickname);
        res.setKakaoGender(kakaoGender);
        res.setKakaoProfile(kakaProfile);
        return res;
    }
}
