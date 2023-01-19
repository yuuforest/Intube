package com.ssafy.interview.db.entitiy;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

/**
 *  인터뷰 모델 정의.
 */
@Entity
@Getter
@Setter
@EntityListeners(value = { AuditingEntityListener.class}) // JPA 내부에서 엔티티 객체가 생성/변경되는 것을 감지하는 역할
public class Interview extends BaseEntity {
        int owner_id;
        int category_id;
        String title;
        String description;
        String estimated_time;
        int start_standard_age;
        int end_standard_age;
        char gender;
        int max_people;
        int standard_point;
        @CreatedDate // JPA에서 엔티티의 생성 시간을 처리
        @Column(name = "apply_start_time", updatable = false)
        @Temporal(TemporalType.TIMESTAMP)
        LocalDateTime apply_start_time;

        @Temporal(TemporalType.TIMESTAMP)
        Date apply_end_time;

        @Temporal(TemporalType.TIMESTAMP)
        Date interview_start_time;

        @Temporal(TemporalType.TIMESTAMP)
        Date interview_end_time;

        @Temporal(TemporalType.DATE)
        Date download_expiration;
        @ColumnDefault("1")
        int interview_state;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "owner_id")
        private User user;

}
