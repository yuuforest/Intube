package com.ssafy.interview.db.entitiy;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.Entity;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class ConferenceHistory extends BaseEntity{

    Long conference_id;
    Long user_id;
    int action;         // 1 방 생성 2 방에 참여 중 3 방에서 나감 4 방 종료
    LocalDateTime start_time;   // @CreatedDate?
    LocalDateTime end_time;     // @LastModifiedDate

}
