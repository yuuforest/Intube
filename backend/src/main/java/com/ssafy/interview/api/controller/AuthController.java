package com.ssafy.interview.api.controller;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ssafy.interview.api.request.user.UserAuthkeyPostReq;
import com.ssafy.interview.api.request.user.UserEmailPostReq;
import com.ssafy.interview.api.request.user.UserLoginPostReq;
import com.ssafy.interview.api.request.user.UserPasswordPostReq;
import com.ssafy.interview.api.response.user.KakaoInfoPostRes;
import com.ssafy.interview.api.response.user.UserLoginPostRes;
import com.ssafy.interview.api.service.user.AuthService;
import com.ssafy.interview.api.service.user.EmailService;
import com.ssafy.interview.api.service.user.UserService;
import com.ssafy.interview.common.auth.SsafyUserDetails;
import com.ssafy.interview.common.model.KakaoUserInfoDto;
import com.ssafy.interview.common.model.response.BaseResponseBody;
import com.ssafy.interview.common.util.JwtTokenUtil;
import com.ssafy.interview.db.entitiy.User;
import com.ssafy.interview.db.repository.user.UserRepository;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.Cookie;
import java.util.concurrent.TimeUnit;

/**
 * 인증 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "인증 API", tags = {"Auth"})
@RestController
@RequestMapping("/auth")
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    @Autowired
    UserService userService;

    @Autowired
    AuthService authService;

    @Autowired
    EmailService emailService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    RedisTemplate<String, String> redisTemplate;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "email, password 정보를 받아 인증 토큰을 반환한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
            @ApiResponse(code = 400, message = "잘못된 비밀번호"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<UserLoginPostRes> login(@RequestBody @ApiParam(value = "로그인 정보", required = true) UserLoginPostReq loginInfo) {
        logger.info("login call!");

        String email = loginInfo.getEmail();
        String password = loginInfo.getPassword();

        User user = userRepository.findByEmail(email).get();
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
            return ResponseEntity.status(400).body(UserLoginPostRes.of(400, "Invalid Password", null));
        } catch (NullPointerException e) {
            // 유효하지 않는 이메일인 경우, 로그인 실패로 응답.
            return ResponseEntity.status(404).body(UserLoginPostRes.of(404, "Invalid Email", null));
        }
    }

    @GetMapping("/issue")
    @ApiOperation(value = "Token 재발급", notes = "Refresh Token 정보를 받아 인증 토큰을 재발급한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
            @ApiResponse(code = 401, message = "Refresh Token 만료")
    })
    public ResponseEntity<UserLoginPostRes> issue(@CookieValue(value = "refreshToken", required = false) Cookie cookie) {
        logger.info("issue call!");
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
                System.out.println("Tampered!");
            }

            // 토큰 재발행
            String new_access_token = JwtTokenUtil.getAccessToken(userId);

            return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", new_access_token));
        } catch (NullPointerException e) {
            return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "Refresh Token Expired", null));
        }
    }

    @GetMapping("/kakao/callback")
    @ApiOperation(value = "카카오 로그인", notes = "카카오 인가코드를 입력 받아 카카오 유저 정보를 반환하거나 로그인한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> kakaoCallback(@RequestParam String code) {
        logger.info("kakaoCallback call!");
        try {
            // URL에 포함된 code를 이용하여 액세스 토큰 발급
            String kakaoAccessToken = authService.getKakaoAccessToken(code);
            logger.info("Kakao access token >>> " + kakaoAccessToken);

            // 토큰으로 카카오 API 호출
            KakaoUserInfoDto kakaoUserInfoDto = authService.getKakaUserInfo(kakaoAccessToken);

            String email = kakaoUserInfoDto.getKakaoAccount().getEmail();
            String nickname = null;
            String profile = null;
            if (kakaoUserInfoDto.getKakaoProperties() != null) {
                nickname = kakaoUserInfoDto.getKakaoProperties().getNickname();
                profile = kakaoUserInfoDto.getKakaoProperties().getProfileImage();
            }
            String gender = kakaoUserInfoDto.getKakaoAccount().getGender();
            User kakaoUser = userRepository.findByEmail(email).get();

            if (kakaoUser == null) {
                // 회원가입한 적 없는 유저일 때 email을 반환한다.
                return ResponseEntity.ok()
                        .body(KakaoInfoPostRes.of(404, "You need to register!", email, nickname, gender, profile));
            }

            // jwt 토큰을 만들고 로그인
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
        } catch (NullPointerException e) {
            // 유효하지 않는 이메일인 경우, 로그인 실패로 응답.
            return ResponseEntity.status(404).body(UserLoginPostRes.of(404, "Invalid Email", null));
        }
    }

    @PostMapping("/send-email")
    @ApiOperation(value = "이메일 인증 코드 전송", notes = "회원 email을 입력 받아 인증코드를 전송한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 400, message = "이메일 형식 오류"),
            @ApiResponse(code = 409, message = "이메일 중복"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> sendEmail(@RequestBody @ApiParam(value = "회원 email", required = true) UserEmailPostReq emailInfo) throws Exception {
        logger.info("sendEmail call!");
        try {
            if (userRepository.findByEmail(emailInfo.getEmail()).isPresent()) {
                // 이미 회원가입한 회원일 때
                return ResponseEntity.status(409).body(BaseResponseBody.of(409, "Duplicated Email"));
            }

            String confirm = emailService.sendAuthCode(emailInfo.getEmail());

            // 인증코드를 redis에 저장
            redisTemplate.opsForValue().set(emailInfo.getEmail() + "-email", confirm, 60000, TimeUnit.MILLISECONDS);

            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "Invalid Addresses"));
        }
    }

    @PostMapping("/check-email")
    @ApiOperation(value = "이메일 인증 코드 확인", notes = "email과 인증키를 입력 받아 인증한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 401, message = "이메일 인증 코드 만료 / 잘못된 인증 코드"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> checkEmail(@RequestBody @ApiParam(value = "이메일 인증 정보", required = true) UserAuthkeyPostReq authkeyInfo) throws Exception {
        logger.info("checkEmail call!");

        String authKey = authkeyInfo.getAuthKey();
        String email = authkeyInfo.getEmail();

        // redis에 저장된 인증 코드 가져오기
        String confirm = redisTemplate.opsForValue().get(email + "-email");

        if (confirm == null) {
            // 인증 코드가 없으면
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Email Authkey Expired"));
        }

        if (!authKey.equals(confirm)) {
            // 잘못된 인증 코드
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Wrong Email Authkey"));
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));

    }

    @PostMapping("/check-password")
    @ApiOperation(value = "비밀번호 확인", notes = "password 정보를 받아 비밀번호 일치 여부를 판단한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> checkPassword(
            @RequestBody @ApiParam(value = "비밀번호 정보", required = true) UserPasswordPostReq passwordInfo,
            @ApiIgnore Authentication authentication) throws Exception {
        logger.info("checkPassword call!");

        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String email = userDetails.getUsername();

        User user = userRepository.findByEmail(email).get();
        try {
            // 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
            if (passwordEncoder.matches(passwordInfo.getPassword(), user.getPassword())) {
                return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
            }
            // 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
            return ResponseEntity.status(400).body(UserLoginPostRes.of(400, "Invalid Password", null));
        } catch (NullPointerException e) {
            // 유효하지 않는 이메일인 경우, 로그인 실패로 응답.
            return ResponseEntity.status(404).body(UserLoginPostRes.of(404, "Invalid Email", null));
        }
    }
}