package com.ssafy.interview.db.entitiy.interview;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.interview.db.entitiy.BaseEntity;
import com.ssafy.interview.db.entitiy.User;
import lombok.*;
import org.springframework.util.Assert;

import javax.persistence.*;
import java.util.Date;

/**
 *  인터뷰 모델 정의.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Applicant extends BaseEntity {

        @Builder.Default()
        @Column(name = "applicant_state")
        int applicantState = 1;

        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "interview_time_id")
        private InterviewTime interviewTime;

        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "user_id")
        private User user;

        @Builder
        private Applicant(User user, InterviewTime interviewTime) {
                Assert.notNull(user, "user must not be empty");
                Assert.notNull(interviewTime, "interviewTime must not be empty");
                this.user = user;
                this.interviewTime = interviewTime;
        }
}
