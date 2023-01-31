package com.ssafy.interview.db.repository.user;

import com.ssafy.interview.api.response.user.InterviewerRes;
import com.ssafy.interview.db.entitiy.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepositoryCustom {
    /**
     * 아이디 찾기
     *
     * @param name
     * @param phone
     * @return 검색 결과
     */
    Optional<User> findEmail(String name, String phone);

    /**
     * 비밀번호 찾기
     *
     * @param name
     * @param email
     * @return 검색 결과
     */
    Optional<User> findPassword(String name, String email);

    /**
     * 비밀번호 찾기
     *
     * @param email
     * @param isKakao
     * @return 검색 결과
     */
    Optional<User> findKakaoUser(String email, int isKakao);

    /**
     * interviewerRes 찾기
     *
     * @param email
     * @return 검색 결과
     */
    InterviewerRes findInterviewer(String email);
}
