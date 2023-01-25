package com.ssafy.interview.db.repository;

import com.ssafy.interview.db.entitiy.Conference;
import com.ssafy.interview.db.entitiy.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConferenceRepository extends JpaRepository<Conference, Long> {
}
