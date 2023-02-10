package com.ssafy.interview.db.repository.conference;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.interview.db.entitiy.QUser;
import com.ssafy.interview.db.entitiy.conference.Dialog;
import com.ssafy.interview.db.entitiy.conference.QDialog;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class DialogRepositoryImpl implements DialogRepositoryCustom {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QDialog qDialog = QDialog.dialog;
    QUser qUser = QUser.user;

    @Override
    public List<Dialog> findAllByConferenceId(Long conference_id) {
        return jpaQueryFactory
                .select(qDialog)
                .from(qDialog)
                .leftJoin(qDialog.user, qUser).fetchJoin()
                .where(qDialog.conference.id.eq(conference_id))
                .orderBy(qDialog.timestamp.asc())
                .fetch();
    }
}
