package com.ssafy.interview.db.repository;

import com.ssafy.interview.db.entitiy.conference.Conference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConferenceRepository extends JpaRepository<Conference, Long> {
}
