package com.ssafy.interview.db.entitiy;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class Conference extends BaseEntity {

    Long owner_id;
    Long interview_id;
    @CreatedDate
    LocalDateTime call_start_time;
    @LastModifiedDate
    LocalDateTime call_end_time;
    int is_active;  // 1 방 활성화 2 방 종료
    @Column(unique = true)
    String sessionid;
}
