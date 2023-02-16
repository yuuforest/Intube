package com.ssafy.interview.db.entitiy.interview;

import com.ssafy.interview.db.entitiy.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class InterviewCategory extends BaseEntity {
    @Column(name = "category_name")
    String categoryName;

    @OneToMany(mappedBy = "interviewCategory")
    private List<Interview> interviewList = new ArrayList<>();
}
