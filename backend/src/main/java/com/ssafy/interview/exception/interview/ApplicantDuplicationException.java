package com.ssafy.interview.exception.interview;

public class ApplicantDuplicationException extends RuntimeException{
    public ApplicantDuplicationException() {
    }

    public ApplicantDuplicationException(String message) {
        super(message);
    }

    public ApplicantDuplicationException(String message, Throwable cause) {
        super(message, cause);
    }

    public ApplicantDuplicationException(Throwable cause) {
        super(cause);
    }

    public ApplicantDuplicationException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
