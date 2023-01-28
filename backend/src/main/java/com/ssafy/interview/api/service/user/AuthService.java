package com.ssafy.interview.api.service.user;

import com.ssafy.interview.common.model.KakaoUserInfoDto;

public interface AuthService {
    String getKakaoAccessToken(String code);

    KakaoUserInfoDto getKakaUserInfo(String accessToken);
}
