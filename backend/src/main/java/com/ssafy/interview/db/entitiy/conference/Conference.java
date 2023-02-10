package com.ssafy.interview.db.entitiy.conference;

import com.ssafy.interview.db.entitiy.BaseEntity;
import com.ssafy.interview.db.entitiy.interview.InterviewTime;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class Conference extends BaseEntity {

    @CreatedDate
    LocalDateTime call_start_time;
    @LastModifiedDate
    LocalDateTime call_end_time;
    @Column(name = "is_active")
    int active;  // 0 방 종료 1 방 활성화

    @OneToOne
    @JoinColumn(name = "interview_time_id")
    private InterviewTime interviewTime;

    // OneToMany 관계 설정
    @OneToMany(mappedBy = "conference")
    private List<ConferenceResult> conferenceResultList = new ArrayList<>();

}
