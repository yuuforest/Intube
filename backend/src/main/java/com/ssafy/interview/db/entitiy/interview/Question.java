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
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 *  인터뷰 모델 정의.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Question extends BaseEntity {


        @NotBlank(message = "인터뷰 질문 내용을 입력해주세요.")
        String content;

        @JsonIgnore
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "interview_id")
        private Interview interview;

        @Builder
        private Question(String content, Interview interview) {
//                Assert.notNull(content, "content must not be empty");
//                Assert.notNull(interview, "interview must not be empty");
                this.content = content;
                this.interview = interview;
        }
}
