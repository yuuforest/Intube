package com.ssafy.interview.db.entitiy.interview;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.interview.db.entitiy.BaseEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
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
public class InterviewTime extends BaseEntity {

        @Temporal(TemporalType.TIMESTAMP)
        @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm", timezone="Asia/Seoul")
        Date interview_start_time;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "interview_id")
        private Interview interview;

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
