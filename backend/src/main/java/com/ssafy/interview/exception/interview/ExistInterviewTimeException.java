package com.ssafy.interview.exception.interview;

public class ExistInterviewTimeException extends RuntimeException {
    public ExistInterviewTimeException() {
    }

    public ExistInterviewTimeException(String message) {
        super(message);
    }

    public ExistInterviewTimeException(String message, Throwable cause) {
        super(message, cause);
    }

    public ExistInterviewTimeException(Throwable cause) {
        super(cause);
    }

    public ExistInterviewTimeException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
