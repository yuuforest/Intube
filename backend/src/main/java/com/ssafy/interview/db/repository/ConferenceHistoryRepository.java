package com.ssafy.interview.db.repository;

import com.ssafy.interview.db.entitiy.Conference;
import com.ssafy.interview.db.entitiy.ConferenceHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConferenceHistoryRepository extends JpaRepository<ConferenceHistory, Long>  {
//    Optional<ConferenceHistory> findByConference_idAndUser_id(Long conference_id, Long user_id);
}
