package com.ssafy.interview.db.entitiy.interview;

import com.ssafy.interview.db.entitiy.BaseEntity;
import com.ssafy.interview.db.entitiy.User;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.util.Assert;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 *  인터뷰 모델 정의.
 */
@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(value = { AuditingEntityListener.class}) // JPA 내부에서 엔티티 객체가 생성/변경되는 것을 감지하는 역할
public class Interview extends BaseEntity {
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
        LocalDateTime apply_start_time;

        @Temporal(TemporalType.TIMESTAMP)
        Date apply_end_time;

        @Temporal(TemporalType.DATE)
        Date download_expiration;

        //        @ColumnDefault("1")
        @Builder.Default()
        @Column(name = "interview_state")
        int interviewState = 4;

        // OneToMany 관계 설정
        @OneToMany(mappedBy = "interview")
        private List<InterviewTime> interviewTimeList = new ArrayList<>();

        @OneToMany(mappedBy = "interview")
        private List<Question> questionList = new ArrayList<>();

        // ManyToOne 관계 설정
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "owner_id")
        private User user;

        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "category_id")
        private InterviewCategory interviewCategory;

        @Builder
        private Interview(String title, String description, String estimated_time, int start_standard_age,
                          int end_standard_age, char gender, int max_people, int standard_point,
                          Date apply_end_time, Date download_expiration, User user, InterviewCategory interviewCategory) {
                Assert.notNull(title, "title must not be empty");
                Assert.notNull(description, "description must not be empty");
                Assert.notNull(estimated_time, "estimated_time must not be empty");
                Assert.notNull(gender, "gender must not be empty");
                Assert.notNull(max_people, "max_people must not be empty");
                Assert.notNull(standard_point, "standard_point must not be empty");
                Assert.notNull(apply_end_time, "apply_end_time must not be empty");
                Assert.notNull(download_expiration, "download_expiration must not be empty");
                Assert.notNull(user, "user must not be empty");
                Assert.notNull(interviewCategory, "interviewCategory must not be empty");
                this.title = title;
                this.description = description;
                this.estimated_time = estimated_time;
                this.start_standard_age = start_standard_age;
                this.end_standard_age = end_standard_age;
                this.gender = gender;
                this.max_people = max_people;
                this.standard_point = standard_point;
                this.apply_end_time = apply_end_time;
                this.download_expiration = download_expiration;
                this.user = user;
                this.interviewCategory = interviewCategory;
        }
}


