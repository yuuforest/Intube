package com.ssafy.interview.api.controller;

import com.ssafy.interview.api.request.UserModifyReq;
import com.ssafy.interview.api.request.UserRegisterPostReq;
import com.ssafy.interview.api.response.KakaoInfoPostRes;
import com.ssafy.interview.api.response.UserLoginPostRes;
import com.ssafy.interview.api.response.UserRes;
import com.ssafy.interview.api.service.UserService;
import com.ssafy.interview.common.auth.SsafyUserDetails;
import com.ssafy.interview.common.model.KakaoUserInfoDto;
import com.ssafy.interview.common.model.response.BaseResponseBody;
import com.ssafy.interview.common.util.JwtTokenUtil;
import com.ssafy.interview.db.entitiy.User;
import com.ssafy.interview.db.repository.UserRepository;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.Optional;
import java.util.concurrent.TimeUnit;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/user")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @PostMapping()
    @ApiOperation(value = "회원 가입", notes = "사용자 정보를 입력 받아 DB에 insert한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 409, message = "이메일 중복"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> register(
            @RequestBody @ApiParam(value = "회원가입 정보", required = true) UserRegisterPostReq registerInfo) {
        logger.info("register call!");

        if (userRepository.findByEmail(registerInfo.getEmail()).isPresent()){
            // 이미 회원가입한 회원일 때
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "Duplicated Email"));
        }

        //임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
        userService.createUser(registerInfo);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PutMapping()
    @ApiOperation(value = "회원 정보 수정", notes = "수정한 회원 정보를 받아 회원 정보를 수정 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> modify(
            @RequestBody @ApiParam(value = "회원정보 수정", required = true) UserModifyReq modifyInfo) {
//        userService.updateUser(modifyInfo);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @DeleteMapping()
    @ApiOperation(value = "회원 탈퇴", notes = "아이디인 유저의 이메일을 통해 회원탈퇴 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> remove(
            @RequestBody @ApiParam(value = "탈퇴할 회원의 이메일", required = true) String email) {
        userService.deleteUser(email);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PostMapping("/find")
    @ApiOperation(value = "회원 찾기", notes = "이메일로 회원을 찾는다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> findUserInfo(
            @RequestBody @ApiParam(value = "찾는 회원의 이메일", required = true) String email) {
        /**
         * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
         * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
         */
        Optional<User> user = userService.testUserByEmail(email);
        if (user.isPresent()) {
            return ResponseEntity.status(200).body(user);
        } else {
            return ResponseEntity.status(200).body("찾으시는 이메일에 해당하는 유저가 없습니다. ");
        }
    }

    @GetMapping("/me")
    @ApiOperation(value = "회원 본인 정보 조회", notes = "로그인한 회원 본인의 정보를 응답한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<UserRes> getUserInfo(@ApiIgnore Authentication authentication) {
        /**
         * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
         * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
         */
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String email = userDetails.getUsername();
        User user = userService.getUserByEmail(email);
        return ResponseEntity.status(200).body(UserRes.of(user));
    }

    @GetMapping("/nickname")
    @ApiOperation(value = "닉네임으로 회원 조회", notes = "닉네임을 입력받아 회원을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 409, message = "닉네임 줌복"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> confirmNickname(@RequestParam String nickname) {
        logger.info("confirmNickname call!");

        if (userRepository.findByNickname(nickname).isPresent()){
            // 중복된 닉네임일 때
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "Duplicated Nickname"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
}
