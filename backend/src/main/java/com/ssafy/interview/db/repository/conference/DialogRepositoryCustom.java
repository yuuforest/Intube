package com.ssafy.interview.db.repository.conference;

import com.ssafy.interview.api.response.user.ApplicantDetailRes;
import com.ssafy.interview.db.entitiy.conference.Dialog;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DialogRepositoryCustom {

    /**
     * Dialog 불러오기
     *
     * @param conference_id 인터뷰 Id
     * @return 검색 결과
     */
    List<Dialog> findAllByConferenceId(Long conference_id);
}
