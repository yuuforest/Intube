package com.ssafy.interview.db.repository.conference;

public class ConferenceRepositoryImpl implements ConferenceRepositoryCustom {

//    @Autowired
//    private JPAQueryFactory jpaQueryFactory;
//
//    QInterview qInterview = QInterview.interview;
//    QConference qConference = QConference.conference;
//
//    @Override
//    public ConferenceInfoRes findConferenceInfo(Long interviewID, Long conferenceID) {
//        return jpaQueryFactory
//                .select(new QConferenceInfoRes(qInterview.title, qInterview.interviewCategory.categoryName,
//                        qInterview.description, qInterview.estimated_time, qInterview.gender, qInterview.max_people,
//                        qInterview.standard_point, qConference.call_start_time, qConference.sessionid, qConference.user.name))
//                .from(qInterview, qConference)
//                .where(qInterview.id.eq(interviewID), qConference.id.eq(conferenceID))
//                .fetchOne();
//    }
}
