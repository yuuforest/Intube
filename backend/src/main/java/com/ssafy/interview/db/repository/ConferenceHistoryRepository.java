package com.ssafy.interview.db.repository;

import com.ssafy.interview.db.entitiy.conference.ConferenceHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConferenceHistoryRepository extends JpaRepository<ConferenceHistory, Long>  {
//    Optional<ConferenceHistory> findByConference_idAndUser_id(Long conference_id, Long user_id);
}
