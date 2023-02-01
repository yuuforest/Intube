package com.ssafy.interview.db.entitiy.interview;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.interview.db.entitiy.BaseEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
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
public class Question extends BaseEntity {

        String content;

        @JsonIgnore
        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "interview_id")
        private Interview interview;

        @Builder
        private Question(String content, Interview interview) {
                Assert.notNull(content, "content must not be empty");
                Assert.notNull(interview, "interview must not be empty");
                this.content = content;
                this.interview = interview;
        }
}
