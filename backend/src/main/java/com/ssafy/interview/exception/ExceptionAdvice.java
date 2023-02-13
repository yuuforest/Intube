package com.ssafy.interview.exception;

import com.ssafy.interview.api.response.RestResponse;
import com.ssafy.interview.common.model.response.BaseResponseBody;
import com.ssafy.interview.db.entitiy.interview.InterviewTime;
import com.ssafy.interview.db.entitiy.interview.Question;
import com.ssafy.interview.exception.conference.ExistConferenceException;
import com.ssafy.interview.exception.interview.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

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

    @ExceptionHandler(InterviewTimeModifyResultDuplicationException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    protected ResponseEntity<? extends BaseResponseBody> applicantDuplicationException(InterviewTimeModifyResultDuplicationException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(BaseResponseBody.of(-112, e.getMessage() + " 이미 실행이 종료된 회의방입니다. Result Controller Api 실행 X!"));
    }

    @ExceptionHandler(ExistConferenceException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    protected ResponseEntity<? extends BaseResponseBody> existConferenceException(ExistConferenceException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(BaseResponseBody.of(-132, e.getMessage()
                + " 현재 생성된 Conference 방이 존재하지 않습니다. "));
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseEntity<RestResponse> validException(
            MethodArgumentNotValidException ex) {

        RestResponse restResponse = new RestResponse(false, // 1
                ex.getBindingResult().getAllErrors().get(0).getDefaultMessage());

        return new ResponseEntity<>(restResponse, HttpStatus.BAD_REQUEST); // 2
    }

    @ExceptionHandler(ConstraintViolationException.class)
    protected ResponseEntity<?> handleConstraintViolationException(ConstraintViolationException e) {
        RestResponse restResponse = new RestResponse(false, // 1
                e.getConstraintViolations().iterator().next().getMessage());

        return new ResponseEntity<>(restResponse, HttpStatus.BAD_REQUEST); // 2
    }

    @ExceptionHandler(ExistInterviewTimeException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    protected ResponseEntity<? extends BaseResponseBody> existInterviewTimeException(ExistInterviewTimeException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(BaseResponseBody.of(-133, e.getMessage() + " 재확인바랍니다."));
    }
}
