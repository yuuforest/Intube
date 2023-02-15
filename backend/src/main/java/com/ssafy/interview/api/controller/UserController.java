package com.ssafy.interview.api.controller;


import com.ssafy.interview.api.request.interview.InterviewSearchByApplicantStateReq;
import com.ssafy.interview.api.request.interview.InterviewSearchByStateReq;
import com.ssafy.interview.api.request.interview.InterviewSearchReq;
import com.ssafy.interview.api.request.user.*;
import com.ssafy.interview.api.response.interview.InterviewApplicantDetailRes;
import com.ssafy.interview.api.response.interview.InterviewLoadRes;
import com.ssafy.interview.api.response.interview.InterviewTimeLoadRes;
import com.ssafy.interview.api.response.user.*;
import com.ssafy.interview.api.service.S3Uploader;
import com.ssafy.interview.api.service.interview.InterviewService;
import com.ssafy.interview.api.service.user.AuthService;
import com.ssafy.interview.api.service.user.EmailService;
import com.ssafy.interview.api.service.user.UserService;
import com.ssafy.interview.common.auth.SsafyUserDetails;
import com.ssafy.interview.common.model.response.BaseResponseBody;
import com.ssafy.interview.db.entitiy.User;
import com.ssafy.interview.db.repository.interview.InterviewRepository;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/user")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    AuthService authService;

    @Autowired
    UserService userService;

    @Autowired
    InterviewService interviewService;

    @Autowired
    EmailService emailService;

    @Autowired
    S3Uploader s3Uploader;
    @Autowired
    private InterviewRepository interviewRepository;

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

        if (userService.findByEmail(registerInfo.getEmail()).isPresent()) {
            // 이미 회원가입한 회원일 때
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "Duplicated Email"));
        }

        //임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
        userService.createUser(registerInfo);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PutMapping()
    @ApiOperation(value = "회원 정보 수정", notes = "사용자 정보를 입력 받아 DB에 update한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> modify(
            @RequestBody @ApiParam(value = "프로필 수정 정보", required = true) UserModifyPutReq modifyInfo,
            @ApiIgnore Authentication authentication) {
        logger.info("modify call!");

        String email = authService.getEmailByAuthentication(authentication);

        if (!email.equals(modifyInfo.getEmail())) {
            // 토큰에 저장된 email과 요청을 보낸 email이 다를 때
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "Forbidden"));
        }

        User user = userService.findByEmail(email).get();

        userService.updateUser(modifyInfo);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PostMapping("/image")
    @ApiOperation(value = "프로필 이미지 수정", notes = "이미지 파일을 받아 프로필 이미지 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> uploadImage(
            @RequestPart @ApiParam(value = "프로필 이미지 파일", required = true) MultipartFile image,
            @ApiIgnore Authentication authentication) throws IOException {
        logger.info("uploadImage call!");

        String email = authService.getEmailByAuthentication(authentication);

        String img = s3Uploader.upload(image, "profile");
        logger.info("url >>> " + img);

        userService.uploadImage(email, img);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @GetMapping("/me")
    @ApiOperation(value = "로그인한 회원 정보 조회", notes = "로그인한 회원의 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<UserRes> getUserInfo(@ApiIgnore Authentication authentication) {
        /**
         * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
         * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
         */
        String email = authService.getEmailByAuthentication(authentication);

        User user = userService.findByEmail(email).get();
        return ResponseEntity.status(200).body(UserRes.of(200, "Success", user));
    }

    @GetMapping("/nickname")
    @ApiOperation(value = "닉네임으로 회원 조회", notes = "닉네임을 입력받아 회원을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 409, message = "닉네임 중복"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> confirmNickname(@RequestParam String nickname) {
        logger.info("confirmNickname call!");

        if (userService.findByNickname(nickname).isPresent()) {
            // 중복된 닉네임일 때
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "Duplicated Nickname"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PostMapping("/email")
    @ApiOperation(value = "이메일로 회원 조회", notes = "이메일을 입력받아 회원의 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> findUserByEmail(@RequestBody @ApiParam(value = "이메일 정보", required = true) UserEmailPostReq emailInfo) {
        logger.info("findUserByEmail call!");
        Optional<User> user = userService.findByEmail(emailInfo.getEmail());
        if (user.isPresent()) {
            return ResponseEntity.status(200).body(UserRes.of(200, "Success", userService.findByEmail(emailInfo.getEmail()).get()));
        }
        return ResponseEntity.status(404).body(BaseResponseBody.of(404, "Invalid User"));
    }

    @PutMapping("/password")
    @ApiOperation(value = "비밀번호 수정", notes = "현재 password, 새로운 password를 입력 받아 DB에 update한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "잘못된 비밀번호"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> modifyPassword(
            @RequestBody @ApiParam(value = "비밀번호 정보", required = true) UserPasswordPutReq passwordInfo,
            @ApiIgnore Authentication authentication) {
        logger.info("modifyPassword call!");

        String email = authService.getEmailByAuthentication(authentication);

        if (!email.equals(passwordInfo.getEmail())) {
            // 토큰에 저장된 email과 요청을 보낸 email이 다를 때
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "Forbidden"));
        }

        User user = userService.findByEmail(email).get();
        if (!authService.checkMatches(passwordInfo.getPassword(), user.getPassword())) {
            // 비밀번호가 틀렸을 때
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "Invalid Password"));
        }

        userService.updatePassword(passwordInfo.getEmail(), passwordInfo.getNewPassword());

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PostMapping("/find-email")
    @ApiOperation(value = "아이디(email) 찾기", notes = "이름과 인증된 회원 phone을 입력 받아 아이디를 반환한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<UserEmailPostRes> findEmail(
            @RequestBody @ApiParam(value = "회원가입 정보", required = true) UserFindEmailPostReq findEmailInfo) {
        logger.info("findEmail call!");

        Optional<User> user = userService.findEmail(findEmailInfo.getName(), findEmailInfo.getPhone());

        if (!user.isPresent()) {
            return ResponseEntity.status(404).body(UserEmailPostRes.of(404, "Invalid User", null));
        }

        return ResponseEntity.status(200).body(UserEmailPostRes.of(200, "Success", user.get().getEmail()));
    }

    @PostMapping("/find-password")
    @ApiOperation(value = "비밀번호 찾기", notes = "이름과 email을 입력 받아 랜덤 비밀번호를 생성하여 이메일로 전송한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> findPassword(
            @RequestBody @ApiParam(value = "회원가입 정보", required = true) UserFindPwdPostReq findPwdInfo) throws Exception {
        logger.info("findPassword call!");
        try {
            if (!userService.findPassword(findPwdInfo.getName(), findPwdInfo.getEmail()).isPresent()) {
                // 맞는 회원이 없을 때
                return ResponseEntity.status(404).body(BaseResponseBody.of(404, "Invalid User"));
            }

            String confirm = emailService.sendRandomPassword(findPwdInfo.getEmail());

            // 랜덤 비밀번호를 db에 update
            userService.updatePassword(findPwdInfo.getEmail(), confirm);

            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "Invalid Addresses"));
        }
    }

    @PutMapping("/point")
    @ApiOperation(value = "회원 포인트 수정", notes = "회원 정보와 포인트 값을 입력 받아 DB에 update한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "0미만이 되는 값"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> modifyPoint(
            @RequestBody @ApiParam(value = "포인트 정보", required = true) UserPointPutReq pointInfo) {
        logger.info("modifyPoint call!");

        Optional<User> user = userService.findByEmail(pointInfo.getEmail());
        if (!user.isPresent()) {
            // 맞는 회원이 없을 때
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "Invalid User"));
        }

        try {
            userService.updatePoint(pointInfo);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "Invalid Value"));
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PutMapping("/temperature")
    @ApiOperation(value = "회원 온도 수정", notes = "회원 정보와 포인트 값을 입력 받아 DB에 update한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "0미만이 되는 값"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> modifyTemperature(
            @RequestBody @ApiParam(value = "회원 온도 정보", required = true) UserTemperaturePutReq temperatureInfo) {
        logger.info("modifyTemperature call!");

        Optional<User> user = userService.findByEmail(temperatureInfo.getEmail());
        if (!user.isPresent()) {
            // 맞는 회원이 없을 때
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "Invalid User"));
        }

        try {
            userService.updateTemperature(temperatureInfo);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "Invalid Value"));
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @DeleteMapping()
    @ApiOperation(value = "회원 탈퇴", notes = "사용자 정보를 입력 받아 DB에서 delete한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "권한 없음"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> withdraw(@ApiIgnore Authentication authentication) throws Exception {
        logger.info("withdraw call!");
        try {
            String email = authService.getEmailByAuthentication(authentication);

            User user = userService.findByEmail(email).get();

            // Access token blacklist에 추가
            authService.setAccessToken(user.getEmail());

            // Refresh token redis에서 삭제
            authService.deleteAuthKey(user.getEmail());

            // user table에서 삭제
            userService.deleteUser(user.getEmail());

            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));

        } catch (NullPointerException e) {
            // 유효하지 않는 이메일인 경우, 로그인 실패로 응답.
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "Invalid User"));
        }
    }


    /*
     * 마이페이지 - 질문자 관련
     */
    @GetMapping("/interviewer/mypage")
    @ApiOperation(value = "마이페이지(질문자) 조회", notes = "유저 email을 입력 받는다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<InterviewerRes> searchInterviewer(@ApiIgnore Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String email = userDetails.getUsername();

        return ResponseEntity.status(200).body(userService.findInterviewerMyPage(email));
    }

    @PostMapping("/interviewer")
    @ApiOperation(value = "인터뷰 상태별 공고 조회", notes = "조회할 인터뷰 상태와 검색어 그리고 pageNumber를 입력 받는다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Page<InterviewTimeLoadRes>> findInterviewByStateAndWord(@RequestBody InterviewSearchByStateReq interviewSearchByStateReq,
                                                                                  @PageableDefault(size = 8) Pageable pageable, @ApiIgnore Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String email = userDetails.getUsername();

        return ResponseEntity.status(200).body(interviewService.findInterviewByInterviewState(email, interviewSearchByStateReq, pageable));
    }

    @GetMapping("/interviewer/{interview_time_id}/manage-applicant")
    @ApiOperation(value = "인터뷰 시작 시간관련 신청자 리스트 조회", notes = "해당 시작시간의 id를 입력 받는다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<ApplicantDetailRes>> findApplicantDetailRes(@PathVariable Long interview_time_id) {
        return ResponseEntity.status(200).body(userService.findApplicantDetailRes(interview_time_id));
    }

    @PutMapping("/interviewer/accept-applicant")
    @ApiOperation(value = "신청자의 요청을 수락", notes = "해당 신청자의 id와 state를 입력 받는다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> acceptApplicant(@RequestParam Long applicant_id,
                                                                      @RequestParam int applicant_state,
                                                                      @ApiIgnore Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String email = userDetails.getUsername();

        userService.updateApplicantState(email, applicant_id, applicant_state);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @DeleteMapping("/interviewer/refuse-applicant")
    @ApiOperation(value = "신청자의 요청을 거절(삭제)", notes = "해당 신청자의 id를 입력 받는다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> refuseApplicant(@RequestParam Long applicant_id,
                                                                      @ApiIgnore Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String email = userDetails.getUsername();

        userService.deleteApplicant(email, applicant_id);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    /*
     * 마이페이지 - 답변자 관련
     */
    @GetMapping("/interviewee/mypage")
    @ApiOperation(value = "마이페이지(답변자) 조회", notes = "로그인 토큰을 확인한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<IntervieweeRes> searchInterviewee(@ApiIgnore Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String email = userDetails.getUsername();

        return ResponseEntity.status(200).body(userService.findIntervieweeMyPage(email));
    }

    @PostMapping("/interviewee")
    @ApiOperation(value = "답변자 신청 상태별 공고 조회", notes = "조회할 신청자 상태와 검색어 그리고 pageNumber를 입력 받는다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Page<InterviewApplicantDetailRes>> findInterviewByCategoryAndWord(@RequestBody InterviewSearchByApplicantStateReq interviewSearchByApplicantStateReq,
                                                                                            @PageableDefault(size = 8) Pageable pageable, @ApiIgnore Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String email = userDetails.getUsername();

        return ResponseEntity.status(200).body(interviewService.findInterviewByApplicantState(email, interviewSearchByApplicantStateReq, pageable));
    }

}
