package com.ssafy.interview.db.repository.conference;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.interview.api.response.result.DialogDetailRes;
import com.ssafy.interview.api.response.result.QDialogDetailRes;
import com.ssafy.interview.db.entitiy.QUser;
import com.ssafy.interview.db.entitiy.conference.Dialog;
import com.ssafy.interview.db.entitiy.conference.QDialog;
import com.ssafy.interview.db.entitiy.interview.QQuestion;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class DialogRepositoryImpl implements DialogRepositoryCustom {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QDialog qDialog = QDialog.dialog;
    QUser qUser = QUser.user;
    QQuestion qQuestion = QQuestion.question;

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

    @Override
    public List<DialogDetailRes> findDialogDetailRes(Long conference_id) {
        return jpaQueryFactory
                .select(new QDialogDetailRes(qDialog, qQuestion, qUser))
                .from(qDialog)
                .leftJoin(qDialog.user, qUser)
                .leftJoin(qDialog.question, qQuestion)
                .where(qDialog.conference.id.eq(conference_id))
                .orderBy(qDialog.timestamp.asc())
                .fetch();
    }
}
