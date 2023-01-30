package com.ssafy.interview.db.repository.conference;

import com.ssafy.interview.db.entitiy.conference.ConferenceHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConferenceHistoryRepository extends JpaRepository<ConferenceHistory, Long>  {

    List<ConferenceHistory> findByConference_idAndAction(Long conference_id, int action);
}
