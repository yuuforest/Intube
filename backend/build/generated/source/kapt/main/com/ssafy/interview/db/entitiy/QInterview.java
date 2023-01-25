package com.ssafy.interview.db.entitiy;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;
import com.ssafy.interview.db.entitiy.interview.Interview;


/**
 * QInterview is a Querydsl query type for Interview
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QInterview extends EntityPathBase<Interview> {

    private static final long serialVersionUID = 1428878397L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QInterview interview = new QInterview("interview");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final DateTimePath<java.util.Date> apply_end_time = createDateTime("apply_end_time", java.util.Date.class);

    public final DateTimePath<java.time.LocalDateTime> apply_start_time = createDateTime("apply_start_time", java.time.LocalDateTime.class);

    public final StringPath description = createString("description");

    public final DatePath<java.util.Date> download_expiration = createDate("download_expiration", java.util.Date.class);

    public final NumberPath<Integer> end_standard_age = createNumber("end_standard_age", Integer.class);

    public final StringPath estimated_time = createString("estimated_time");

    public final ComparablePath<Character> gender = createComparable("gender", Character.class);

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final DateTimePath<java.util.Date> interview_end_time = createDateTime("interview_end_time", java.util.Date.class);

    public final DateTimePath<java.util.Date> interview_start_time = createDateTime("interview_start_time", java.util.Date.class);

    public final NumberPath<Integer> interview_state = createNumber("interview_state", Integer.class);

    public final QInterviewCategory interviewCategory;

    public final NumberPath<Integer> max_people = createNumber("max_people", Integer.class);

    public final NumberPath<Integer> standard_point = createNumber("standard_point", Integer.class);

    public final NumberPath<Integer> start_standard_age = createNumber("start_standard_age", Integer.class);

    public final StringPath title = createString("title");

    public final QUser user;

    public QInterview(String variable) {
        this(Interview.class, forVariable(variable), INITS);
    }

    public QInterview(Path<? extends Interview> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QInterview(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QInterview(PathMetadata metadata, PathInits inits) {
        this(Interview.class, metadata, inits);
    }

    public QInterview(Class<? extends Interview> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.interviewCategory = inits.isInitialized("interviewCategory") ? new QInterviewCategory(forProperty("interviewCategory")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user")) : null;
    }

}

