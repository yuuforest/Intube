package com.ssafy.interview.api.response.conference;

import com.querydsl.core.annotations.QueryProjection;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@ApiModel("ConferenceInfoRes")
public class ConferenceInfoRes {

    // [interview table]
    @ApiModelProperty(name="Conference ID")
    String title;
    @ApiModelProperty(name="category_name")
    String categoryName;
    @ApiModelProperty(name="description")
    String description;
    @ApiModelProperty(name="estimated_time")
    String estimated_time;
    @ApiModelProperty(name="gender")
    char gender;
    @ApiModelProperty(name="max_people")
    int max_people;
    @ApiModelProperty(name="standard_point")
    int standard_point;

    // [conference table]
    @ApiModelProperty(name="start_time")
    LocalDateTime start_time;
    @ApiModelProperty(name="Session ID")
    String sessionId;

    // [user table]
    @ApiModelProperty(name="Owner name")
    String name;

    @QueryProjection
    public ConferenceInfoRes(String title, String categoryName, String description, String estimated_time,  char gender,
                             int max_people, int standard_point, LocalDateTime start_time, String sessionId, String name) {
        this.title = title;
        this.categoryName = categoryName;
        this.description = description;
        this.estimated_time = estimated_time;
        this.gender = gender;
        this.max_people = max_people;
        this.standard_point = standard_point;
        this.start_time = start_time;
        this.sessionId = sessionId;
        this.name = name;
    }
}
