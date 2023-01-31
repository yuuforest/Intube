package com.ssafy.interview.api.service.user;


import com.ssafy.interview.api.request.user.UserModifyPutReq;
import com.ssafy.interview.api.request.user.UserRegisterPostReq;
import com.ssafy.interview.api.response.user.InterviewerRes;
import com.ssafy.interview.db.entitiy.User;
import com.ssafy.interview.db.repository.interview.InterviewRepository;
import com.ssafy.interview.db.repository.interview.InterviewTimeRepository;
import com.ssafy.interview.db.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    InterviewTimeRepository interviewTimeRepository;

    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    private InterviewRepository interviewRepository;

    @Override
    public void createUser(UserRegisterPostReq userRegisterInfo) {
        User user = new User();
        user.setEmail(userRegisterInfo.getEmail());
        user.setName(userRegisterInfo.getName());
        user.setNickname(userRegisterInfo.getNickname());
        user.setPhone(userRegisterInfo.getPhone());
        user.setGender(userRegisterInfo.getGender());
        user.setBirth(userRegisterInfo.getBirth());
        user.setIntroduction(userRegisterInfo.getIntroduction());
        user.setIs_kakao(userRegisterInfo.getIsKakao());
        user.setIs_email_authorized(userRegisterInfo.getIsEmailAuthorized());
        // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
        user.setPassword(passwordEncoder.encode(userRegisterInfo.getPassword()));
        userRepository.save(user);
    }

    @Transactional
    @Override
    public void updateUser(UserModifyPutReq userModifyInfo) {
        User user = userRepository.findByEmail(userModifyInfo.getEmail()).get();
        user.setName(userModifyInfo.getName());
        user.setNickname(userModifyInfo.getNickname());
        user.setPhone(userModifyInfo.getPhone());
        user.setGender(userModifyInfo.getGender());
        user.setBirth(userModifyInfo.getBirth());
        user.setIntroduction(userModifyInfo.getIntroduction());
    }

    @Transactional
    @Override
    public void updatePassword(String email, String newPassword) {
        User user = userRepository.findByEmail(email).get();
        // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
        user.setPassword(passwordEncoder.encode(newPassword));
    }

    @Override
    public void deleteUser(String email) {
        User user = userRepository.findByEmail(email).get();
        userRepository.delete(user);
    }

    @Transactional
    @Override
    public void uploadImage(String email, String url) {
        User user = userRepository.findByEmail(email).get();
        user.setProfile_url(url);
    }

    @Override
    public InterviewerRes findInterviewerMyPage(String email) {
        // 유저 정보 가져오기
        InterviewerRes interviewerRes = userRepository.findInterviewer(email);

        // 인터뷰 시작 시간 가져오기
        interviewerRes.setConductInterviewTimeList(interviewTimeRepository.findInterviewTimeByOwnerId(interviewerRes.getId()));

        // 인터뷰(모집, 진행, 완료 순) count 가져오기
        interviewerRes.setRecruit_interview_count(interviewRepository.countByUser_IdAndInterviewState(interviewerRes.getId(), 4));
        interviewerRes.setConduct_interview_count(interviewRepository.countByUser_IdAndInterviewState(interviewerRes.getId(), 5));
        interviewerRes.setComplete_interview_count(interviewRepository.countByUser_IdAndInterviewState(interviewerRes.getId(), 6));

        return interviewerRes;
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Optional<User> findByNickname(String nickname) {
        return userRepository.findByNickname(nickname);
    }

    @Override
    public Optional<User> findEmail(String name, String phone) {
        return userRepository.findEmail(name, phone);
    }

    @Override
    public Optional<User> findPassword(String name, String email) {
        return userRepository.findEmail(name, email);
    }
}
