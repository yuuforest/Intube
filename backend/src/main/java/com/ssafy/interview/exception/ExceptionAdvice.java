package com.ssafy.interview.exception;

import com.ssafy.interview.common.model.response.BaseResponseBody;
import com.ssafy.interview.exception.interview.ApplicantAndOwnerDuplicationException;
import com.ssafy.interview.exception.interview.ApplicantDuplicationException;
import com.ssafy.interview.exception.interview.ExistApplicantException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@RequiredArgsConstructor
public class ExceptionAdvice {
    @ExceptionHandler(ApplicantDuplicationException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    protected ResponseEntity<? extends BaseResponseBody> applicantDuplicationException(ApplicantDuplicationException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(BaseResponseBody.of(-111, e.getMessage() + "! 이미 신청한 인터뷰입니다."));
    }

    @ExceptionHandler(ApplicantAndOwnerDuplicationException.class)
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    protected ResponseEntity<? extends BaseResponseBody> applicantAndOwnerDuplicationException(ApplicantAndOwnerDuplicationException e) {
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(BaseResponseBody.of(-121, e.getMessage() + " 재확인바랍니다."));
    }

    @ExceptionHandler(ExistApplicantException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    protected ResponseEntity<? extends BaseResponseBody> existApplicantException(ExistApplicantException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(BaseResponseBody.of(-131, e.getMessage() + " 재확인바랍니다."));
    }
}
