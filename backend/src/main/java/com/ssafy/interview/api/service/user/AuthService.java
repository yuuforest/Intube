package com.ssafy.interview.api.service.user;

import com.ssafy.interview.api.request.user.UserLoginPostReq;
import com.ssafy.interview.common.model.KakaoUserInfoDto;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;

import javax.servlet.http.Cookie;
import java.util.Map;
import java.util.NoSuchElementException;

public interface AuthService {
    String getKakaoAccessToken(String code);

    KakaoUserInfoDto getKakaUserInfo(String accessToken);

    Map<String, String> getToken(UserLoginPostReq loginInfo) throws NoSuchElementException;

    ResponseCookie setRefreshToken(String email, String refreshToken);

    void setAccessToken(String email);

    String issueToken(Cookie cookie) throws NullPointerException;

    int getKakaoRegisterInfo(KakaoUserInfoDto kakaoUserInfoDto);

    // redis에 저장된 값 가져오기
    String getAuthKey(String key);

    // redis에 값 저장
    void setAuthKey(String key, String value, int expireTime);

    boolean hasAuthKey(String key);

    void deleteAuthKey(String key);

    // 로그인한 유저의 이메일 가져오기
    String getEmailByAuthentication(Authentication authentication);

    // 로그인한 유저의 id 가져오기
    Long getIdByAuthentication(Authentication authentication);

    // 암호화된 코드 equal check
    boolean checkMatches(String input, String data);
}
