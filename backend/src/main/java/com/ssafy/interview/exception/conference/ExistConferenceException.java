package com.ssafy.interview.exception.conference;

public class ExistConferenceException extends RuntimeException {
    public ExistConferenceException() {
    }

    public ExistConferenceException(String message) {
        super(message);
    }

    public ExistConferenceException(String message, Throwable cause) {
        super(message, cause);
    }

    public ExistConferenceException(Throwable cause) {
        super(cause);
    }

    public ExistConferenceException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
