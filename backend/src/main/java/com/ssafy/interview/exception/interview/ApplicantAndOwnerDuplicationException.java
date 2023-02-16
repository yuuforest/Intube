package com.ssafy.interview.exception.interview;

public class ApplicantAndOwnerDuplicationException extends RuntimeException{
    public ApplicantAndOwnerDuplicationException() {
    }

    public ApplicantAndOwnerDuplicationException(String message) {
        super(message);
    }

    public ApplicantAndOwnerDuplicationException(String message, Throwable cause) {
        super(message, cause);
    }

    public ApplicantAndOwnerDuplicationException(Throwable cause) {
        super(cause);
    }

    public ApplicantAndOwnerDuplicationException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
