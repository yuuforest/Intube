package com.ssafy.interview.api.service.user;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.interview.api.request.user.UserLoginPostReq;
import com.ssafy.interview.common.auth.SsafyUserDetails;
import com.ssafy.interview.common.model.KakaoAccountDto;
import com.ssafy.interview.common.model.KakaoPropertiesDto;
import com.ssafy.interview.common.model.KakaoUserInfoDto;
import com.ssafy.interview.common.util.JwtTokenUtil;
import com.ssafy.interview.db.entitiy.User;
import com.ssafy.interview.db.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.Cookie;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service("authService")
public class AuthServiceImpl implements AuthService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    RedisTemplate<String, String> redisTemplate;
    @Value("${jwt.expiration.access}")
    int accessExpireTime;
    @Value("${jwt.expiration.refresh}")
    int refreshExpireTime;

    @Override
    public String getKakaoAccessToken(String code) {
        String accessToken = "";
        String refreshToken = "";
        String requestURL = "https://kauth.kakao.com/oauth/token";

        try {
            // HTTP Header 생성
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

            // HTTP Body 생성
            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            body.add("grant_type", "authorization_code");
            body.add("client_id", "dc6c7559412fd1c77ad3e0a798803e27");
            body.add("redirect_uri", "https://intube.store:8443/auth/kakao/callback");
            body.add("code", code);

            // HTTP 요청 보내기
            HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(body, headers);
            RestTemplate rt = new RestTemplate();
            ResponseEntity<String> response = rt.exchange(
                    "https://kauth.kakao.com/oauth/token",
                    HttpMethod.POST,
                    kakaoTokenRequest,
                    String.class
            );
            // HTTP 응답 (JSON) -> 액세스 토큰 파싱
            String responseBody = response.getBody();
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(responseBody);
            return jsonNode.get("access_token").asText();
        } catch (JsonProcessingException e) {
            return null;
        }
    }

    @Override
    public KakaoUserInfoDto getKakaUserInfo(String accessToken) {
        try {
            // HTTP Header 생성
            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "Bearer " + accessToken);
            headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

            // HTTP 요청 보내기
            HttpEntity<MultiValueMap<String, String>> kakaoUserInfoRequest = new HttpEntity<>(headers);
            RestTemplate rt = new RestTemplate();
            ResponseEntity<String> response = rt.exchange(
                    "https://kapi.kakao.com/v2/user/me",
                    HttpMethod.POST,
                    kakaoUserInfoRequest,
                    String.class
            );

            // responseBody에 있는 정보를 꺼냄
            String responseBody = response.getBody();

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(responseBody);

            Long id = jsonNode.get("id").asLong();
            String connectedAt = jsonNode.get("connected_at").asText();
            KakaoAccountDto kakaoAccountDto = new KakaoAccountDto(jsonNode.get("kakao_account"));
            KakaoPropertiesDto kakaoPropertiesDto = null;
            if (jsonNode.has("properties")) {
                kakaoPropertiesDto = new KakaoPropertiesDto(jsonNode.get("properties"));
            }

            return new KakaoUserInfoDto(id, connectedAt, kakaoAccountDto, kakaoPropertiesDto);
        } catch (JsonProcessingException e) {
            return null;
        }
    }

    @Override
    public Map<String, String> getToken(UserLoginPostReq loginInfo) throws NoSuchElementException {
        String email = loginInfo.getEmail();
        String password = loginInfo.getPassword();

        User user = userRepository.findByEmail(email).get();

        // 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
        if (passwordEncoder.matches(password, user.getPassword())) {
            // 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
            String accessToken = JwtTokenUtil.getAccessToken(email);
            String refreshToken = JwtTokenUtil.getRefreshToken(email);

            Map<String, String> response = new HashMap<>();
            response.put("accessToken", accessToken);
            response.put("refreshToken", refreshToken);

            return response;
        }
        // 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
        return null;
    }

    @Override
    public ResponseCookie setRefreshToken(String email, String refreshToken) {
        // 1. Redis에 저장 - 만료 시간 설정을 통해 자동 삭제 처리
        setAuthKey(email, refreshToken, refreshExpireTime);

        // 2. 쿠키에 저장 - response header 넣어서 보냄
        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                .domain("intube.store")
                .maxAge(refreshExpireTime/1000)
                .path("/")
                .secure(true)
                .sameSite("None")
                .httpOnly(true)
                .build();

        return cookie;
    }

    @Override
    public void setAccessToken(String email) {
        setAuthKey(email+"-BlackList", "Forced expiration", accessExpireTime);
    }

    @Override
    public String issueToken(Cookie cookie) throws NullPointerException {
        String cookieToken = cookie.getValue();

        // Refresh Token 검증
        JWTVerifier verifier = JwtTokenUtil.getVerifier("RT");
        JwtTokenUtil.handleError(verifier, cookieToken);
        DecodedJWT decodedJWT = verifier.verify(cookieToken);
        String userId = decodedJWT.getSubject();

        // Redis에서 저장된 Refresh Token 값을 가져온다.
        String refreshToken = getAuthKey(userId);
        if (refreshToken == null) {
            // refresh token이 없으면
            throw new NullPointerException();
        }

        // 토큰 재발행
        return JwtTokenUtil.getAccessToken(userId);
    }

    @Override
    public Map<String, String> getKakaoRegisterInfo(KakaoUserInfoDto kakaoUserInfoDto) {
        String email = kakaoUserInfoDto.getKakaoAccount().getEmail();

        Optional<User> user = userRepository.findKakaoUser(email, 1);
        if (user.isPresent()) {
            return null;
        }

        String nickname = null;
        String profile = null;
        if (kakaoUserInfoDto.getKakaoProperties() != null) {
            nickname = kakaoUserInfoDto.getKakaoProperties().getNickname();
            profile = kakaoUserInfoDto.getKakaoProperties().getProfileImage();
        }
        String gender = kakaoUserInfoDto.getKakaoAccount().getGender();

        Map<String, String> response = new HashMap<>();
        response.put("email", email);
        response.put("nickname", nickname);
        response.put("profile", profile);
        response.put("gender", gender);
        return response;
    }

    @Override
    public String getAuthKey(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    @Override
    public void setAuthKey(String key, String value, int expireTime) {
        redisTemplate.opsForValue().set(key, value, expireTime, TimeUnit.MILLISECONDS);
    }

    @Override
    public boolean hasAuthKey(String key) {
        return redisTemplate.hasKey(key);
    }

    @Override
    public void deleteAuthKey(String key) {
        redisTemplate.delete(key);
    }

    @Override
    public String getEmailByAuthentication(Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        return userDetails.getUsername();
    }

    public Long getIdByAuthentication(Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        return userDetails.getUser().getId();
    }

    @Override
    public boolean checkMatches(String input, String data) {
        return passwordEncoder.matches(input, data);
    }

}
