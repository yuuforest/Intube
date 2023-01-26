package com.ssafy.interview.db.entitiy.interview;

import com.fasterxml.jackson.annotation.JsonFormat;
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
public class Applicant extends BaseEntity {

        @Builder.Default()
        @Column(name = "applicant_state")
        int applicantState = 1;

}
