package com.ssafy.interview.db.entitiy.interview;

import com.ssafy.interview.db.entitiy.BaseEntity;
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
public class InterviewTime extends BaseEntity {

        @Temporal(TemporalType.TIMESTAMP)
        Date apply_end_time;

        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "interview_id")
        private Interview interview;
}
