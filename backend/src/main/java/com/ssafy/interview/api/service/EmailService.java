package com.ssafy.interview.api.service;

public interface EmailService {
    String sendAuthCode(String to) throws Exception;
}
