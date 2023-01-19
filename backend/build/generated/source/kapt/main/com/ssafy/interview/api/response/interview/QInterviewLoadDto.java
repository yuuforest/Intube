package com.ssafy.interview.api.response.interview;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.processing.Generated;

/**
 * com.ssafy.interview.api.response.interview.QInterviewLoadDto is a Querydsl Projection type for InterviewLoadDto
 */
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QInterviewLoadDto extends ConstructorExpression<InterviewLoadDto> {

    private static final long serialVersionUID = 2143286666L;

    public QInterviewLoadDto(com.querydsl.core.types.Expression<? extends com.ssafy.interview.db.entitiy.Interview> interview, com.querydsl.core.types.Expression<String> category_name) {
        super(InterviewLoadDto.class, new Class<?>[]{com.ssafy.interview.db.entitiy.Interview.class, String.class}, interview, category_name);
    }

}

