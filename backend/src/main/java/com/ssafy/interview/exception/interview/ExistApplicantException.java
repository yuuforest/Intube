package com.ssafy.interview.exception.interview;

public class ExistApplicantException extends RuntimeException {
    public ExistApplicantException() {
    }

    public ExistApplicantException(String message) {
        super(message);
    }

    public ExistApplicantException(String message, Throwable cause) {
        super(message, cause);
    }

    public ExistApplicantException(Throwable cause) {
        super(cause);
    }

    public ExistApplicantException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
