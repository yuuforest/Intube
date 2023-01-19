package com.ssafy.interview.api.controller;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ssafy.interview.api.request.UserLoginPostReq;
import com.ssafy.interview.api.response.UserLoginPostRes;
import com.ssafy.interview.api.service.UserService;
import com.ssafy.interview.common.model.response.BaseResponseBody;
import com.ssafy.interview.common.util.JwtTokenUtil;
import com.ssafy.interview.db.entitiy.User;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import java.util.concurrent.TimeUnit;

/**
 * 인증 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "인증 API", tags = {"Auth."})
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    UserService userService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    RedisTemplate<String, String> redisTemplate;

    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "<strong>email, password</strong> 정보를 받아 인증 토큰을 반환한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<UserLoginPostRes> login(@RequestBody @ApiParam(value = "로그인 정보", required = true) UserLoginPostReq loginInfo) {
        String email = loginInfo.getEmail();
        String password = loginInfo.getPassword();

        User user = userService.getUserByEmail(email);
        try {
            // 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
            if (passwordEncoder.matches(password, user.getPassword())) {
                // 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
                String accessToken = JwtTokenUtil.getAccessToken(email);
                String refreshToken = JwtTokenUtil.getRefreshToken(email);

                // Refresh Token에 대한 처리
                // 1. Redis에 저장 - 만료 시간 설정을 통해 자동 삭제 처리
                redisTemplate.opsForValue().set(email, refreshToken, 60000, TimeUnit.MILLISECONDS);
                // 2. 쿠키에 저장 - response header 넣어서 보냄
                ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                        .domain("localhost") // 쿠키 도메인 설정
                        .maxAge(60)
                        .path("/")
                        .secure(true)
                        .sameSite("None")
                        .httpOnly(true)
                        .build();

                return ResponseEntity.ok()
                        .header(HttpHeaders.SET_COOKIE, cookie.toString())
                        .body(UserLoginPostRes.of(200, "Success", accessToken));
            }
            // 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
            return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "Invalid Password", null));
        } catch (NullPointerException e) {
            // 유효하지 않는 이메일인 경우, 로그인 실패로 응답.
            return ResponseEntity.status(404).body(UserLoginPostRes.of(404, "Invalid Email", null));
        }
    }

    @GetMapping("/issue")
    @ApiOperation(value = "Token 재발급", notes = "<strong>Refresh Token</strong> 정보를 받아 인증 토큰을 재발급한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
            @ApiResponse(code = 401, message = "Refresh Token 만료")
    })
    public ResponseEntity<UserLoginPostRes> issue(@CookieValue(value = "refreshToken", required = false) Cookie cookie) {
        try {
            String cookieToken = cookie.getValue();

            // Refresh Token 검증
            JWTVerifier verifier = JwtTokenUtil.getVerifier("RT");
            JwtTokenUtil.handleError(verifier, cookieToken);
            DecodedJWT decodedJWT = verifier.verify(cookieToken);
            String userId = decodedJWT.getSubject();

            // Redis에서 저장된 Refresh Token 값을 가져온다.
            String refreshToken = redisTemplate.opsForValue().get(userId);
            if (refreshToken == null) {
                // refresh token이 없으면
                return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "Refresh Token Expired", null));
            }

            if (!cookieToken.equals(refreshToken)) {
                System.out.println("tampered!");
            }

            // 토큰 재발행
            String new_access_token = JwtTokenUtil.getAccessToken(userId);

            return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", new_access_token));
        } catch (NullPointerException e) {
            return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "Refresh Token Expired", null));
        }
    }
}
