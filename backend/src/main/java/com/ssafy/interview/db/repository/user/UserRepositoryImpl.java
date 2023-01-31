package com.ssafy.interview.db.repository.user;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.interview.api.response.interview.QInterviewDetailRes;
import com.ssafy.interview.api.response.user.InterviewerRes;
import com.ssafy.interview.api.response.user.QInterviewerRes;
import com.ssafy.interview.db.entitiy.QUser;
import com.ssafy.interview.db.entitiy.User;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

public class UserRepositoryImpl implements UserRepositoryCustom {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QUser qUser = QUser.user;

    @Override
    public Optional<User> findEmail(String name, String phone) {
        User user = jpaQueryFactory
                .select(qUser)
                .from(qUser)
                .where(qUser.name.eq(name), qUser.phone.eq(phone))
                .fetchOne();
        return Optional.ofNullable(user);
    }

    @Override
    public Optional<User> findPassword(String name, String email) {
        User user = jpaQueryFactory
                .select(qUser)
                .from(qUser)
                .where(qUser.name.eq(name), qUser.email.eq(email))
                .fetchOne();
        return Optional.ofNullable(user);
    }

    @Override
    public Optional<User> findKakaoUser(String email, int isKakao) {
        User user = jpaQueryFactory
                .select(qUser)
                .from(qUser)
                .where(qUser.is_kakao.eq(isKakao), qUser.email.eq(email))
                .fetchOne();
        return Optional.ofNullable(user);
    }

    @Override
    public InterviewerRes findInterviewer(String email) {
        InterviewerRes interviewerRes = jpaQueryFactory
                .select(new QInterviewerRes(qUser))
                .from(qUser)
                .where(qUser.email.eq(email))
                .fetchOne();
        return interviewerRes;
    }
}
