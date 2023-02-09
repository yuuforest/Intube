package com.ssafy.interview.db.entitiy.interview;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.interview.db.entitiy.BaseEntity;
import com.ssafy.interview.db.entitiy.User;
import lombok.*;
import org.springframework.util.Assert;

import javax.persistence.*;

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
        @Column(name = "applicant_state") // 0 : 신청가능(DB에선 삭제된 상태) / 1 : 대기 / 2 : 수락 / 3: 해당 인터뷰 시간때 완료
        int applicantState = 1;

        @JsonIgnore
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "interview_time_id")
        private InterviewTime interviewTime;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "user_id")
        private User user;

        @Builder
        private Applicant(User user, InterviewTime interviewTime) {
                Assert.notNull(user, "user must not be empty");
                Assert.notNull(interviewTime, "interviewTime must not be empty");
                this.user = user;
                this.interviewTime = interviewTime;
        }

        public void updateApplicantState(int applicantState) {
                this.applicantState = applicantState;
        }
}
