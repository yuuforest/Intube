package com.ssafy.interview.db.repository.conference;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class ConferenceResultRepositoryImpl implements ConferenceResultRepositoryCustom {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
}
