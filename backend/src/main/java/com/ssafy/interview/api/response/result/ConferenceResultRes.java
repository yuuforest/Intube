package com.ssafy.interview.api.response.result;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.interview.db.entitiy.User;
import com.ssafy.interview.db.entitiy.conference.ConferenceResult;
import com.ssafy.interview.db.entitiy.interview.Question;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import java.util.Optional;

@Data
@AllArgsConstructor
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ApiModel("ConferenceResultRes")
public class ConferenceResultRes {

    @ApiModelProperty(name = "ConferenceResult ID")
    Long id;

    @ApiModelProperty(name = "question ID")
    Long question_id;

    @ApiModelProperty(name = "question content")
    String question_content;

    @ApiModelProperty(name = "ConferenceResult content")
    String result_content;

    @QueryProjection
    public ConferenceResultRes(ConferenceResult conferenceResult, Question question) {
        this.id = conferenceResult.getId();
        this.result_content = conferenceResult.getContent();
        if (question != null) {
            this.question_id = question.getId();
            this.question_content = question.getContent();
        }
    }

}
