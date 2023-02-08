package com.ssafy.interview.db.entitiy.interview;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.interview.db.entitiy.BaseEntity;
import com.ssafy.interview.db.entitiy.conference.Conference;
import lombok.*;
import org.springframework.util.Assert;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 *  인터뷰 모델 정의.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewTime extends BaseEntity {

        @Temporal(TemporalType.TIMESTAMP)
        @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm", timezone="Asia/Seoul")
        Date interview_start_time;

        @Builder.Default()
        @Column(name = "modify_result_state")
        int modifyResultState = 0;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "interview_id")
        private Interview interview;

        @OneToOne(mappedBy = "interviewTime")
        private Conference conference;

        @OneToMany(mappedBy = "interviewTime")
        private List<Applicant> applicantList = new ArrayList<>();

        @Builder
        private InterviewTime(Date interview_start_time, Interview interview) {
                Assert.notNull(interview_start_time, "interview_start_time must not be empty");
                Assert.notNull(interview, "interview must not be empty");
                this.interview_start_time = interview_start_time;
                this.interview = interview;
        }
}
