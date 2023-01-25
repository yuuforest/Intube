package com.ssafy.interview.common.model;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class KakaoUserInfoDto {
    private Long id;
    private String connectedAt;
    private KakaoAccountDto kakaoAccount;

    private KakaoPropertiesDto kakaoProperties;

    public KakaoUserInfoDto(Long id, String connectedAt, KakaoAccountDto kakaoAccount,  KakaoPropertiesDto kakaoProperties) {
        this.id = id;
        this.connectedAt = connectedAt;
        this.kakaoAccount = kakaoAccount;
        this.kakaoProperties = kakaoProperties;
    }

}