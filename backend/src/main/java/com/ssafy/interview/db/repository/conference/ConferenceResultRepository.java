package com.ssafy.interview.db.repository.conference;

import com.ssafy.interview.db.entitiy.conference.ConferenceResult;
import com.ssafy.interview.db.entitiy.conference.Dialog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConferenceResultRepository extends JpaRepository<ConferenceResult, Long> {

}
