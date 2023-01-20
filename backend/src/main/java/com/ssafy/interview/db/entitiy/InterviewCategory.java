package com.ssafy.interview.db.entitiy;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class InterviewCategory extends BaseEntity {
    String category_name;

    @OneToMany(mappedBy = "interviewCategory")
    private List<Interview> interviewList = new ArrayList<>();
}
