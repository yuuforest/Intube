package com.ssafy.interview.db.repository.conference;

import com.ssafy.interview.db.entitiy.conference.Conference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConferenceRepository extends JpaRepository<Conference, Long>, ConferenceRepositoryCustom {

    Optional<Conference> findByInterviewTime_Id(Long interview_time_id);
    Optional<Conference> findByInterviewTime_IdAndActiveLike(Long interview_time_id, int active);
}
