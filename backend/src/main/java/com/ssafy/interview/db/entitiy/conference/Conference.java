package com.ssafy.interview.db.entitiy.conference;

import com.ssafy.interview.db.entitiy.BaseEntity;
import com.ssafy.interview.db.entitiy.User;
import com.ssafy.interview.db.entitiy.interview.Interview;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class Conference extends BaseEntity {

//    Long interview_id;
    @CreatedDate
    LocalDateTime call_start_time;
    @LastModifiedDate
    LocalDateTime call_end_time;
    int is_active;  // 1 방 활성화 2 방 종료
    @Column(unique = true)
    String sessionid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User user;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "interview_id")
    private Interview interview;

}
