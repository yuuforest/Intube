package com.ssafy.interview.api.response.interview;

import com.querydsl.core.types.ConstructorExpression;
import com.ssafy.interview.db.entitiy.interview.Interview;

import javax.annotation.processing.Generated;

/**
 * com.ssafy.interview.api.response.interview.QInterviewLoadDto is a Querydsl Projection type for InterviewLoadDto
 */
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QInterviewLoadDto extends ConstructorExpression<InterviewLoadDto> {

    private static final long serialVersionUID = 2143286666L;

    public QInterviewLoadDto(com.querydsl.core.types.Expression<? extends Interview> interview, com.querydsl.core.types.Expression<String> category_name) {
        super(InterviewLoadDto.class, new Class<?>[]{Interview.class, String.class}, interview, category_name);
    }

}

