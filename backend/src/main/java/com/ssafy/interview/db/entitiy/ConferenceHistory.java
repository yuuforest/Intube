package com.ssafy.interview.db.entitiy;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class ConferenceHistory extends BaseEntity{

    Long conference_id;
    Long user_id;
    int action; // 1 방 생성 2 방 종료 3 방에 참여 중 4 방에서 나감
    LocalDateTime start_time;
    LocalDateTime end_time;

}
