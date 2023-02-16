package com.ssafy.interview.db.repository.conference;

import com.ssafy.interview.db.entitiy.conference.Dialog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DialogRepository extends JpaRepository<Dialog, Long>, DialogRepositoryCustom {

    Optional<List<Dialog>> findByConference_idOrderById(Long conferenceID);

    Optional<List<Dialog>> findByConference_idAndQuestion_id(Long conferenceID, Long QuestionID);

}
