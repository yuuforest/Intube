package com.ssafy.interview.db.entitiy;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@EntityListeners(AuditingEntityListener.class)
public class ConferenceHistory extends BaseEntity{

    Long conference_id;
    Long user_id;
    int action;         // 1 방 생성 (질문자) 2 방에 참여 중 (답변자) 3 방에서 나감 (답변자) 4 방 종료 (질문자)
    @CreatedDate
    LocalDateTime start_time;
    @LastModifiedDate
    LocalDateTime end_time;

}
