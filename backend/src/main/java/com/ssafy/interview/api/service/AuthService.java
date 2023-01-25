package com.ssafy.interview.api.service;

import com.ssafy.interview.common.model.KakaoUserInfoDto;

public interface AuthService {
    String getKakaoAccessToken(String code);

    KakaoUserInfoDto getKakaUserInfo(String accessToken);
}
