package com.ssafy.interview.db.entitiy;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Conference extends BaseEntity {

    Long owner_id;
    Long interview_id;
    LocalDateTime call_start_time;
    LocalDateTime call_end_time;
    int is_active;  // 1 방 활성화 2 방 종료
    String sessionid;
}
