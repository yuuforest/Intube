package com.ssafy.interview.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.interview.db.entitiy.QUser;
import com.ssafy.interview.db.entitiy.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.Optional;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
public class UserRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QUser qUser = QUser.user;

    public Optional<User> findUserByEmail(String email) {
        User user = jpaQueryFactory.select(qUser).from(qUser)
                .where(qUser.email.eq(email)).fetchOne();
        return Optional.ofNullable(user);
    }

    @Transactional
    public void updateByEmail(String email, String password, String name, String nickname,
                              String phone, String gender, Date birth, String introduction,
                              int temperature, Integer authorization, Double point, String profile_url) {
        jpaQueryFactory.update(qUser)
                .set(qUser.password, password).set(qUser.name, name).set(qUser.nickname, nickname)
                .set(qUser.phone, phone).set(qUser.gender, gender).set(qUser.birth, birth)
                .set(qUser.introduction, introduction).set(qUser.temperature, temperature)
//                .set(qUser.authorization, authorization)
                .set(qUser.point, point).set(qUser.profile_url, profile_url)
                .where(qUser.email.eq(email)).execute();
    }
}
