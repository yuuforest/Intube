package com.ssafy.interview.exception.interview;

public class InterviewTimeModifyResultDuplicationException extends RuntimeException{
    public InterviewTimeModifyResultDuplicationException() {
    }

    public InterviewTimeModifyResultDuplicationException(String message) {
        super(message);
    }

    public InterviewTimeModifyResultDuplicationException(String message, Throwable cause) {
        super(message, cause);
    }

    public InterviewTimeModifyResultDuplicationException(Throwable cause) {
        super(cause);
    }

    public InterviewTimeModifyResultDuplicationException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
