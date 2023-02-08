package com.ssafy.interview.db.repository.conference;

import com.ssafy.interview.db.entitiy.conference.Mark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarkRepository extends JpaRepository<Mark, Long> {
}
